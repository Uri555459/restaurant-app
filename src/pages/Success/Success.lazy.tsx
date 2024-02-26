import React, { lazy, Suspense } from 'react';

const LazySuccess = lazy(() => import('./Success'));

export const Success = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazySuccess {...props} />
  </Suspense>
);

