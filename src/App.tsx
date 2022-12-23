import Routes from './routes';
import 'styles/global.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'styles/dataPicker.css';
import { ToastProvider } from 'hooks/toast';

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
