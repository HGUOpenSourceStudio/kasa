import { createRoot } from 'react-dom/client';
import RouterComponent from './components/Router';
import reportWebVitals from './reportWebVitals';

import './index.scss';
import './theme.css';

const root = createRoot(document.getElementById('root'));
root.render(<RouterComponent />);

reportWebVitals();