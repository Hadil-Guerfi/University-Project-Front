import { Route, Routes } from "react-router-dom";
import ConfigProv from "./components/configProv/ConfigProv";
import Login from "./pages/login/Login";
import AuthProvider from "./context/auth/authProvider";
import { Header } from "antd/es/layout/layout";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Login />} path="/login" />
      </Routes>
      <ConfigProv />
    </AuthProvider>
    
  );
}

export default App;
