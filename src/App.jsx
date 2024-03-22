import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import Home from "./Home";
import Login from "./Login";
import AuthProvider from "./authProvider";
import Locals from "./Locals";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Home />} path="/" exact />
          <Route element={<Locals />} path="/locals" />
        </Route>
        <Route element={<Login />} path="/login" />
      </Routes>
    </AuthProvider>
  );
}

export default App;
