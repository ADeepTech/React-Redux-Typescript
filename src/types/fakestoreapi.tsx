/*
 * Copyright (c) ADeepTech
 * Licensed under the MIT license
 * https://github.com/ADeepTech/Full-Stack-pre-assessment/blob/master/LICENSE
 * @author AndyNgKM
 */

export interface ProductProps {
    id: number
    title: string
    price: number
    category: string
    description: string
    image: string
    rating: {
        rate: number
        count: number
    }
    quantity?: number
}
