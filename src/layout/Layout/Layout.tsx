import cn from 'clsx'
import type { FC } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

import { Button } from '@/components'

import styles from './Layout.module.scss'

interface LayoutProps {}

export const Layout: FC<LayoutProps> = () => {
	return (
		<div className={styles.layout}>
			<div className={styles.sidebar}>
				<div className={styles.user}>
					<img
						className={styles.avatar}
						src='/avatar.png'
						alt='Аватар пользователя'
					/>
					<div className={styles.name}>Web Developer</div>
					<div className={styles.email}>test@test.ru</div>
				</div>
				<div className={styles.menu}>
					<NavLink
						className={({ isActive }) =>
							cn(styles.NavLink, {
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
							cn(styles.NavLink, {
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
				<Button className={styles.exit}>
					<img
						src='/exit-icon.svg'
						alt='Иконка выход'
					/>
					Выход
				</Button>
			</div>
			<div>
				<Outlet />
			</div>
		</div>
	)
}
