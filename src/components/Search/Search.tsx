import cn from 'clsx'
import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'

import styles from './Search.module.scss'

interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
	isValid?: boolean
}

export const Search = forwardRef<HTMLInputElement, SearchProps>(
	({ isValid, className, ...props }, ref) => {
		return (
			<div className={styles['input-wrapper']}>
				<input
					ref={ref}
					className={cn(styles.input, className, {
						[styles['invalid']]: isValid
					})}
					{...props}
				/>
				<img
					className={styles.icon}
					src='/search-icon.svg'
					alt='Иконка лупы'
				/>
			</div>
		)
	}
)
