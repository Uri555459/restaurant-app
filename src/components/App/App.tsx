import type { FC } from 'react'

import { Button, Input } from '@/components'

import styles from './App.module.scss'

interface AppProps {}

export const App: FC<AppProps> = () => {
	return (
		<div className={styles.App}>
			<Input placeholder='Email' />
			<Button>Submit</Button>
			<Button appearance='big'>Submit</Button>
		</div>
	)
}
