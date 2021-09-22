/*
 * Copyright (c) ADeepTech
 * Licensed under the MIT license
 * https://github.com/ADeepTech/Full-Stack-pre-assessment/blob/master/LICENSE
 * @author AndyNgKM
 */
import React, { useState, Fragment } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid"
import { QuantityDropdownProps } from "../../types/propTypes"
import * as UIHelper from "../../common/helper/ui-helper"

const classNames = UIHelper.classNames

const QuantityDropdown: React.FC<QuantityDropdownProps> = (props) => {
    const { quantity, setQuantity } = props

    return (
        <Listbox value={quantity} onChange={setQuantity}>
            {({ open }) => (
                <>
                    <Listbox.Label style={{paddingRight: "8px"}} className="block text-sm font-medium text-gray-700">Qty</Listbox.Label>
                    <div className="mt-1 relative">
                        <Listbox.Button className="relative w-1/3 bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <span className="flex items-center">
                                <span className="ml-3 block truncate">{quantity}</span>
                            </span>
                            <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                        </Listbox.Button>

                        <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                            <Listbox.Options className="absolute z-10 mt-1 w-1/3 bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                    <Listbox.Option key={num} className={({ active }) => classNames(active ? "text-white bg-indigo-600" : "text-gray-900", "cursor-default select-none relative py-2 pl-3 pr-9")} value={num}>
                                        {({ selected, active }) => (
                                            <>
                                                <div className="flex items-center">
                                                    <span className={classNames(selected ? "font-semibold" : "font-normal", "ml-3 block truncate")}>{num}</span>
                                                </div>

                                                {selected ? (
                                                    <span className={classNames(active ? "text-white" : "text-indigo-600", "absolute inset-y-0 right-0 flex items-center pr-4")}>
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    )
}
export default QuantityDropdown
