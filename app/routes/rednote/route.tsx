import type { RedNoteMessage } from '~/atoms/rednote';
import { produce } from 'immer';
import { useAtom } from 'jotai';
import ky from 'ky';
import { Trash2 } from 'lucide-react';
import { useActionState } from 'react';
import { toast } from 'sonner';
import { redNoteMessagesAtom } from '~/atoms/rednote';
import { MessageAvatar } from '~/components/features/message';
import { PageContainer } from '~/components/features/page-container';
import { Button } from '~/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '~/components/ui/carousel';
import { Textarea } from '~/components/ui/textarea';

export default function RedNote() {
  const [redNoteMessages, setRedNoteMessages] = useAtom(redNoteMessagesAtom);

  const [{ url }, action, isPending] = useActionState<{
    url: string
  }, FormData>(async (_, form) => {
    const { url } = Object.fromEntries(form) as Record<string, string>;
    setRedNoteMessages(produce((draft) => {
      draft.push({
        id: Date.now(),
        role: 'user',
        content: url,
      });
    }));
    const images: string[] = await ky.get(`/api/rednote?url=${url}`).json();
    if (images.length === 0) {
      setRedNoteMessages(produce((draft) => {
        draft.pop();
      }));
      toast.error('无水印图片获取失败');
      return {
        url,
      };
    }
    toast.info('无水印图片获取成功');
    setRedNoteMessages(produce((draft) => {
      draft.push({
        id: Date.now(),
        role: 'api',
        images,
      });
    }));
    return {
      url: '',
    };
  }, { url: '' });

  function handleMessagesClean() {
    setRedNoteMessages([]);
    toast.info('无水印图片获取成功');
  }

  return (
    <PageContainer>
      <div className="images  flex flex-wrap gap-4 pb-80">
        {redNoteMessages.map(message => (
          <RedNoteMessageContent key={message.id} message={message} />
        ))}
      </div>
      <div className="fixed bottom-0 z-10 left-0 bg-zinc-950 right-0 mx-auto p-4 border rounded-t-xl md:w-2xl">
        <form className="space-y-4 " action={action} aria-disabled={isPending}>
          <div>
            <Textarea rows={4} className="resize-none block h-24" placeholder="小红书贴文网址" name="url" id="URL" disabled={isPending} defaultValue={url} />
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" type="button" onClick={handleMessagesClean} className="shrink-0" size="lg">
              <Trash2 className="size-5" />
              <span>清除记录</span>
            </Button>
            <Button className="w-full cursor-pointer" size="lg" disabled={isPending}>
              {isPending ? '获取中...' : '获 取'}
            </Button>
          </div>
        </form>
      </div>
    </PageContainer>
  );
}

function RedNoteMessageContent({ message }: { message: RedNoteMessage }) {
  const { role, content, images } = message;
  if (role === 'api') {
    return (
      <div className="flex gap-2 items-start  max-w-full">
        <MessageAvatar>🐭</MessageAvatar>
        <div className="bg-gray-800 flex-1 rounded-r-md rounded-bl-md p-2">
          <div>
            <Carousel>
              <CarouselPrevious className="z-1 left-0" />
              <CarouselNext className="z-1 right-0" />
              <CarouselContent>
                {images?.map((image) => {
                  return (
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={image}>
                      <div className="h-full bg-gray-700 rounded-sm overflow-hidden flex items-center justify-center">
                        <img className="shrink-0 select-none flex-1" src={image} alt="image" />
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
        <div className="w-9 shrink-0"></div>
      </div>
    );
  }
  return (
    <div className="flex gap-2 items-start flex-row-reverse  max-w-full">
      <MessageAvatar>👴</MessageAvatar>
      <p className="bg-gray-800 flex-1 break-all  rounded-l-md rounded-br-md p-2">
        {content}
      </p>
      <div className="w-9 shrink-0"></div>
    </div>
  );
}
