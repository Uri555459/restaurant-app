import axios, { AxiosError } from 'axios'
import { type FC, type FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button, Heading, Input } from '@/components'

import { PREFIX } from '@/helpers/API'

import { ILoginResponse } from '@/types/auth.interface'

import styles from './Login.module.scss'

interface LoginProps {}

type LoginForm = {
	email: {
		value: string
	}
	password: {
		value: string
	}
}

const Login: FC<LoginProps> = () => {
	const [error, setError] = useState<string | null>()
	const navigate = useNavigate()

	const sendLogin = async (email: string, password: string) => {
		try {
			const { data } = await axios.post<ILoginResponse>(
				`${PREFIX}/auth/login`,
				{
					email,
					password
				}
			)
			localStorage.setItem('jwt', data.access_token)
			navigate('/')
		} catch (error) {
			if (error instanceof AxiosError) {
				setError(error.response?.data.message)
			}
		}
	}

	const submit = async (event: FormEvent) => {
		event.preventDefault()
		setError(null)
		const target = event.target as typeof event.target & LoginForm
		const { email, password } = target

		await sendLogin(email.value, password.value)
	}

	return (
		<div className={styles.login}>
			<Heading>Вход</Heading>
			{error && <div className={styles.error}>{error}</div>}
			<form
				className={styles.form}
				onSubmit={submit}
			>
				<div className={styles.field}>
					<label htmlFor='email'>Ваш email</label>
					<Input
						id='email'
						placeholder='Email'
						name='email'
					/>
				</div>
				<div className={styles.field}>
					<label htmlFor='password'>Ваш пароль</label>
					<Input
						id='password'
						type='password'
						placeholder='Пароль'
						name='password'
					/>
				</div>
				<Button appearance='big'>Вход</Button>
			</form>

			<div className={styles.links}>
				<div>Нет аккаунта?</div>
				<Link to='/auth/register'>Нет аккаунта? Зарегистрироваться</Link>
			</div>
		</div>
	)
}

export default Login
