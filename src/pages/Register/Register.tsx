import { type FC, type FormEvent, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button, Heading, Input } from '@/components'

import {
	clearRegisterError,
	register,
	selectUser
} from '@/store/features/user/userSlice'

import { useAppDispatch, useAppSelector } from '@/hooks/redux.hooks'

import styles from './Register.module.scss'

interface RegisterProps {}

type RegisterForm = {
	email: {
		value: string
	}
	password: {
		value: string
	}
	name: {
		value: string
	}
}

const Register: FC<RegisterProps> = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { jwt, registerErrorMessage } = useAppSelector(selectUser)

	useEffect(() => {
		if (jwt) {
			navigate('/')
		}
	}, [jwt, navigate])

	const submit = async (event: FormEvent) => {
		event.preventDefault()
		dispatch(clearRegisterError())
		const target = event.target as typeof event.target & RegisterForm
		const { email, password, name } = target

		dispatch(
			register({
				email: email.value,
				password: password.value,
				name: name.value
			})
		)
	}

	return (
		<div className={styles.login}>
			<Heading>Регистрация</Heading>
			{registerErrorMessage && (
				<div className={styles.error}>{registerErrorMessage}</div>
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
				<div className={styles.field}>
					<label htmlFor='name'>Ваше имя</label>
					<Input
						id='name'
						placeholder='Имя'
						name='name'
					/>
				</div>
				<Button appearance='big'>Зарегистрироваться</Button>
			</form>

			<div className={styles.links}>
				<div>Есть аккаунт?</div>
				<Link to='/auth/login'>Войти</Link>
			</div>
		</div>
	)
}

export default Register
