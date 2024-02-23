import type { FC } from 'react'
import { Outlet } from 'react-router-dom'

import styles from './AuthLayout.module.scss'

interface AuthLayoutProps {}

export const AuthLayout: FC<AuthLayoutProps> = () => {
	return (
		<div className={styles.layout}>
			<div className={styles.logo}>
				<img
					src='/logo.svg'
					alt='Логотип компании'
				/>
			</div>
			<div className={styles.content}>
				<Outlet />
			</div>
		</div>
	)
}
