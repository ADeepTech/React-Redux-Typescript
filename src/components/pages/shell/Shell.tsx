/*
 * Copyright (c) ADeepTech
 * Licensed under the MIT license
 * https://github.com/ADeepTech/React-KanbanBoard-DevOps/blob/master/LICENSE
 * @author AndyNgKM
 */
import React from "react"
import { ShellProps } from "../../../types/propTypes"

const Shell: React.FC<ShellProps> = (props) => {
    const Component = props.Component

    return (
        <>
            <Component />
        </>
    )
}

export default Shell
