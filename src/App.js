import { Outlet } from 'react-router-dom';
import { AppNavbar as Navbar } from './layouts/Navbar';
import { Container } from 'react-bootstrap';
export const App = () => {
  return (
    <>
      <div className="app-container">
        <Navbar />
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
