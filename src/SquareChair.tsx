import React from 'react'
import { useStyle } from './hooks'
import withContext from './withContext'

interface SquareChairProps {
    w : number, 
    h : number, 
    scale : number, 
    onClick : Function 
}

const SquareChair = (props : SquareChairProps) => {
    const {lineStyle, squareStyle, parentStyle} = useStyle(props.w, props.h, props.scale)
    return (
        <div style = {parentStyle()}>
            <div style = {squareStyle()}></div>
            {[0, 1].map(i => (<div key = {`sqyare_${i}`} style = {lineStyle(i)}></div>))}
        </div>
    )
}

export default withContext(SquareChair)
