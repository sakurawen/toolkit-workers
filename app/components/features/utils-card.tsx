import { Link } from 'react-router';
import { SpotlightCard } from '~/components/react-bits/spotlight-card/spotlight-card';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';

export interface UtilsCardProps {
  title: string
  description: string
  to: string
  logo: string
  className?: string
}

export function UtilsCard(props: UtilsCardProps) {
  const {
    title,
    description,
    to,
    logo,
    className,
  } = props;

  return (
    <SpotlightCard className={cn('util-card select-none shadow ', className)}>
      <div className="space-y-6">
        <div className="h-10">
          <img className="w-20 ring-1 rounded-full ring-gray-200/10" src={logo} alt="logo" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl  font-bold">{title}</h1>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
        <Link to={to}>
          <Button size="lg" className="w-full cursor-pointer">开始使用</Button>
        </Link>
      </div>
    </SpotlightCard>
  );
}
