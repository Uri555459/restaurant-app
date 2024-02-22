import cn from 'clsx'
import { InputHTMLAttributes, forwardRef } from 'react'

import styles from './Input.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	isValid?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ isValid = true, className, ...props }, ref) => (
		<input
			className={cn(styles.input, className, { [styles.invalid]: isValid })}
			ref={ref}
			{...props}
		/>
	)
)
