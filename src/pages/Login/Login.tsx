import { type FC, type FormEvent, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button, Heading, Input } from '@/components'

import {
	clearLoginError,
	login,
	selectUser
} from '@/store/features/user/userSlice'

import { useAppDispatch, useAppSelector } from '@/hooks/redux.hooks'

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
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { jwt, loginErrorMessage } = useAppSelector(selectUser)

	useEffect(() => {
		if (jwt) {
			navigate('/')
		}
	}, [jwt, navigate])

	const sendLogin = async (email: string, password: string) => {
		dispatch(login({ email, password }))
	}

	const submit = async (event: FormEvent) => {
		event.preventDefault()
		dispatch(clearLoginError())
		const target = event.target as typeof event.target & LoginForm
		const { email, password } = target

		await sendLogin(email.value, password.value)
	}

	return (
		<div className={styles.login}>
			<Heading>Вход</Heading>
			{loginErrorMessage && (
				<div className={styles.error}>{loginErrorMessage}</div>
			)}
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
