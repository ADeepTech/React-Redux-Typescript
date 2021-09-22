/*
 * Copyright (c) ADeepTech
 * Licensed under the MIT license
 * https://github.com/ADeepTech/Full-Stack-pre-assessment/blob/master/LICENSE
 * @author AndyNgKM
 */
import { createAsyncThunk } from "@reduxjs/toolkit"
import * as actionTypes from "./actionTypes"
import { ApplicationState } from "../../store/store"
import { ProductProps } from "../../types/fakestoreapi"

type ThunkApi = {
    state: ApplicationState
    rejectValue: Error | null
}

export const addProductToCart = createAsyncThunk<ProductProps[], ProductProps, ThunkApi>(actionTypes.ADD_PRODUCT_TO_CART, async (record, thunkApi) => {
    const state = thunkApi.getState()
    const products = state.cart.products
    let newProductsList: ProductProps[] = []
    try {
        let productExist = false
        newProductsList = products.map((product) => {
            let newProduct = Object.assign({}, product)
            if (newProduct.id === record.id && newProduct.quantity && record.quantity) {
                newProduct.quantity = newProduct.quantity + record.quantity
                productExist = true
            }
            return newProduct
        })
        if (!productExist) {
            newProductsList.push(record)
        }
    } catch (err: any) {
        console.log("err", err.stack)
    }
    return newProductsList
})

export const updateProductCart = createAsyncThunk<ProductProps[], ProductProps, ThunkApi>(actionTypes.UPDATE_PRODUCT_CART, async (record, thunkApi) => {
    const state = thunkApi.getState()
    const products = state.cart.products
    let newProductsList: ProductProps[] = []
    try {
        newProductsList = products.map((product) => {
            if (product.id === record.id) {
                return record
            }
            return product
        })
    } catch (err: any) {
        console.log("err", err.stack)
    }
    return newProductsList
})

export const removeProductCart = createAsyncThunk<ProductProps[], number, ThunkApi>(actionTypes.REMOVE_PRODUCT_FROM_CART, async (productId, thunkApi) => {
    const state = thunkApi.getState()
    const products = state.cart.products
    let newProductsList: ProductProps[] = []
    try {
        newProductsList = products.filter((product) => product.id !== productId)
    } catch (err: any) {
        console.log("err", err.stack)
    }
    return newProductsList
})
