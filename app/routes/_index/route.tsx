import type { UtilsCardProps } from '~/components/features/utils-card';
import { AnimatePresence, m } from 'motion/react';
import { UtilsCard } from '~/components/features/utils-card';
import { LetterGlitch } from '~/components/react-bits/letter-glitch/letter-glitch';

const cards: Array<UtilsCardProps> = [
  {
    logo: '/images/rednote.png',
    title: '小红书去水印',
    description: '去除小红书笔记图片水印',
    to: '/rednote',
  },
  {
    logo: '/images/douyin.png',
    title: '抖音去水印',
    description: '去除抖音视频水印',
    to: '/douyin',
  },
];

export function meta() {
  return [
    { title: 'Utils' },
    { name: 'description', content: 'Welcome to Utils Router!' },
  ];
}

export default function Home() {
  return (
    <div className="w-full h-screen relative p-2">
      <div className="w-full h-full absolute top-0 left-0 opacity-20">
        <LetterGlitch
          glitchSpeed={50}
          centerVignette={false}
          outerVignette={false}
          smooth
        />
      </div>
      <div className="flex sm:justify-center items-center h-full flex-col gap-12">
        <h1 className="text-6xl relative z-10 font-black">简单工具集</h1>
        <div className="w-full text-white  relative z-1">
          <div className="h-full flex flex-wrap flex-col sm:flex-row items-center sm:justify-center mx-auto gap-4">
            <AnimatePresence>
              {
                cards.map((card, index) => {
                  return (
                    <m.div className="min-w-64 w-full sm:w-auto" key={card.to} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                      <UtilsCard {...card} />
                    </m.div>
                  );
                })
              }
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
