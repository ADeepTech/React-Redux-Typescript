/*
 * Copyright (c) ADeepTech
 * Licensed under the MIT license
 * https://github.com/ADeepTech/Full-Stack-pre-assessment/blob/master/LICENSE
 * @author AndyNgKM
 */
import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { Dispatch } from "redux"
import { useSelector, useDispatch } from "react-redux"
import { ApplicationState } from "../../../store/store"
import { updateProductCart, removeProductCart } from "../../../store/actions/cartActions"
import { ProductProps } from "../../../types/fakestoreapi"
import QuantityDropdown from "../../common/QuantityDropdown"

const Cart: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch()
    const [subTotal, setSubTotal] = useState(0)
    const products = useSelector((state: ApplicationState) => state.cart.products)
    const history = useHistory()

    React.useEffect(() => {
        let total = 0
        if (products.length > 0) {
            products.forEach((product) => {
                if (product.quantity) {
                    total += product.price * product.quantity
                }
            })
        }
        setSubTotal(total)
    }, [products])

    const updateQuantity = (quantity: number, product: ProductProps) => {
        let productItem = { ...product }
        productItem.quantity = quantity
        dispatch(updateProductCart(productItem))
    }

    const removeProduct = (productId: number) => {
        dispatch(removeProductCart(productId))
    }

    const backProductPage = () => {
        history.push("/product")
    }

    return (
        <div className="bg-white">
            <div>
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex-1 py-6 px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                            <h2 className="text-lg font-medium text-gray-900">Shopping cart</h2>
                        </div>

                        <div className="mt-8">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                {products.length > 0
                                    ? products.map((product) => (
                                          <li key={product.id} className="py-6 flex">
                                              <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                                  <img src={product.image} alt={product.title} className="w-full h-full object-center object-cover" />
                                              </div>

                                              <div className="ml-4 flex-1 flex flex-col">
                                                  <div>
                                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                                          <h3>
                                                              <Link key={product.id} to={`/product/${product.id}`}>
                                                                  {product.title}
                                                              </Link>
                                                          </h3>
                                                          <p className="ml-4">$ {product.price}</p>
                                                      </div>
                                                      <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                                                  </div>
                                                  <div className="flex flex-col">
                                                      <div className="ml-4 flex-1 justify-between items-center text-sm">
                                                          <QuantityDropdown quantity={Number(product.quantity)} setQuantity={(quantity) => updateQuantity(quantity, product)} />
                                                      </div>
                                                      <div className="ml-4 flex-1 flex justify-between items-end text-sm">
                                                          <div className="flex">
                                                              <button onClick={() => removeProduct(product.id)} type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                                  Remove
                                                              </button>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                          </li>
                                      ))
                                    : "No Item in cart"}
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>$ <span id="subTotal" data-testid="subTotal">{subTotal}</span></p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                        <div className="mt-6">
                            <a href="#" className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                                Checkout
                            </a>
                        </div>
                        <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                            <p>
                                or{" "}
                                <button type="button" className="text-indigo-600 font-medium hover:text-indigo-500" onClick={backProductPage}>
                                    Continue Shopping<span aria-hidden="true"> &rarr;</span>
                                </button>
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
export default Cart
