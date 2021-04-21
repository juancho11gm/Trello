import { useRef, useEffect } from 'react';

export const useFocus = () => {
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        console.log('Use effect');
        ref.current?.focus();
    });

    return ref;
}