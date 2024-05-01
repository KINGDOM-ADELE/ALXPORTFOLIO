import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from './routes/Home';
import { Login } from './routes/Login';
import { Register } from './routes/Register';
import { Footer } from './routes/Footer';
import { AppContextProvider } from './Context/App_Context';
import { Admin } from './BranchComponent/Admin';
import { User } from './BranchComponent/User';
import { Contact } from './routes/Contact';
import { ResetPassword } from './routes/ResetPassword';
import { ForgotPassword } from './routes/ForgorPassword';
import Landing from './routes/Landingpage';
import { VerifyAccount } from './routes/verifyaccount';




function App() {
  return (
    <AppContextProvider >
      <BrowserRouter>
      
        <Routes>
          <Route path="home/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="contact" element={<Contact />} />
          <Route path="register" element={<Register />} />
          <Route path="verifyaccount" element={<VerifyAccount />} />
          <Route path="resetpassword" element={<ResetPassword />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
          <Route path="admin/*" element={<Admin />} />
          <Route path="user/*" element={<User />} />
          <Route path="" element={<Landing />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </AppContextProvider >
  )
}





export default App;