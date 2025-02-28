import type { Route } from './+types/api.rednote.$image';

function getImageUrl(hash: string) {
  return `https://ci.xiaohongshu.com/${hash}?imageView2/2/w/format/png`;
}

export async function loader({ params }: Route.LoaderArgs) {
  const { image: imageHash } = params;
  const res = await fetch(getImageUrl(imageHash), {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebkit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
      'Referer': 'https://www.xiaohongshu.com/',
    },
  });
  return res;
}
