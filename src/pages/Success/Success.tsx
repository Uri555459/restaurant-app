import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components'

import styles from './Success.module.scss'

interface SuccessProps {}

const Success: FC<SuccessProps> = () => {
	const navigate = useNavigate()
	return (
		<div className={styles['success']}>
			<img
				src='/pizza.png'
				alt='Изображение пиццы'
			/>
			<div className={styles['text']}>Ваш заказ успешно оформлен!</div>
			<Button
				appearance='big'
				onClick={() => navigate('/')}
			>
				Сделать новый
			</Button>
		</div>
	)
}

export default Success
