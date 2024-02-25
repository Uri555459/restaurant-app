import type { FC, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import { selectUser } from '@/store/features/user/userSlice'

import { useAppSelector } from '@/hooks/redux.hooks'

interface RequireAuthProps {
	children: ReactNode
}
export const RequireAuth: FC<RequireAuthProps> = ({ children }) => {
	const { jwt } = useAppSelector(selectUser)

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
