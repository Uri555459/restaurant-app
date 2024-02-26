import type { FC } from 'react'

import {
	addToCart,
	deleteToCart,
	removeToCart
} from '@/store/features/cart/cartSlice'

import { useAppDispatch } from '@/hooks/redux.hooks'

import styles from './CartItem.module.scss'

interface CartItemProps {
	id: number
	name: string
	image: string
	price: number
	count: number
}

export const CartItem: FC<CartItemProps> = ({
	id,
	name,
	image,
	price,
	count
}) => {
	const dispatch = useAppDispatch()

	const increase = () => {
		dispatch(addToCart(id))
	}

	const decrease = () => {
		dispatch(removeToCart(id))
	}

	const remove = () => {
		dispatch(deleteToCart(id))
	}

	return (
		<div className={styles.item}>
			<div
				className={styles.image}
				style={{ backgroundImage: `url('${image}')` }}
			></div>
			<div className={styles.description}>
				<div className={styles.name}>{name}</div>
				<div className={styles.price}>{price}&nbsp;₽</div>
			</div>
			<div className={styles.actions}>
				<button
					className={styles.minus}
					onClick={decrease}
				>
					<img
						src='/minus-icon.svg'
						alt='Удалить из корзины'
					/>
				</button>
				<div className={styles.number}>{count}</div>
				<button
					className={styles.plus}
					onClick={increase}
				>
					<img
						src='/plus-icon.svg'
						alt='Добавить в корзину'
					/>
				</button>
				<button
					className={styles.remove}
					onClick={remove}
				>
					<img
						src='/delete-icon.svg'
						alt='Удалить все'
					/>
				</button>
			</div>
		</div>
	)
}
