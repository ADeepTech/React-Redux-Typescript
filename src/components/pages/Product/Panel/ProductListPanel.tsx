/*
 * Copyright (c) ADeepTech
 * Licensed under the MIT license
 * https://github.com/ADeepTech/Full-Stack-pre-assessment/blob/master/LICENSE
 * @author AndyNgKM
 */
import React from "react"
import { Link } from "react-router-dom"
import { ProductListProps } from "../../../../types/propTypes"
import "./ProductListPanel.css"

const ProductListPanel: React.FC<ProductListProps> = (props) => {
    const { productList } = props
    return (
        <div className="bg-white">
            <div className="max-w-2xl mx-auto py-4 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {(productList && productList.length > 0)
                        ? productList.map((product) => (
                              <Link key={product.id} to={`/product/${product.id}`}>
                                  <div className="group relative">
                                      <div className="w-full min-h-80 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                                          <img src={product.image} alt={product.title} className="w-full h-full object-center object-contain lg:w-full lg:h-full" />
                                      </div>
                                      <div className="mt-4 flex justify-between">
                                          <div style={{ width: "100%" }}>
                                              <h3 className="text-sm text-gray-700">
                                                  <span>{product.title}</span>
                                              </h3>
                                              <p className="product-desc mt-1 text-sm text-gray-500">{product.description}</p>
                                          </div>
                                      </div>
                                      <p className="text-sm font-medium text-gray-900">$ {product.price}</p>
                                  </div>
                              </Link>
                          ))
                        : null}
                </div>
            </div>
        </div>
    )
}
export default ProductListPanel
