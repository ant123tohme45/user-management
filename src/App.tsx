import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './log/Login';
import Home from './screens/Home';
import Layout from './Layout'; 


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Protected layout with Navbar */}
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
