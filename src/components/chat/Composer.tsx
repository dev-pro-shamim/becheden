'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Image as ImageIcon, Send } from 'lucide-react';

type Props = {
  input: string;
  setInput: (v: string) => void;
  onSend: () => void;
  onPickImage: () => void;
  fileInput: React.RefObject<HTMLInputElement | null>;
  onFileChange: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
};

export default function Composer({
  input,
  setInput,
  onSend,
  onPickImage,
  fileInput,
  onFileChange,
  disabled,
}: Props) {
  return (
    <div className="border-t p-2">
      <div className="flex items-end gap-2">
        {/* <Button
          variant="outline"
          size="icon"
          className="h-9 w-9"
          disabled={disabled}
        >
          <Paperclip className="h-4 w-4" />
        </Button> */}
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9"
          onClick={onPickImage}
          disabled={disabled}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
        <div className="relative flex-1">
          <Textarea
            rows={1}
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Write a message"
            className="w-full resize-none pr-10 min-h-9"
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onSend();
              }
            }}
            disabled={disabled}
          />
          {/* <Button
            aria-label="emoji"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
            disabled={disabled}
          >
            <Smile className="h-4 w-4" />
          </Button> */}
        </div>
        <Button
          onClick={onSend}
          className="inline-flex items-center gap-2"
          disabled={disabled || !input.trim()}
        >
          <Send className="h-4 w-4" /> {disabled ? 'Sending...' : 'Send'}
        </Button>
      </div>
      <input
        ref={fileInput}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
        disabled={disabled}
      />
    </div>
  );
}
