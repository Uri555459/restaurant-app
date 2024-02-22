import React, { Suspense, lazy } from 'react'

const LazyError = lazy(() => import('./Error'))

export const Error = (
	props: JSX.IntrinsicAttributes & { children?: React.ReactNode }
) => (
	<Suspense fallback={null}>
		<LazyError {...props} />
	</Suspense>
)
