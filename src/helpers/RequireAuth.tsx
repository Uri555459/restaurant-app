import type { FC, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

interface RequireAuthProps {
	children: ReactNode
}
export const RequireAuth: FC<RequireAuthProps> = ({ children }) => {
	const jwt = null

	if (!jwt) {
		return (
			<Navigate
				to='/auth/login'
				replace
			/>
		)
	}

	return children
}
