import React, {useContext} from 'react';
import {colorContext} from "./color";


export default function Showarea(){
    var {color} = useContext(colorContext)  //useContext 必须写在函数中
    return (
        <div style={{color: color}}>
           color 
        </div>
    )
}