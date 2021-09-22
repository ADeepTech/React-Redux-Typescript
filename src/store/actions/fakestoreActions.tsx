/*
 * Copyright (c) ADeepTech
 * Licensed under the MIT license
 * https://github.com/ADeepTech/Full-Stack-pre-assessment/blob/master/LICENSE
 * @author AndyNgKM
 */
import { createAsyncThunk } from "@reduxjs/toolkit"
import * as actionTypes from "./actionTypes"
import * as HttpClient from "../../common/httpClient"
import { ProductProps } from "../../types/fakestoreapi"

type ThunkApi = {
    rejectValue: Error | null
}

export const getCategories = createAsyncThunk<string[]>(actionTypes.GET_CATEGORIES, async () => {
    let result: string[] = []
    result = await HttpClient.httpGet("/products/categories", null)
    return result
})

export const getCategoryProducts = createAsyncThunk<ProductProps[], string, ThunkApi>(actionTypes.GET_CATEGORIES_PRODUCTS, async (category, thunkApi) => {
    let result: ProductProps[] = []
    result = await HttpClient.httpGet(`/products/category/${category}`, null)
    return result
})

export const getAllProducts = createAsyncThunk<ProductProps[]>(actionTypes.GET_ALL_PRODUCTS, async () => {
    let result: ProductProps[] = []
    result = await HttpClient.httpGet(`/products`, null)
    return result
})

export const getProductDetail = createAsyncThunk<ProductProps | null, number, ThunkApi>(actionTypes.GET_PRODUCT_DETAIL, async (id, thunkApi) => {
    let result: ProductProps | null = null
    result = await HttpClient.httpGet(`/products/${id}`, null)
    return result
})
