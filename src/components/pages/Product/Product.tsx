/*
 * Copyright (c) ADeepTech
 * Licensed under the MIT license
 * https://github.com/ADeepTech/Full-Stack-pre-assessment/blob/master/LICENSE
 * @author AndyNgKM
 */
import React, { useState, Fragment, MouseEvent } from "react"
import { Link, useParams } from "react-router-dom"
import { Dispatch } from "redux"
import { useSelector, useDispatch } from "react-redux"
import { Menu, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/solid"
import ProductListPanel from "./Panel/ProductListPanel"
import { ApplicationState } from "../../../store/store"
import { getAllProducts, getCategories, getCategoryProducts } from "../../../store/actions/fakestoreActions"
import { ProductProps } from "../../../types/fakestoreapi"
import * as UIHelper from "../../../common/helper/ui-helper"

const classNames = UIHelper.classNames

function compareValues(key: string, order = "asc") {
    return function innerSort(a: any, b: any) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            return 0
        }

        const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key]
        const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key]

        let comparison = 0
        if (varA > varB) {
            comparison = 1
        } else if (varA < varB) {
            comparison = -1
        }
        return order === "desc" ? comparison * -1 : comparison
    }
}

function sortByRating(a: ProductProps, b: ProductProps) {
    return a.rating.rate - b.rating.rate
}

const sortOptionsT = [
    { name: "Best Rating", href: "#", current: false, sort: sortByRating },
    { name: "A to Z", href: "#", current: false, sort: compareValues("title", "asc") },
    { name: "Z to A", href: "#", current: false, sort: compareValues("title", "desc") },
    { name: "Price: Low to High", href: "#", current: false, sort: compareValues("price", "asc") },
    { name: "Price: High to Low", href: "#", current: false, sort: compareValues("price", "desc") },
]

const Product: React.FC = () => {
    const { categoryParam } = useParams<any>()
    const dispatch: Dispatch<any> = useDispatch()
    const categories = useSelector((state: ApplicationState) => state.fakestore.categories)
    const categoriesStatus = useSelector((state: ApplicationState) => state.fakestore.status)
    const products = useSelector((state: ApplicationState) => state.fakestore.products)
    const [productsList, setProductsList] = useState<ProductProps[]>([])
    const [sortOptions, setSortOptions] = useState(sortOptionsT)

    React.useEffect(() => {
        setProductsList(products)
    }, [products])

    React.useEffect(() => {
        if (categoriesStatus === "idle" || categories.length == 0) {
            dispatch(getCategories())
        }
    }, [])

    React.useEffect(() => {
        if (categoryParam) {
            dispatch(getCategoryProducts(categoryParam))
        } else {
            dispatch(getAllProducts())
        }
    }, [categoryParam])

    const sortProduct = (event: MouseEvent<HTMLAnchorElement>, name: string) => {
        event.preventDefault()
        if (name != "") {
            const newSortOptions = sortOptions.map((item) => {
                if (name === item.name) {
                    item.current = true
                    const newProductsList = productsList.slice().sort(item.sort)
                    setProductsList(newProductsList)
                } else {
                    item.current = false
                }
                return item
            })
            setSortOptions(newSortOptions)
        }
    }

    return (
        <div className="bg-white">
            <div>
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative z-10 flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Products</h1>

                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                        Sort
                                        <ChevronDownIcon className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95">
                                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            {sortOptions.map((option) => (
                                                <Menu.Item key={option.name}>
                                                    {({ active }) => (
                                                        <a onClick={(event) => sortProduct(event, option.name)} href={option.href} className={classNames(option.current ? "font-medium text-gray-900" : "text-gray-500", active ? "bg-gray-100" : "", "block px-4 py-2 text-sm")}>
                                                            {option.name}
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pt-6 pb-24">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
                            {/* Filters */}
                            <form className="hidden lg:block">
                                <h3 className="sr-only">Categories</h3>
                                <ul role="list" style={{ textTransform: "capitalize" }} className="text-sm font-medium text-gray-900 space-y-4 pb-6 border-b border-gray-200">
                                    {categories.map((category) => (
                                        <li key={category}>
                                            <Link to={`/${category}/product`}>
                                                <span>{category}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </form>

                            {/* Product grid */}
                            <div className="lg:col-span-3">
                                {/* Replace with your content */}
                                <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 lg:h-full">
                                    <ProductListPanel productList={productsList} />
                                </div>
                                {/* /End replace */}
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}
export default Product
