import { useEffect, useState } from 'react';
import rooms from '../assets/data/logements.json';

const KEY = 'homez:favorites';
const EVENT = 'homez:favorites-changed';

// 저장이 막혀 있거나 값이 깨져 있어도 빈 목록으로 동작한다.
export function readFavorites() {
    try {
        const value = JSON.parse(window.localStorage.getItem(KEY));
        return Array.isArray(value) ? value.filter((id) => rooms.some((r) => r.id === id)) : [];
    } catch {
        return [];
    }
}

let memory = null;

export function useFavorites() {
    const [ids, setIds] = useState(() => memory ?? readFavorites());

    useEffect(() => {
        const sync = () => setIds(memory ?? readFavorites());
        window.addEventListener(EVENT, sync);
        return () => window.removeEventListener(EVENT, sync);
    }, []);

    const toggle = (id) => {
        const current = memory ?? readFavorites();
        const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
        try {
            window.localStorage.setItem(KEY, JSON.stringify(next));
            memory = null;
        } catch {
            memory = next;
        }
        window.dispatchEvent(new Event(EVENT));
    };

    return { ids, toggle };
}
