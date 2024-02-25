import { configureStore } from '@reduxjs/toolkit'

import {
	JWT_PERSISTENT_STATE,
	userReducer
} from '@/store/features/user/userSlice'
import { saveState } from '@/store/storage'

export const store = configureStore({
	reducer: {
		user: userReducer
	}
})

store.subscribe(() => {
	saveState({ jwt: store.getState().user.jwt }, JWT_PERSISTENT_STATE)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
