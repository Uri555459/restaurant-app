import axios from 'axios'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter, defer } from 'react-router-dom'

import { Cart, Error, Login, Menu, Product, Register } from '@/pages'

import { AuthLayout, Layout } from '@/layout'

import { PREFIX } from '@/helpers/API'
import { RequireAuth } from '@/helpers/RequireAuth'

import { store } from '@/store/store'

import { IProduct } from '@/types/product.interface'

import './index.scss'

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<RequireAuth>
				<Layout />
			</RequireAuth>
		),
		children: [
			{
				path: '/',
				element: (
					<Suspense fallback={<>Загрузка...</>}>
						<Menu />
					</Suspense>
				)
			},
			{
				path: '/cart',
				element: <Cart />
			},
			{
				path: '/product/:id',
				element: <Product />,
				errorElement: <>Ошибка</>,
				loader: async ({ params }) => {
					return defer({
						data: axios
							.get<IProduct>(`${PREFIX}/products/${params.id}`)
							.then(data => data)
							.catch(error => error)
					})
				}
			}
		]
	},
	{
		path: '/auth',
		element: <AuthLayout />,
		children: [
			{
				path: 'login',
				element: <Login />
			},
			{
				path: 'register',
				element: <Register />
			}
		]
	},
	{
		path: '*',
		element: <Error />
	}
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
)
