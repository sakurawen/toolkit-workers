import type { Route } from './+types/api.rednote';

function getImageUrl(hash: string) {
  return `https://ci.xiaohongshu.com/${hash}?imageView2/2/w/format/png`;
}

export async function loader({ request }: Route.LoaderArgs) {
  try {
    const { searchParams } = new URL(request.url);
    const url: string = searchParams.get('url') as string;
    const res = (await (await fetch(url)).text()).trim();
    const html = /<script>window.__INITIAL_STATE__=(\{.*\})<\/script>/.exec(res)?.[1].replace(/undefined/g, 'null') as string;
    const state = JSON.parse(html || '{}');
    const key = new URL(url).pathname.split('/').pop() as string || '';
    const images = state?.note.noteDetailMap?.[key]?.note?.imageList?.map((item: { urlDefault: string }) => item.urlDefault).map((url: string) => {
      const hash = new URL(url).pathname.split('/').pop()?.split('!')[0] as string;
      return getImageUrl(hash);
    });
    return Response.json(images);
  }
  catch (err) {
    console.error(err);
    return Response.json([]);
  }
}
