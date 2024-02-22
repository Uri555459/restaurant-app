import { type FC, Suspense } from 'react'
import { Await, useLoaderData } from 'react-router-dom'

import { IProduct } from '@/types/product.interface'

interface ProductProps {}

const Product: FC<ProductProps> = () => {
	const data = useLoaderData() as { data: IProduct }
	return (
		<Suspense fallback={'Загружаю...'}>
			<Await resolve={data.data}>
				{({ data }: { data: IProduct }) => <>Product - {data.name}</>}
			</Await>
		</Suspense>
	)
}

export default Product
