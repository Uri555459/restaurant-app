import axios from 'axios'
import { type FC, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { CartItem } from '@/components/CartItem/CartItem'

import { Button, Heading } from '@/components'

import { PREFIX } from '@/helpers/API'

import { cleanCart, selectCart } from '@/store/features/cart/cartSlice'
import { selectUser } from '@/store/features/user/userSlice'

import { IProduct } from '@/types/product.interface'

import { useAppDispatch, useAppSelector } from '@/hooks/redux.hooks'

import styles from './Cart.module.scss'

interface CartProps {}

const DELIVERY_FEE = 169

const Cart: FC<CartProps> = () => {
	const [cartProducts, setCardProducts] = useState<IProduct[]>([])
	const { items } = useAppSelector(selectCart)
	const { jwt } = useAppSelector(selectUser)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const total = items
		.map(i => {
			const product = cartProducts.find(p => p.id === i.id)
			if (!product) {
				return 0
			}
			return i.count * product.price
		})
		.reduce((acc, i) => (acc += i), 0)

	const getItem = async (id: number) => {
		const { data } = await axios.get<IProduct>(`${PREFIX}/products/${id}`)
		return data
	}

	const loadAllItems = useCallback(async () => {
		const res = await Promise.all(items.map(i => getItem(i.id)))
		setCardProducts(res)
	}, [items])

	const checkout = async () => {
		await axios.post(
			`${PREFIX}/order`,
			{
				products: items
			},
			{
				headers: {
					Authorization: `Bearer ${jwt}`
				}
			}
		)
		dispatch(cleanCart())
		navigate('/success')
	}

	useEffect(() => {
		loadAllItems()
	}, [items, loadAllItems])

	return (
		<>
			<Heading className={styles.heading}>Корзина</Heading>
			{items.map(i => {
				const product = cartProducts.find(p => p.id === i.id)
				if (!product) {
					return
				}
				return (
					<CartItem
						key={product.id}
						count={i.count}
						{...product}
					/>
				)
			})}
			<div className={styles.line}>
				<div className={styles.text}>Итог</div>
				<div className={styles.price}>
					{total}&nbsp;<span>₽</span>
				</div>
			</div>
			<hr className={styles.hr} />
			<div className={styles.line}>
				<div className={styles.text}>Доставка</div>
				<div className={styles.price}>
					{DELIVERY_FEE}&nbsp;<span>₽</span>
				</div>
			</div>
			<hr className={styles.hr} />
			<div className={styles.line}>
				<div className={styles.text}>
					Итог <span className={styles['total-count']}>({items.length})</span>
				</div>
				<div className={styles.price}>
					{total + DELIVERY_FEE}&nbsp;<span>₽</span>
				</div>
			</div>
			<div className={styles.checkout}>
				<Button
					appearance='big'
					onClick={checkout}
				>
					оформить
				</Button>
			</div>
		</>
	)
}

export default Cart
