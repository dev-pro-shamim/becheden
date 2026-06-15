'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { Conversation } from './types';

type Props = {
  conversations: Conversation[];
  activeId: string;
  onSelect: (id: string) => void;
  query: string;
  setQuery: (v: string) => void;
  className?: string;
};

const formatLastTime = (value?: string | Date | null) => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  return '';
};

export default function Sidebar({
  conversations,
  activeId,
  onSelect,
  query,
  setQuery,
  className,
}: Props) {
  return (
    <aside className={`flex min-h-0 flex-col ${className ?? ''}`.trim()}>
      <div className="px-4 pb-3 pt-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search"
            className="pl-9"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">
        {conversations.map(c => (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={`flex w-full items-center gap-3 px-4 py-3 hover:bg-accent ${activeId === c.id ? 'bg-accent' : ''}`}
          >
            <Avatar className="h-10 w-10 shrink-0">
              <AvatarImage src={c.avatar ?? ''} alt={c.name} />
              <AvatarFallback>
                {c.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 text-left">
              <div className="flex items-center justify-between gap-2">
                <span className="truncate font-medium">{c.name}</span>
                <span className="text-xs text-muted-foreground">
                  {formatLastTime(c.lastTime)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="truncate">{c.lastMessage}</span>
                {c.unread ? (
                  <Badge
                    className="ml-auto h-5 min-w-5 justify-center px-1.5 text-[10px]"
                    variant="default"
                  >
                    {c.unread}
                  </Badge>
                ) : null}
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}
