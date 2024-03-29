import { useLayoutEffect, useCallback, useState } from 'react'

function getRect(element: HTMLElement) {
    if (!element) {
        return {
            bottom: 0,
            height: 0,
            left: 0,
            right: 0,
            top: 0,
            width: 0,
        }
    }

    return element.getBoundingClientRect()
}

export const useRect = (ref?: any) => {
    if (!ref) return;

    const [rect, setRect] = useState(ref ? getRect(ref.current) : null)

    const handleResize = useCallback(() => {
        if (!ref.current) {
            return
        }

        // Update client rect
        setRect(getRect(ref.current))
    }, [ref])

    useLayoutEffect(() => {
        const element = ref.current
        if (!element) {
            return
        }

        handleResize()

        if (typeof ResizeObserver === 'function') {
            let resizeObserver = new ResizeObserver(() => handleResize())
            resizeObserver.observe(element)

            return () => {
                if (!resizeObserver) {
                    return
                }

                resizeObserver.disconnect()

            }
        } else {
            // Browser support, remove freely
            window.addEventListener('resize', handleResize)

            return () => {
                window.removeEventListener('resize', handleResize)
            }
        }
    }, [ref.current])

    return rect
}

