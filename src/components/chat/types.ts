export type Conversation = {
  id: string;
  name: string;
  avatar: string;
  lastMessage?: string | null;
  lastTime?: string | Date | null;
  unread?: number;
};

export type Message = {
  id: string;
  fromMe: boolean;
  text?: string;
  image?: string;
  time: string;
  createdAt: string;
};

export type AdSummary = {
  id?: string;
  title?: string | null;
  price?: string | number | null;
  image?: string | null;
  location?: string | null;
  posted?: string | null;
  link?: string | null;
};
