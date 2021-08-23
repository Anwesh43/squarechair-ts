import { useState, useEffect } from "react";

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
                            return 0
                        }
                        return prev + scGap  
                    })
                }, delay)
            }
        }
    }
}

