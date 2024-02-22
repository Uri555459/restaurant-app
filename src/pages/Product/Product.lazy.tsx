import React, { Suspense, lazy } from 'react'

const LazyProduct = lazy(() => import('./Product'))

export const Product = (
	props: JSX.IntrinsicAttributes & { children?: React.ReactNode }
) => (
	<Suspense fallback={null}>
		<LazyProduct {...props} />
	</Suspense>
)
