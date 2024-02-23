import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import type { FC } from 'react'

import { MenuList } from '@/pages/Menu/MenuList/MenuList'

import { Heading, Search } from '@/components'

import { PREFIX } from '@/helpers/API'

import { IProduct } from '@/types/product.interface'

import styles from './Menu.module.scss'

interface MenuProps {}

const Menu: FC<MenuProps> = () => {
	const [products, setProducts] = useState<IProduct[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | undefined>()

	const getMenu = async () => {
		try {
			const { data } = await axios.get<IProduct[]>(`${PREFIX}/products`)
			setProducts(data)
			setIsLoading(false)
		} catch (error) {
			setIsLoading(false)
			console.error(error)
			if (error instanceof AxiosError) {
				setError(error.message)
			}
			return
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
				{isLoading && <div>Загружаем продукты...</div>}
				{error && <div>{error}</div>}
				{!isLoading && <MenuList products={products} />}
			</div>
		</>
	)
}

export default Menu
