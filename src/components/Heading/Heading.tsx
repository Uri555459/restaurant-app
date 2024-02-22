import cn from 'clsx'
import type { FC, HTMLAttributes, ReactNode } from 'react'

import styles from './Heading.module.scss'

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
	children: ReactNode
	className?: string
}

export const Heading: FC<HeadingProps> = ({
	children,
	className,
	...props
}) => (
	<h1
		className={cn(styles.h1, className)}
		{...props}
	>
		{children}
	</h1>
)
