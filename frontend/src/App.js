// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import GarageSalePage from "./pages/GarageSalePage/GarageSalePage";
import NewSalePage from "./pages/NewSalePage/NewSalePage";
import EditSalePage from "./pages/EditSalePage/EditSalePage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import MySales from "./pages/MySalesPage/MySalesPage";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={
            // <PrivateRoute>
            <HomePage />
            // </PrivateRoute>
          }
        />
        <Route path='/mySalesPage' element={
          <PrivateRoute> 
            <MySales />
          </PrivateRoute>
        }/>
        <Route path='/garage_sales/:garage_sale_id' element={
          <PrivateRoute> 
            <EditSalePage />
          </PrivateRoute>
        }/>
          <Route path='/garage_sales' element={
          <PrivateRoute> 
            <NewSalePage />
          </PrivateRoute>
        }/>
        <Route path="/garage_sales/:garage_sale_id" element={<GarageSalePage />}/>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
