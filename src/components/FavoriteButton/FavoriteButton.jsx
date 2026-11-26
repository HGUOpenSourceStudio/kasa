import './FavoriteButton.css';
import { useFavorites } from '../../utils/favorites';

function FavoriteButton({ id, title, className = '' }) {
    const { ids, toggle } = useFavorites();
    const on = ids.includes(id);
    return (
        <button type="button" className={`favorite ${on ? 'on' : ''} ${className}`} aria-pressed={on}
            aria-label={`${title} 찜`} onClick={() => toggle(id)}>
            <i className={`${on ? 'fa-solid' : 'fa-regular'} fa-heart`} aria-hidden="true"></i>
        </button>
    );
}

export default FavoriteButton;
