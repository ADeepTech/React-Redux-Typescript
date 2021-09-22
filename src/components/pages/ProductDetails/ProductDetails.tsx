/*
 * Copyright (c) ADeepTech
 * Licensed under the MIT license
 * https://github.com/ADeepTech/Full-Stack-pre-assessment/blob/master/LICENSE
 * @author AndyNgKM
 */
import React, { useState, MouseEvent } from "react"
import { Link, useParams } from "react-router-dom"
import { Dispatch } from "redux"
import { useSelector, useDispatch } from "react-redux"
import { StarIcon } from "@heroicons/react/solid"
import GoToCartPanel from "./Panel/GoToCartPanel"
import { ApplicationState } from "../../../store/store"
import { addProductToCart } from "../../../store/actions/cartActions"
import { getProductDetail } from "../../../store/actions/fakestoreActions"
import QuantityDropdown from "../../common/QuantityDropdown"
import * as UIHelper from "../../../common/helper/ui-helper"

const classNames = UIHelper.classNames

const ProductDetails: React.FC = () => {
    const { productId } = useParams<any>()
    const dispatch: Dispatch<any> = useDispatch()
    const productDetail = useSelector((state: ApplicationState) => state.fakestore.productDetail)
    const cartStatus = useSelector((state: ApplicationState) => state.cart.status)

    const [quantity, setQuantity] = useState(1)
    const [addItem, setAddItem] = useState(false)
    const [openPanel, setOpenPanel] = useState(false)

    React.useEffect(() => {
        if (productId) {
            dispatch(getProductDetail(productId))
        }
    }, [productId])

    React.useEffect(() => {
        if (addItem && cartStatus === "succeeded") {
            setOpenPanel(true)
        }
    }, [addItem, cartStatus])

    const addItemToCart = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        if (productDetail != null) {
            setAddItem(true)
            let productItem = { ...productDetail }
            productItem.quantity = quantity
            dispatch(addProductToCart(productItem))
        }
    }

    return (
        <div className="bg-white">
            <div className="pt-6">
                <nav aria-label="Breadcrumb">
                    <ol role="list" className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8">
                        <li>
                            <div className="flex items-center">
                                {productDetail ? (
                                    <Link to={`/${productDetail.category}/product`} style={{ textTransform: "capitalize" }} className="mr-2 text-sm font-medium text-gray-900">
                                        {productDetail.category}
                                    </Link>
                                ) : null}
                                <svg width={16} height={20} viewBox="0 0 16 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-4 h-5 text-gray-300">
                                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                </svg>
                            </div>
                        </li>
                        <li className="text-sm">
                            <span className="font-medium text-gray-500">{productDetail ? productDetail.title : ""}</span>
                        </li>
                    </ol>
                </nav>

                {/* Product info */}
                {productDetail ? (
                    <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
                        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{productDetail.title}</h1>
                        </div>

                        {/* Options */}
                        <div className="mt-4 lg:mt-0 lg:row-span-3">
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-3xl text-gray-900">$ {productDetail.price}</p>

                            {/* Reviews */}
                            <div className="mt-6">
                                <h3 className="sr-only">Reviews</h3>
                                <div className="flex items-center">
                                    <div className="flex items-center" title={`${productDetail.rating?.rate}` || ""}>
                                        {`${productDetail.rating?.rate}` || "0"}
                                        {[0, 1, 2, 3, 4].map((rating) => (
                                            <StarIcon key={rating} className={classNames((productDetail.rating?.rate || 0) > rating ? "text-gray-900" : "text-gray-200", "h-5 w-5 flex-shrink-0")} aria-hidden="true" />
                                        ))}
                                    </div>
                                    <span className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">{productDetail.rating?.count} reviews</span>
                                </div>
                            </div>

                            <form className="mt-10">
                                <QuantityDropdown quantity={quantity} setQuantity={setQuantity} />
                                <button
                                    type="button"
                                    onClick={addItemToCart}
                                    className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Add to cart
                                </button>
                            </form>
                        </div>

                        <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                            <div>
                                <h3 className="sr-only">Description</h3>

                                <div className="space-y-6">
                                    <p className="text-base text-gray-900">{productDetail.description}</p>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                                <div className="mt-4 space-y-6">
                                    <img src={productDetail.image} alt={productDetail.title} className="w-2/4 h-full object-center object-contain lg:w-2/4 lg:h-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}

                {productDetail != null ? <GoToCartPanel open={openPanel} setOpen={setOpenPanel} product={productDetail} /> : null}
            </div>
        </div>
    )
}
export default ProductDetails
