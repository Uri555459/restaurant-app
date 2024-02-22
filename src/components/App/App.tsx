import type { FC } from 'react'

import styles from './App.module.scss'

interface AppProps {}

export const App: FC<AppProps> = () => {
	return <div className={styles.App}></div>
}
