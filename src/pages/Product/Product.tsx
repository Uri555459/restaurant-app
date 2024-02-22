import type { FC } from 'react'
import { useParams } from 'react-router-dom'

import styles from './Product.module.scss'

interface ProductProps {}

const Product: FC<ProductProps> = () => {
	const { id } = useParams()
	return <div className={styles.Product}>Product {id}</div>
}

export default Product
