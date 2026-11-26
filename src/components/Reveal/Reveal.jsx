import { useEffect, useRef, useState } from 'react';
import './Reveal.css';

// 화면에 들어오면 아래에서 떠오른다. 지원하지 않는 환경에서는 바로 보여준다.
function Reveal({ children, className = '', as: Tag = 'div', ...rest }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(typeof IntersectionObserver === 'undefined');

    useEffect(() => {
        if (visible || !ref.current) return undefined;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setVisible(true);
        }, { threshold: 0.12 });
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [visible]);

    return (
        <Tag ref={ref} className={`reveal ${visible ? 'visible' : ''} ${className}`} {...rest}>
            {children}
        </Tag>
    );
}

export default Reveal;
