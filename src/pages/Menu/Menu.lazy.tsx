import React, { Suspense, lazy } from 'react'

const LazyMenu = lazy(() => import('./Menu'))

export const Menu = (
	props: JSX.IntrinsicAttributes & { children?: React.ReactNode }
) => (
	<Suspense fallback={null}>
		<LazyMenu {...props} />
	</Suspense>
)
