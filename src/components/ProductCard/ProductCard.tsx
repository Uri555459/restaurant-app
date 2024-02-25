import type { FC, MouseEvent } from 'react'
import { Link } from 'react-router-dom'

import { addToCart } from '@/store/features/cart/cartSlice'

import { useAppDispatch } from '@/hooks/redux.hooks'

import styles from './ProductCard.module.scss'

interface ProductCardProps {
	id: number
	name: string
	description: string
	image: string
	price: number
	rating: number
}

export const ProductCard: FC<ProductCardProps> = ({
	id,
	description,
	image,
	name,
	price,
	rating
}) => {
	const dispatch = useAppDispatch()

	const add = (event: MouseEvent) => {
		event.preventDefault()
		dispatch(addToCart(id))
	}

	return (
		<Link
			to={`/product/${id}`}
			className={styles['link']}
		>
			<div className={styles.card}>
				<div
					className={styles.head}
					style={{ background: `url(${image})` }}
				>
					<div className={styles.price}>
						{price}
						<span className={styles.currency}>₽</span>
					</div>
					<button
						className={styles['add-to-cart']}
						onClick={add}
					>
						<img
							src='/cart-button-icon.svg'
							alt='Добавить в корзину'
						/>
					</button>
					<div className={styles.rating}>
						{rating}
						<img
							src='/star-icon.svg'
							alt='Иконка рейтинга'
						/>
					</div>
				</div>
				<div className={styles.footer}>
					<div className={styles.title}>{name}</div>
					<div className={styles.description}>{description}</div>
				</div>
			</div>
		</Link>
	)
}
