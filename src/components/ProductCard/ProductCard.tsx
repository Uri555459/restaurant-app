import type { FC } from 'react'
import { Link } from 'react-router-dom'

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
}) => (
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
				<button className={styles['add-to-cart']}>
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
