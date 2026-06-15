'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Props = {
  name: string;
  avatar?: string | null;
  // status?: string;
};

export default function ChatHeader({
  name,
  avatar,
}: // status = 'Online'
Props) {
  const fallback = name.slice(0, 1).toUpperCase();

  return (
    <div className="flex items-center justify-between px-4 py-2">
      <div className="flex items-center gap-3">
        <Avatar className="h-9 w-9">
          {avatar ? <AvatarImage src={avatar} alt={name} /> : null}
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{name}</div>
          {/* <div className="text-xs text-emerald-600">{status}</div> */}
        </div>
      </div>
    </div>
  );
}
