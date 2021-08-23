import { useState, useEffect, CSSProperties } from "react";

export const useAnimatedScale = () => {
    const [scale, setScale] = useState(0)
    const [animated, setAnimated] = useState(false)
    const scGap : number = 0.02 
    const delay : number = 20 
    return {
        scale, 
        start() {
            if (!animated) {
                setAnimated(true)
                const interval = setInterval(() => {
                    setScale((prev : number) => {
                        if (prev > 1) {
                            setAnimated(false)
                            clearInterval(interval)
                            return 0
                        }
                        return prev + scGap  
                    })
                }, delay)
            }
        }
    }
}

export const useDimension = () => {
    const [w, setW] = useState(window.innerWidth)
    const [h, setH] = useState(window.innerHeight)
    useEffect(() => {
        window.onresize = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)
        }
        return () => {
            window.onresize = () => {

            }
        }
    })
    return {
        w, 
        h
    }
}

const maxScale = (scale : number, i : number, n : number) : number => Math.max(0, scale - i / n)

const divideScale = (scale : number, i : number, n : number) : number => Math.min(1 / n, maxScale(scale, i, n)) * n 

export const useStyle = (w : number, h : number, scale : number) => {
    const size : number = Math.min(w, h) / 10 
    const position = 'absolute'
    const sf : number = Math.sin(scale * Math.PI)
    const sc1 = divideScale(sf, 0, 3) 
    const sc2 = divideScale(sf, 1, 3)
    const sc3 = divideScale(sf, 2, 3)
    const background = '#311B92'
    return {
        parentStyle() : CSSProperties {
            const left = `${w / 2}px`
            const top = `${h / 2 + (h / 2 - size) * sc3}px`
            const transform = `rotate(${180 * sc2}deg)`
            return {
                left, 
                top, 
                position,
                transform, 
            }
        },
        squareStyle() : CSSProperties {
            const width = `${size}px`
            const height = `${size}px`
            const left = `${-size / 2}px`
            const top = `${-size / 2}px`
            return {
                position,
                width, 
                height,
                left, 
                top,
                background
            }           
        },
        lineStyle(i : number) : CSSProperties {
            const width = `${Math.min(w, h) / 90}px`
            const height = `${size * sc1}px`
            const left = `${-size / 2 + (size - Math.min(w, h) / 90) * i}px`
            const top = `${-size * sc1}px`
            return {
                position, 
                width, 
                height, 
                left, 
                top, 
                background 
            }
        }
    }
}