import cn from 'clsx'
import type { ButtonHTMLAttributes, FC, ReactNode } from 'react'

import styles from './Button.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode
}

export const Button: FC<ButtonProps> = ({ children, ...props }) => {
	return (
		<button
			className={cn(styles.button, styles.accent)}
			{...props}
		>
			{children}
		</button>
	)
}
