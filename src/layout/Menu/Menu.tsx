import type { FC } from 'react'
import { Link, Outlet } from 'react-router-dom'

import styles from './Menu.module.scss'

interface MenuProps {}

export const Layout: FC<MenuProps> = () => (
	<div className={styles.Menu}>
		<div>
			<Link to='/'>Menu</Link>
			<Link to='/cart'>Cart</Link>
		</div>
		<div>
			<Outlet />
		</div>
	</div>
)
