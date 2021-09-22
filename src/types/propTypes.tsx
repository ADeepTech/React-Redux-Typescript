/*
 * Copyright (c) ADeepTech
 * Licensed under the MIT license
 * https://github.com/ADeepTech/Full-Stack-pre-assessment/blob/master/LICENSE
 * @author AndyNgKM
 */
import React from "react"
import * as fakestoreapi from "./fakestoreapi"

export interface PagesConfigProps {
    name: string
    to: string
    exact: boolean
    current?: boolean
    Component: React.FC
}

export interface HeaderProps {
    pagesConfig: PagesConfigProps[]
}

export interface ShellProps {
    Component: React.FC
    theme?: string
    defaultOpenKeys?: string
    defaultSelectedKeys?: string
    isMobile?: boolean
    priority?: boolean
}

export interface ProductListProps {
    productList: fakestoreapi.ProductProps[]
}

export interface GoToCartPanelProps {
    open: boolean
    setOpen: ((value: boolean) => void)
    product: fakestoreapi.ProductProps
}

export interface QuantityDropdownProps {
    quantity: number
    setQuantity: ((value: number) => void)
}