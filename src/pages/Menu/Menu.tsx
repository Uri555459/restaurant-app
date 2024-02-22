import type { FC } from 'react'

import { Heading, Search } from '@/components'

import styles from './Menu.module.scss'

interface MenuProps {}

const Menu: FC<MenuProps> = () => (
	<div className={styles.head}>
		<Heading>Меню</Heading>
		<Search placeholder='Введите блюдо или состав' />
	</div>
)

export default Menu
