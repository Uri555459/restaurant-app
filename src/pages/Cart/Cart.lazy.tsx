import React, { Suspense, lazy } from 'react'

const LazyCart = lazy(() => import('./Cart'))

export const Cart = (
	props: JSX.IntrinsicAttributes & { children?: React.ReactNode }
) => (
	<Suspense fallback={null}>
		<LazyCart {...props} />
	</Suspense>
)
