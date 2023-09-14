import { Outlet } from 'react-router-dom';
import { AppNavbar as Navbar } from './layouts/Navbar';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
export const App = () => {
  return (
    <>
      <div className="app-container">
        <Navbar />
        <ToastContainer />
        <main className="py-3">
          <Container>
            <Outlet />
          </Container>
        </main>
      </div>
    </>
  );
};

export default App;
