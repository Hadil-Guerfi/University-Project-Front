// import { Navigate } from "react-router-dom";
import { Button, ConfigProvider, Form, Input } from "antd";
import logoIssatSo from "./issatso.png";
import { UseLogin } from "./API";
import { useState } from "react";
import { useAuth } from "./authProvider";
import { Navigate } from "react-router-dom";

function Login() {


  const {loggedIn}=useAuth();

  console.log(loggedIn)

  const onSucessLogin = () => {
    // console.log(data);

    Object.keys(user).forEach((key) => {
      setUser((prevUser) => ({
        ...prevUser,
        [key]: { ...prevUser[key], error: "" }, // Reset error only
      }));
    });
  };

  const onErrorLogin = (error) => {
    const errors = error.response.data.message;

    Object.keys(user).forEach((key) => {
      let keyErrors = [];

      errors.forEach((error) => {
        if (error.path === key) {
          keyErrors.push(error);
        }
      });

      if (keyErrors.length > 0) {
        setUser((prevUser) => ({
          ...prevUser,
          [key]: { ...prevUser[key], error: keyErrors[0].msg },
        }));
      } else {
        setUser((prevUser) => ({
          ...prevUser,
          [key]: { ...prevUser[key], error: "" }, // Reset error only
        }));
      }
    });
  };

  const [user, setUser] = useState({
    email: { value: "homi@gmail.com", error: "" },
    password: { value: "123456789", error: "" },
  });

  const { mutate: login } = UseLogin(onSucessLogin, onErrorLogin);

  const handleClickLogin = () => {
    console.log({ email: user.email.value, password: user.password.value });

    login({ email: user.email.value, password: user.password.value });
  };

  // console.log(user, "user");

  return (
    <>
      {!loggedIn ? (
        <div className=" bg-loginBg relative w-screen h-screen flex flex-col items-center justify-start ">
          <h2 className=" text-[#090914c7] mx-auto w-fit pt-12 text-4xl font-bold">
            Bienvenu(e)
          </h2>
          <p className=" mx-auto w-fit py-10 ">
            Veuillez saisir vos paramètres d&apos;accès à votre compte !
          </p>

          <div className=" bg-white relative p-5   w-[400px] rounded-lg shadow-md">
            <Form className="w-full" layout="vertical">
              <Form.Item>
                <img
                  src={logoIssatSo}
                  alt="logo issat"
                  className="mx-auto w-[150px] "
                />
              </Form.Item>
              <Form.Item
                label={
                  <label
                    style={{
                      color: "rgb(54 59 100 / 85%)",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}>
                    Email
                  </label>
                }
                validateStatus={user.email.error ? "error" : ""}
                help={user.email.error ? user.email.error : ""}>
                <Input
                  placeholder="Entrer email"
                  onChange={(e) => {
                    setUser((prevUser) => ({
                      ...prevUser,
                      email: {
                        ...prevUser.email,
                        value: e.target.value,
                      },
                    }));
                  }}
                  value={user.email.value}
                />
              </Form.Item>
              <Form.Item
                label={
                  <label
                    style={{
                      color: "rgb(54 59 100 / 85%)",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}>
                    Mot de passe
                  </label>
                }
                // validateStatus="error"
                validateStatus={user.password.error ? "error" : ""}
                help={user.password.error ? user.password.error : ""}>
                {" "}
                <Input
                  placeholder="Entrer mot de passe"
                  onChange={(e) => {
                    setUser((prevUser) => ({
                      ...prevUser,
                      password: {
                        ...prevUser.password,
                        value: e.target.value,
                      },
                    }));
                  }}
                  value={user.password.value}
                />
              </Form.Item>
              <Form.Item>
                <div className="w-full flex items-center justify-center">
                  <ConfigProvider
                    theme={{
                      token: {
                        colorPrimary: "#6090bc",
                        colorBgContainer: "white",
                      },
                    }}>
                    <Button
                      onClick={() => {
                        handleClickLogin();
                      }}
                      size="large"
                      className=" mt-5 w-[80%] border rounded-lg bg-[#6090bc] text-white text-base ">
                      Submit
                    </Button>
                  </ConfigProvider>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}

export default Login;
