import type { FC } from 'react'

import { ProductCard } from '@/components'

import { IProduct } from '@/types/product.interface'

import styles from './MenuList.module.scss'

interface MenuListProps {
	products: IProduct[]
}

export const MenuList: FC<MenuListProps> = ({ products }) => {
	return (
		<div className={styles.wrapper}>
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
	)
}
