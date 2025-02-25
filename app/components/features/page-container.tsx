import type { PropsWithChildren } from 'react';

export function PageContainer({ children, className, ...restProps }: PropsWithChildren<React.ComponentProps<'div'>>) {
  return <div className={`page-container mx-auto p-4 sm:pt-24 md:w-2xl ${className}`} {...restProps}>{children}</div>;
}
