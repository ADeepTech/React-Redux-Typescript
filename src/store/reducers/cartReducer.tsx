/*
 * Copyright (c) ADeepTech
 * Licensed under the MIT license
 * https://github.com/ADeepTech/React-KanbanBoard-DevOps/blob/master/LICENSE
 * @author AndyNgKM
 */
import { createSlice } from "@reduxjs/toolkit"
import * as cartActions from "../actions/cartActions"
import { ProductProps } from "../../types/fakestoreapi"

export interface CartState {
    status: "idle" | "loading" | "succeeded" | "failed"
    productCount: number
    products: ProductProps[]
    error: string | undefined
}

const initialState: CartState = {
    status: "idle",
    productCount: 0,
    products: [],
    error: "",
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // omit existing reducers here
    },
    extraReducers(builder) {
        builder.addCase(cartActions.addProductToCart.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.productCount = action.payload.length
            state.products = action.payload
        })
        builder.addCase(cartActions.updateProductCart.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.productCount = action.payload.length
            state.products = action.payload
        })
        builder.addCase(cartActions.removeProductCart.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.productCount = action.payload.length
            state.products = action.payload
        })
    },
})

export const actions = cartSlice.actions

export default cartSlice.reducer
