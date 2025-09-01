import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/dates/styles.css';
import 'mantine-datatable/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/charts/styles.css';
import './styles/tailwind.css';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import KTheme from '@components/KTheme.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <KTheme>
    <App />
  </KTheme>,
  // </React.StrictMode>,
);
