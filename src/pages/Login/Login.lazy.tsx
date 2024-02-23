import React, { Suspense, lazy } from 'react'

const LazyLogin = lazy(() => import('./Login'))

export const Login = (
	props: JSX.IntrinsicAttributes & { children?: React.ReactNode }
) => (
	<Suspense fallback={null}>
		<LazyLogin {...props} />
	</Suspense>
)
