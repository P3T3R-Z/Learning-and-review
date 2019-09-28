import React, { createContext, useReducer } from 'react';

export const colorContext = createContext();
export const color_update = 'color_update';

const reducer = (state, action)=>{
    switch(action.type){
        case color_update:
            return action.color
        default:
            return state
    }
}

export const Color = props=>{
    const [color, dispatch] = useReducer(reducer, 'blue')
    return (
        <colorContext.Provider value={{color, dispatch}}>
            {props.children}
        </colorContext.Provider>
    )
}