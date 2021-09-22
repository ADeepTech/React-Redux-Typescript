import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { configureStore } from "@reduxjs/toolkit"
import { configure } from "@testing-library/dom"
import { render, screen } from "@testing-library/react"
import Cart from "../Cart"
import { ApplicationState } from "../../../../store/store"
import cartReducer, { CartState } from "../../../../store/reducers/cartReducer"
import fakestoreReducer from "../../../../store/reducers/fakestoreReducer"
import { addProductToCart } from "../../../../store/actions/cartActions"
import { ProductProps } from "../../../../types/fakestoreapi"

configure({ testIdAttribute: "id" })

const initialState: ApplicationState = {
    cart: {
        status: "idle",
        productCount: 0,
        products: [],
        error: "",
    },
    fakestore: {
        status: "idle",
        isFetching: false,
        categories: [],
        products: [],
        productDetail: null,
        error: "",
    },
}

const initialStateTest: CartState = {
    status: "idle",
    productCount: 0,
    products: [],
    error: "",
}

const product1: ProductProps = {
    category: "electronics",
    description:
        "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
    id: 9,
    image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    price: 64,
    rating: { rate: 3.3, count: 203 },
    title: "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
    quantity: 2,
}
const product2: ProductProps = {
    category: "men's clothing",
    description: "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
    id: 4,
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    price: 15.99,
    rating: { rate: 2.1, count: 430 },
    title: "Mens Casual Slim Fit",
    quantity: 5,
}

test("should return the initial state", () => {
    expect(cartReducer(initialStateTest, { type: "" })).toEqual({
        status: "idle",
        productCount: 0,
        products: [],
        error: "",
    })
})

describe("should add a product to cart", () => {
    const store = configureStore({ reducer: { cart: cartReducer, fakestore: fakestoreReducer }, preloadedState: initialState })
    it("Add product1 to cart", async () => {
        await store.dispatch(addProductToCart(product1))
        expect(store.getState().cart).toEqual({
            status: "succeeded",
            productCount: 1,
            products: [product1],
            error: "",
        })
    })
})

describe("should add products to cart and get correct subtotal", () => {
    const store = configureStore({ reducer: { cart: cartReducer, fakestore: fakestoreReducer }, preloadedState: initialState })
    it("add product 1 to cart", async () => {
        await store.dispatch(addProductToCart(product1))
        expect(store.getState().cart).toEqual({
            status: "succeeded",
            productCount: 1,
            products: [product1],
            error: "",
        })
    })

    it("add product 2 to cart", async () => {
        await store.dispatch(addProductToCart(product2))
        expect(store.getState().cart).toEqual({
            status: "succeeded",
            productCount: 2,
            products: [product1, product2],
            error: "",
        })
    })

    it("render and get correct subtotal", async () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Cart />
                </Provider>
            </BrowserRouter>
        )
        const subTotal = screen.getByTestId("subTotal")
        if (subTotal) {
            let correctSubtotal = (Number(product1.quantity) * product1.price) + (Number(product2.quantity) * product2.price)
            console.log("Subtotal : ", subTotal.innerHTML)
            console.log("CorrectSubtotal : ", correctSubtotal)
            expect(subTotal).toHaveTextContent(correctSubtotal.toString())
        }
    })
})

test("render shopping cart test", () => {
    const store = configureStore({ reducer: { cart: cartReducer, fakestore: fakestoreReducer }, preloadedState: initialState })
    render(
        <BrowserRouter>
            <Provider store={store}>
                <Cart />
            </Provider>
        </BrowserRouter>
    )
    const linkElement = screen.getByText(/Shopping cart/i)
    expect(linkElement).toBeInTheDocument()
})
