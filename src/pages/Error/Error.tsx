import type { FC } from 'react'

import styles from './Error.module.scss'

interface ErrorProps {}

const Error: FC<ErrorProps> = () => (
	<div className={styles.Error}>Error Page</div>
)

export default Error
