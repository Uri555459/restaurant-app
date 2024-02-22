import type { FC } from 'react'

import { Button } from '@/components'

import styles from './App.module.scss'

interface AppProps {}

export const App: FC<AppProps> = () => (
	<div className={styles.App}>
		<Button>dfsdf</Button>
	</div>
)
