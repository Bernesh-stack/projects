import "./globals.css"
import { Route,Routes } from "react-router-dom";
import SigninForm from "./_auth/Forms/SigninForm";
import SignupForm from "./_auth/Forms/SignupForm";
import { Home } from "./_root/Pages";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";

import { Toaster } from "@/components/ui/toaster"







function App() {
    return (
      <main className="flex h-screen">
        <Routes>

          <Route element={<AuthLayout/>}>
                  <Route element={<SigninForm/>} path="/sign-in"/>
                  <Route element={<SignupForm/>} path="/sign-up"/>

          </Route>

{/* Public  */}
          <Route element={<RootLayout/>}>
                <Route element={<Home/>} index/>
          </Route>



          {/* Private */}

        </Routes>
        <Toaster/>
      </main>


    );
  }
  
  export default App