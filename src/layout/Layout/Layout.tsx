import cn from 'clsx'
import { type FC, useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

import { Button } from '@/components'

import { getProfile, logout, selectUser } from '@/store/features/user/userSlice'

import { useAppDispatch, useAppSelector } from '@/hooks/redux.hooks'

import styles from './Layout.module.scss'

interface LayoutProps {}

export const Layout: FC<LayoutProps> = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { profile } = useAppSelector(selectUser)

	const logoutStorage = () => {
		dispatch(logout())
		navigate('/auth/login')
	}

	useEffect(() => {
		dispatch(getProfile())
	}, [dispatch])

	return (
		<div className={styles.layout}>
			<div className={styles.sidebar}>
				<div className={styles.user}>
					<img
						className={styles.avatar}
						src='/avatar.png'
						alt='Аватар пользователя'
					/>
					<div className={styles.name}>{profile?.name}</div>
					<div className={styles.email}>{profile?.email}</div>
				</div>
				<div className={styles.menu}>
					<NavLink
						className={({ isActive }) =>
							cn(styles.link, {
								[styles.active]: isActive
							})
						}
						to='/'
					>
						<img
							src='/menu-icon.svg'
							alt='Иконка меню'
						/>
						Меню
					</NavLink>
					<NavLink
						className={({ isActive }) =>
							cn(styles.link, {
								[styles.active]: isActive
							})
						}
						to='/cart'
					>
						<img
							src='/cart-icon.svg'
							alt='Иконка корзины'
						/>
						Корзина
					</NavLink>
				</div>
				<Button
					className={styles.exit}
					onClick={logoutStorage}
				>
					<img
						src='/exit-icon.svg'
						alt='Иконка выход'
					/>
					Выход
				</Button>
			</div>
			<div className={styles.content}>
				<Outlet />
			</div>
		</div>
	)
}
