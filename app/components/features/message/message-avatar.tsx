import type { PropsWithChildren } from 'react';

export function MessageAvatar({ children }: PropsWithChildren) {
  return <div className="size-9 shrink-0 flex text-2xl items-center justify-center text-center rounded-full bg-zinc-800 ring ring-gray-700">{children}</div>;
}
