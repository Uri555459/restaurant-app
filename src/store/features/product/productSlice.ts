import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import axios from 'axios'

import { PREFIX } from '@/helpers/API'

import { RootState } from '@/store/store'

import { IProduct } from '@/types/product.interface'

export interface IProductItem {
	product: IProduct
}

const initialState: IProductItem = {
	product: {
		id: 0,
		name: '',
		price: 0,
		ingredients: [],
		image: '',
		rating: 0
	}
}

export const getProduct = createAsyncThunk(
	'products/getProduct',
	async (params: { id: string }) => {
		try {
			const { data } = await axios.get(`${PREFIX}/products/${params.id}`)

			return data
		} catch (error) {
			if (error instanceof AxiosError) {
				throw new Error(error.response?.data.message)
			}
		}
	}
)

export const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(
			getProduct.fulfilled,
			(state, action: PayloadAction<IProduct>) => {
				state.product = action.payload
			}
		)
	}
})

export const selectProduct = (state: RootState) => state.product

export const productReducer = productSlice.reducer
