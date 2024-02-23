import React, { Suspense, lazy } from 'react'

const LazyRegister = lazy(() => import('./Register'))

export const Register = (
	props: JSX.IntrinsicAttributes & { children?: React.ReactNode }
) => (
	<Suspense fallback={null}>
		<LazyRegister {...props} />
	</Suspense>
)
