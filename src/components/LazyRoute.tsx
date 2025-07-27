import React, { Suspense } from 'react';
import { PageLoader } from './PageLoader';

interface LazyRouteProps {
  children: React.ReactNode;
}

export const LazyRoute = ({ children }: LazyRouteProps) => {
  return (
    <Suspense fallback={<PageLoader />}>
      {children}
    </Suspense>
  );
};