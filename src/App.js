import logo from './logo.svg';
import './App.css';
import Login from './Page/Login/Login';
import Register from './Page/Register/Register'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
