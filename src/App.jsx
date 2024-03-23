import { Route, Routes } from "react-router-dom";
import ConfigProv from "./components/configProv/ConfigProv";
import Login from "./login/Login";
import AuthProvider from "./context/auth/authProvider";

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
