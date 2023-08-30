import { RouterProvider } from 'react-router-dom';
import AppRoutes from './components/routes/index';

function App() {
  return (
    <div className='root'>
      <RouterProvider router={AppRoutes} />
    </div>
  );
}

export default App;
