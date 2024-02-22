import cn from 'clsx'
import type { ButtonHTMLAttributes, FC, ReactNode } from 'react'

import styles from './Button.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode
	appearance?: 'big' | 'small'
}

export const Button: FC<ButtonProps> = ({
	children,
	className,
	appearance = 'small',
	...props
}) => {
	return (
		<button
			className={cn(styles.button, styles.accent, className, {
				[styles.small]: appearance === 'small',
				[styles.big]: appearance === 'big'
			})}
			{...props}
		>
			{children}
		</button>
	)
}
