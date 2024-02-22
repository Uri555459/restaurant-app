import { useEffect, useState } from 'react'
import type { FC } from 'react'

import { Heading, ProductCard, Search } from '@/components'

import { PREFIX } from '@/helpers/api'

import { IProduct } from '@/types/product.interface'

import styles from './Menu.module.scss'

interface MenuProps {}

const Menu: FC<MenuProps> = () => {
	const [products, setProducts] = useState<IProduct[]>([])

	const getMenu = async () => {
		try {
			const res = await fetch(`${PREFIX}/products`)
			if (!res.ok) {
				return
			}

			const data = (await res.json()) as IProduct[]
			setProducts(data)
		} catch (error) {
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
				{products.map(product => (
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
			</div>
		</>
	)
}

export default Menu
