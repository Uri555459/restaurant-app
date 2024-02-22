import type { FC } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import styles from './App.module.scss'
import { Cart, Error, Menu } from '@/pages'

interface AppProps {}

const router = createBrowserRouter([
	{
		path: '/',
		element: <Menu />
	},
	{
		path: '/cart',
		element: <Cart />
	},
	{
		path: '*',
		element: <Error />
	}
])

export const App: FC<AppProps> = () => {
	return (
		<div className={styles.App}>
			<RouterProvider router={router} />
		</div>
	)
}
