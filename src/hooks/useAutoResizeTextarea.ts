import { useEffect, MutableRefObject } from 'react';

const useAutoResizeTextArea = (textAreaRef: MutableRefObject<HTMLTextAreaElement | null>, value: string, size?: string) => {
    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = size || '2rem';
            textAreaRef.current.style.height = Math.min(textAreaRef.current.scrollHeight, 126) + 'px';
            textAreaRef.current.style.overflowY = textAreaRef.current.scrollHeight > 126 ? 'auto' : 'hidden';
        }
    }, [value]);
};

export { useAutoResizeTextArea };
