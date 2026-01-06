import { useState } from "react";
// Import Dependencies
// import { Link } from "react-router";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

// Local Imports
// import Logo from "assets/appLogo.svg?react";
import { Button, Card, Checkbox, Input, InputErrorMsg } from "components/ui";
import { useAuthContext } from "app/contexts/auth/context";
import { schema } from "./schema";
import { Page } from "components/shared/Page";
import { USER_ENDPOINTS } from "constants/apiConfig";
import axios from "axios";

// ✅ Import your local background image
import bgImage from "assets/bg.jpg";
import appLogo from "assets/applogo.webp";

// ----------------------------------------------------------------------

export default function SignIn() {
  const { login, errorMessage } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const fetchData = async (data) => {
    setLoading(true);
    var postData = {
      identifier: data.username,
      password: data.password,
    };

    let axiosConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    };

    try {
      axios
        .post(
          USER_ENDPOINTS.LOGIN,
          postData,
          axiosConfig,
        )
        .then((res) => {
          console.log("RESPONSE RECEIVED: ", res);
          login({
            username: "username",
            password: "password",
          });
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
          login({
            username: "fdf",
            password: "sdfsd",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.error(error);
      login({
        username: "fdf",
        password: "sdfsd",
      });
      setLoading(false);
    }
  };

  const onSubmit = (data) => {
    fetchData(data);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`, // ✅ local image
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(10px)",
          borderRadius: "12px",
          padding: "2rem",
          width: "100%",
        }}
      >
        <Page title="Login">
          <main className="min-h-100vh grid w-full grow grid-cols-1 place-items-center">
            <div className="w-full max-w-[26rem] p-4 sm:px-5">
              <Card className="bg-opacity-20 index : 1 mt-5 rounded-lg bg-white p-5 text-black shadow-lg backdrop-blur-md lg:p-7">
                <img
                  src={appLogo}
                  alt="App Logo"
                  className="mx-auto h-auto w-full max-w-xs pb-6"
                />
                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                  <div className="space-y-4">
                    <Input
                      className="text-grey"
                      label="Username"
                      placeholder="Enter Username"
                      prefix={
                        <EnvelopeIcon
                          className="size-5 transition-colors duration-200"
                          strokeWidth="1"
                        />
                      }
                      {...register("username")}
                      error={errors?.username?.message}
                    />
                    <Input
                      className="text-grey"
                      label="Password"
                      placeholder="Enter Password"
                      type="password"
                      prefix={
                        <LockClosedIcon
                          className="size-5 transition-colors duration-200"
                          strokeWidth="1"
                        />
                      }
                      {...register("password")}
                      error={errors?.password?.message}
                    />
                  </div>

                  <div className="mt-2">
                    <InputErrorMsg
                      when={errorMessage && errorMessage?.message !== ""}
                    >
                      {errorMessage?.message}
                    </InputErrorMsg>
                  </div>

                  <div className="mt-4 flex items-center justify-between space-x-2">
                    <Checkbox label="Remember me" />
                    <a
                      href="##"
                      className="dark:text-dark-300 dark:hover:text-dark-100 dark:focus:text-dark-100 text-xs text-gray-400 transition-colors hover:text-gray-800 focus:text-gray-800"
                    >
                      Forgot Password?
                    </a>
                  </div>

                  <Button
                    type="submit"
                    className="mt-5 w-full"
                    color="primary"
                    disabled={loading}
                  >
                    {loading ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
              </Card>

              <div className="dark:text-dark-300 mt-8 flex justify-center text-xs text-gray-400">
                <a href="##">Privacy Notice</a>
                <div className="dark:bg-dark-500 mx-2.5 my-0.5 w-px bg-gray-200"></div>
                <a href="##">Term of service</a>
              </div>
            </div>
          </main>
        </Page>
      </div>
    </div>
  );
}
