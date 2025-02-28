import { atomWithStorage } from 'jotai/utils';

export interface RedNoteMessage {
  role: 'api' | 'user'
  id: number
  images?: string[]
  content?: string
}

export const redNoteMessagesAtom = atomWithStorage<RedNoteMessage[]>('redNoteMessages', []);
