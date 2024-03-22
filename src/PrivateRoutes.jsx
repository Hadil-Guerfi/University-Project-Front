import { Navigate, Outlet } from "react-router-dom";

//when make log in => set in local storage the id of user and   setUserField({ field: "userId", value: userId });
//bech mara jeya awal may7el yalga id fi local storage iset userField bel is heka bech fi ay component win nt7a9 id el user hwina madhmoun mwjoud fil context
//w bech njib el profile mteaa zeda

const PrivateRoutes = () => {
  // const [isloggedIn, SetIsLoggedIn] = useState(false);

  // const { setUserField } = useAuth();

  //     console.log("hi");

  // useEffect(() => {
  //   const token = document.cookie
  //     .split("; ")
  //     .find((row) => row.startsWith("token"));

  //     console.log(token)

  //   if (token) {
  //     setUserField({ field: "token", value: token });
  //     SetIsLoggedIn(true);
  //     console.log("logged in");
  //   }
  // }, []);

  const isloggedIn = false;
      console.log("hi");

  return isloggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
