import { configureStore } from '@reduxjs/toolkit'

import {
	CART_PERSISTENT_STATE,
	cartReducer
} from '@/store/features/cart/cartSlice'
import { productReducer } from '@/store/features/product/productSlice'
import {
	JWT_PERSISTENT_STATE,
	userReducer
} from '@/store/features/user/userSlice'
import { saveState } from '@/store/storage'

export const store = configureStore({
	reducer: {
		user: userReducer,
		cart: cartReducer,
		product: productReducer
	}
})

store.subscribe(() => {
	saveState({ jwt: store.getState().user.jwt }, JWT_PERSISTENT_STATE)
	saveState(store.getState().cart, CART_PERSISTENT_STATE)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
