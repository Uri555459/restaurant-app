import type { FC } from 'react'

import { Heading, ProductCard, Search } from '@/components'

import styles from './Menu.module.scss'

interface MenuProps {}

const Menu: FC<MenuProps> = () => {
	return (
		<>
			<div className={styles.head}>
				<Heading>Меню</Heading>
				<Search placeholder='Введите блюдо или состав' />
			</div>
			<div>
				<ProductCard
					id={1}
					description='Салями, руккола, помидоры, оливки'
					image='/product-demo.png'
					name='Наслаждение'
					price={300}
					rating={4.5}
				/>
			</div>
		</>
	)
}

export default Menu
