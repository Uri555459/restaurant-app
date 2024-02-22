import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter, defer } from 'react-router-dom'

import { Cart, Error, Menu, Product } from '@/pages'

import { Layout } from '@/layout'

import { PREFIX } from '@/helpers/api'

import { IProduct } from '@/types/product.interface'

import './index.scss'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <Menu />
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
		path: '*',
		element: <Error />
	}
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
