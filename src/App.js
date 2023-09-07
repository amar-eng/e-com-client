import { AppNavbar as Navbar } from './layouts/Navbar';

export const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      <div style={{ backgroundColor: '#101010', height: '80vh' }}>Hero</div>
    </div>
  );
};

export default App;
