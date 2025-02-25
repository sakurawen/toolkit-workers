import ky from 'ky';
import { useActionState } from 'react';
import { toast } from 'sonner';
import { PageContainer } from '~/components/features/page-container';
import { Button } from '~/components/ui/button';
import { Textarea } from '~/components/ui/textarea';

export default function RedNote() {
  const [{ url, images }, action, isPending] = useActionState<{
    url: string
    images: string[]
  }, FormData>(async (_, form) => {
    const { url } = Object.fromEntries(form) as Record<string, string>;
    const images: string[] = await ky.get(`/api/rednote?url=${url}`).json();
    toast.info('无水印图片获取成功');
    return {
      url: '',
      images,
    };
  }, { url: '', images: [] });

  return (
    <PageContainer className="items-center justify-center">
      <div className="images  flex flex-wrap gap-4">
        {images.map((item) => {
          return (
            <div key={item} className="rounded-md overflow-hidden w-32 select-none cursor-pointer transition  hover:ring-2">
              <img src={item} alt="image" className="object-cover h-full" />
            </div>
          );
        })}
      </div>
      <div className="fixed bottom-0 left-0 right-0 mx-auto p-4 border rounded-t-xl md:w-2xl">
        <form className="space-y-4 " action={action} aria-disabled={isPending}>
          <div>
            <Textarea rows={4} className="resize-none block h-24" placeholder="小红书贴文网址" name="url" id="URL" disabled={isPending} defaultValue={url} />
          </div>
          <Button variant="secondary" className="w-full cursor-pointer" size="lg" disabled={isPending}>
            {isPending ? '获取中...' : '获 取'}
          </Button>
        </form>
      </div>
    </PageContainer>
  );
}
