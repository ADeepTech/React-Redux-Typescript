/*
 * Copyright (c) ADeepTech
 * Licensed under the MIT license
 * https://github.com/ADeepTech/React-KanbanBoard-DevOps/blob/master/LICENSE
 * @author AndyNgKM
 */
import { createSlice } from "@reduxjs/toolkit"
import * as fakestoreActions from "../actions/fakestoreActions"
import { ProductProps } from "../../types/fakestoreapi"

export interface FakeStoreState {
    status: "idle" | "loading" | "succeeded" | "failed"
    isFetching: boolean
    categories: string[]
    products: ProductProps[]
    productDetail: ProductProps | null
    error: string | undefined
}

const initialState: FakeStoreState = {
    status: "idle",
    isFetching: false,
    categories: [],
    products: [],
    productDetail: null,
    error: "",
}

const fakestoreSlice = createSlice({
    name: "fakestore",
    initialState,
    reducers: {
        // omit existing reducers here
    },
    extraReducers(builder) {
        builder
            .addCase(fakestoreActions.getCategories.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(fakestoreActions.getCategories.fulfilled, (state, action) => {
                state.status = "succeeded"
                // Add any fetched posts to the array
                state.categories = state.categories.concat(action.payload)
            })
            .addCase(fakestoreActions.getCategories.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })
            .addCase(fakestoreActions.getAllProducts.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.products = action.payload
            })
            .addCase(fakestoreActions.getCategoryProducts.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.products = action.payload
            })
            .addCase(fakestoreActions.getProductDetail.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.productDetail = action.payload
            })
    },
})

export default fakestoreSlice.reducer
