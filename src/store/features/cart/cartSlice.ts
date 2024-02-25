import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '@/store/store'

export interface ICartItem {
	id: number
	count: number
}

export interface ICartState {
	items: ICartItem[]
}

const initialState: ICartState = {
	items: []
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<number>) => {
			const existed = state.items.find(item => item.id === action.payload)

			if (!existed) {
				state.items.push({
					id: action.payload,
					count: 1
				})
				return
			}

			state.items.map(item => {
				if (item.id === action.payload) {
					item.count += 1
				}

				return item
			})
		}
	}
})

export const { addToCart } = cartSlice.actions

export const selectCart = (state: RootState) => state.cart

export const cartReducer = cartSlice.reducer
