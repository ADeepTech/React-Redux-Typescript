/*
 * Copyright (c) ADeepTech
 * Licensed under the MIT license
 * https://github.com/ADeepTech/Full-Stack-pre-assessment/blob/master/LICENSE
 * @author AndyNgKM
 */
import { FC } from "react"
import { Switch, Route } from "react-router-dom"

import Shell from "../pages/shell/Shell"
import Header from "../pages/shell/Header"
import Cart from "../pages/Cart/Cart"
import Product from "../pages/Product/Product"
import ProductDetails from "../pages/ProductDetails/ProductDetails"

const pagesConfig = [
    {
        name: "",
        to: "/",
        exact: true,
        Component: Product,
    },
    {
        name: "Product",
        to: "/product",
        exact: true,
        Component: Product,
    },
    {
        name: "",
        to: "/product/:productId",
        exact: false,
        Component: ProductDetails,
    },
    {
        name: "",
        to: "/:categoryParam/product",
        exact: false,
        Component: Product,
    },
    {
        name: "",
        to: "/cart",
        exact: true,
        Component: Cart,
    },
]

function Routes() {
    const renderComponentsPage = (Component: FC) => {
        return <Shell Component={Component} />
    }

    return (
        <>
            <Header pagesConfig={pagesConfig} />
            <Switch>
                {pagesConfig.map(({ to, exact, Component }) => {
                    return <Route exact={exact} path={to} key={to} render={(props) => renderComponentsPage(Component)} />
                })}
            </Switch>
        </>
    )
}
export default Routes
