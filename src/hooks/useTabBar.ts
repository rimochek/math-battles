import { useRef, useState, useCallback } from 'react';

export const useTabBar = <TabElement extends HTMLElement, IndicatorElement extends HTMLElement>(
    initialValue: string
) => {
    const [activeValue, setActiveValue] = useState(initialValue);
    const indicatorRef = useRef<IndicatorElement>(null);
    const tabRefs = useRef<Map<string, TabElement>>(new Map());

    const setRef = useCallback((value: string, element: TabElement) => {
        if (element) {
            tabRefs.current.set(value, element);
        }
    }, []);

    const setActive = useCallback((value: string) => {
        setActiveValue(value);
        
        const activeTab = tabRefs.current.get(value);
        const indicator = indicatorRef.current;
        
        if (activeTab && indicator) {
            const tabRect = activeTab.getBoundingClientRect();
            const parentRect = activeTab.parentElement?.getBoundingClientRect();
            
            if (parentRect) {
                const left = tabRect.left - parentRect.left;
                indicator.style.left = `${left}px`;
                indicator.style.width = `${tabRect.width}px`;
            }
        }
    }, []);

    return {
        indicatorRef,
        setRef,
        setActive,
        activeValue
    };
};