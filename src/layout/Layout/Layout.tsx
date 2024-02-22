import type { FC } from 'react'
import { Link, Outlet } from 'react-router-dom'

import { Button } from '@/components'

import styles from './Layout.module.scss'

interface LayoutProps {}

export const Layout: FC<LayoutProps> = () => (
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
				<Link
					className={styles.link}
					to='/'
				>
					<img
						src='/menu-icon.svg'
						alt='Иконка меню'
					/>
					Меню
				</Link>
				<Link
					className={styles.link}
					to='/cart'
				>
					<img
						src='/cart-icon.svg'
						alt='Иконка корзины'
					/>
					Корзина
				</Link>
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
