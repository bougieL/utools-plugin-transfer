import { createRoot } from 'react-dom/client';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import App from './App';
// @ts-ignore
import logo from '../../logo.png';

initializeIcons();

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<App />);

window.renderer = {
  showNotification(body, onClick) {
    new Notification('File Transfer', { body, icon: logo }).onclick = () => {
      onClick?.();
    };
  },
};
