import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

import { PREFIX } from '@/helpers/API'

import { loadState } from '@/store/storage'
import { RootState } from '@/store/store'

import { ILoginResponse } from '@/types/auth.interface'
import { IProfile } from '@/types/user.interface'

export const JWT_PERSISTENT_STATE = 'userData'

export interface IUserPersistentState {
	jwt: string | null
}

export interface IUserState {
	jwt: string | null
	loginErrorMessage?: string
	registerErrorMessage?: string
	profile?: IProfile
}

const initialState: IUserState = {
	jwt: loadState<IUserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null
}

export const login = createAsyncThunk(
	'user/login',
	async (params: { email: string; password: string }) => {
		try {
			const { data } = await axios.post<ILoginResponse>(
				`${PREFIX}/auth/login`,
				{
					email: params.email,
					password: params.password
				}
			)
			return data
		} catch (error) {
			if (error instanceof AxiosError) {
				throw new Error(error.response?.data.message)
			}
		}
	}
)

export const getProfile = createAsyncThunk<
	IProfile,
	void,
	{ state: RootState }
>('user/getProfile', async (_, thunkApi) => {
	const jwt = thunkApi.getState().user.jwt
	const { data } = await axios.get<IProfile>(`${PREFIX}/user/profile`, {
		headers: {
			Authorization: `Bearer ${jwt}`
		}
	})
	return data
})

export const register = createAsyncThunk(
	'user/register',
	async (params: { email: string; password: string; name: string }) => {
		try {
			const { data } = await axios.post<ILoginResponse>(
				`${PREFIX}/auth/register`,
				{
					email: params.email,
					password: params.password,
					name: params.name
				}
			)
			return data
		} catch (error) {
			if (error instanceof AxiosError) {
				throw new Error(error.response?.data.message)
			}
		}
	}
)

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: state => {
			state.jwt = null
		},
		clearLoginError: state => {
			state.loginErrorMessage = undefined
		},
		clearRegisterError: state => {
			state.registerErrorMessage = undefined
		}
	},
	extraReducers: builder => {
		builder.addCase(login.fulfilled, (state, action) => {
			if (!action.payload) {
				return
			}

			state.jwt = action.payload.access_token
		})
		builder.addCase(login.rejected, (state, action) => {
			state.loginErrorMessage = action.error.message
		})
		builder.addCase(getProfile.fulfilled, (state, action) => {
			state.profile = action.payload
		})

		builder.addCase(register.fulfilled, (state, action) => {
			if (!action.payload) {
				return
			}

			state.jwt = action.payload.access_token
		})
		builder.addCase(register.rejected, (state, action) => {
			state.registerErrorMessage = action.error.message
		})
	}
})

export const { logout, clearLoginError, clearRegisterError } = userSlice.actions

export const selectUser = (state: RootState) => state.user

export const userReducer = userSlice.reducer
