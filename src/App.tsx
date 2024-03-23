import '@fortawesome/fontawesome-free/css/all.min.css';
import { ToastProvider } from 'hooks/toast';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import 'styles/dataPicker.css';
import 'styles/global.css';
import Routes from './routes';

const App = () => {
  return (
    <>
      <ToastProvider>
        <Routes />
      </ToastProvider>
    </>
  );
};

export default App;
