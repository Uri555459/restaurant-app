import axios from 'axios'
import { useEffect, useState } from 'react'
import type { FC } from 'react'

import { Heading, ProductCard, Search } from '@/components'

import { PREFIX } from '@/helpers/api'

import { IProduct } from '@/types/product.interface'

import styles from './Menu.module.scss'

interface MenuProps {}

const Menu: FC<MenuProps> = () => {
	const [products, setProducts] = useState<IProduct[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)

	const getMenu = async () => {
		try {
			const { data } = await axios.get<IProduct[]>(`${PREFIX}/products`)
			setProducts(data)
			setIsLoading(false)
		} catch (error) {
			setIsLoading(false)
			console.error(error)
		}
	}

	useEffect(() => {
		getMenu()
	}, [])

	return (
		<>
			<div className={styles.head}>
				<Heading>Меню</Heading>
				<Search placeholder='Введите блюдо или состав' />
			</div>
			<div>
				{!isLoading &&
					products.map(product => (
						<ProductCard
							key={product.id}
							id={product.id}
							description={product.ingredients.join(',')}
							image={product.image}
							name={product.name}
							price={product.price}
							rating={product.rating}
						/>
					))}
				{isLoading && <div>Загружаем продукты...</div>}
			</div>
		</>
	)
}

export default Menu
