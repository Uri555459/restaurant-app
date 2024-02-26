import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { loadState } from '@/store/storage'
import { RootState } from '@/store/store'

export const CART_PERSISTENT_STATE = 'cartData'

export interface ICartItem {
	id: number
	count: number
}

export interface ICartState {
	items: ICartItem[]
}

const initialState: ICartState = loadState<ICartState>(
	CART_PERSISTENT_STATE
) ?? {
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
		},
		deleteToCart: (state, action: PayloadAction<number>) => {
			state.items = state.items.filter(i => i.id !== action.payload)
		},
		removeToCart: (state, action: PayloadAction<number>) => {
			const existed = state.items.find(i => i.id === action.payload)
			if (!existed) {
				return
			}
			if (existed.count === 1) {
				state.items = state.items.filter(i => i.id !== action.payload)
			} else {
				state.items.map(i => {
					if (i.id === action.payload) {
						i.count -= 1
					}
					return i
				})
				return
			}
		},
		cleanCart: state => {
			state.items = []
		}
	}
})

export const { addToCart, deleteToCart, removeToCart, cleanCart } =
	cartSlice.actions

export const selectCart = (state: RootState) => state.cart

export const cartReducer = cartSlice.reducer
