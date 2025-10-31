import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import Header from "./components/header";
import RegisterPage from "./pages/registerPage";
import LoginPage from "./pages/loginPage";


export default function App() {
  return (
    <div className="">
      <BrowserRouter>
        <div >
          <Header/>
          
          <Routes path="/*">
            {/* <Route path="/login" element={<LoginPage />}/>
            <Route path="/register" element={<><RegisterPage /></>} /> */}
            
            <Route path="/*" element={<><HomePage /></>} />
            <Route path="/register" element={<><RegisterPage /></>} />
            <Route path="/login" element={<><LoginPage /></>} />

            
            

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
