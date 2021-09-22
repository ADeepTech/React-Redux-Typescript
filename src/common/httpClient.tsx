/*
 * Copyright (c) ADeepTech
 * Licensed under the MIT license
 * https://github.com/ADeepTech/Full-Stack-pre-assessment/blob/master/LICENSE
 * @author AndyNgKM
 */
import axios, { AxiosError, AxiosResponse } from "axios"

const httpClient = axios.create({
    baseURL: "https://fakestoreapi.com",
    headers: {
        "Content-type": "application/json",
    },
})

export function httpGet(url: string, params: string[] | null): any {
    return new Promise(async (resolve) => {
        httpClient
            .get(url, {
                params: params,
            })
            .then((res: AxiosResponse<any>): void => resolve(res.data))
            .catch((err: Error | AxiosError): void => {
                if (axios.isAxiosError(err)) {
                    resolve(err.response)
                } else {
                    resolve(null)
                }
            })
    })
}
