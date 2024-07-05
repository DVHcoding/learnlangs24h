import { useEffect, useState, useRef } from 'react';

const Gallery: React.FC<{ imageUrl: string; index: number }> = ({ imageUrl, index }) => {
    const ref = useRef<HTMLImageElement>(null); // Chỉ định kiểu dữ liệu cho useRef
    const [inView, setInView] = useState<boolean>(false);

    let callback: IntersectionObserverCallback = (entries) => {
        // Chỉ định kiểu dữ liệu cho callback
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setInView(true);
            }
        });
    };

    useEffect(() => {
        let observer = new IntersectionObserver(callback);

        if (ref?.current) {
            observer.observe(ref.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    return inView ? (
        <img
            src={imageUrl}
            alt={`Image ${index + 1}`}
            style={{
                margin: '10px',
                width: '200px',
                height: '200px',
            }}
        />
    ) : (
        <img ref={ref} style={{ width: '200px', height: '200px', backgroundColor: 'green' }} alt="" />
    );
};

export default Gallery;
