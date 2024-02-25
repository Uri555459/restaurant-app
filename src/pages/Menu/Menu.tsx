import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import type { ChangeEvent, FC } from 'react'

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
	const [filter, setFilter] = useState<string>('')

	const getMenu = async (name?: string) => {
		try {
			const { data } = await axios.get<IProduct[]>(`${PREFIX}/products`, {
				params: { name }
			})
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

	const updateFilter = (event: ChangeEvent<HTMLInputElement>) => {
		setFilter(event.target.value)
	}

	useEffect(() => {
		getMenu(filter)
	}, [filter])

	return (
		<>
			<div className={styles.head}>
				<Heading>Меню</Heading>
				<Search
					placeholder='Введите блюдо или состав'
					onChange={updateFilter}
				/>
			</div>
			<div>
				{isLoading && <div>Загружаем продукты...</div>}
				{error && <div>{error}</div>}
				{!isLoading && products.length > 0 && <MenuList products={products} />}
				{!isLoading && products.length === 0 && (
					<div>По запросу блюд не найдено.</div>
				)}
			</div>
		</>
	)
}

export default Menu
