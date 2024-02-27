import { type FC, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Button, Heading } from '@/components'

import { addToCart } from '@/store/features/cart/cartSlice'
import {
	getProduct,
	selectProduct
} from '@/store/features/product/productSlice'

import { useAppDispatch, useAppSelector } from '@/hooks/redux.hooks'

import styles from './Product.module.scss'

interface ProductProps {}

const Product: FC<ProductProps> = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const dispatch = useAppDispatch()
	const { product } = useAppSelector(selectProduct)

	useEffect(() => {
		if (id) {
			dispatch(getProduct({ id }))
		}
	}, [dispatch, id])
	if (!product.name) return null

	const add = () => {
		dispatch(addToCart(product.id))
	}

	return (
		<>
			<div className={styles.header}>
				<button
					className={styles['back-button']}
					onClick={() => navigate(-1)}
				>
					<img
						src='/arrow-left.svg'
						alt='Back icon'
					/>
				</button>
				<Heading className={styles.heading}>{product.name}</Heading>

				<Button
					className={styles['add-button']}
					onClick={add}
				>
					<img
						src='/cart-button-icon.svg'
						alt='Иконка корзины'
					/>
					В корзину
				</Button>
			</div>
			<div className={styles.content}>
				<div
					className={styles.image}
					style={{ backgroundImage: `url('${product.image}')` }}
				/>
				<div className={styles.description}>
					<div className={styles.price}>
						<span>Цена</span>
						<span>{product.price}&nbsp;₽</span>
					</div>
					<hr className={styles.hr} />
					<div className={styles.rating}>
						<span>Рейтинг</span>
						<span>{product.rating}</span>
					</div>
					<div className={styles.ingredients}>
						<span>Состав:</span>
						<ul>
							{product.ingredients.map(ingredient => (
								<li key={ingredient}>{ingredient}</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</>
	)
}

export default Product
