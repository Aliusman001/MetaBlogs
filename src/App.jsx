import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { loader as singleBlogLoader } from "./pages/SingleBlogPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Suspense, lazy, useMemo } from "react";
import { Provider, useSelector } from "react-redux";
import store from "./store/store";

const Loader = lazy(() => import("./usefullComponents/Loader"));
const AuthorizedUser = lazy(() => import("./pages/AuthorizedUser"));
const SettingPage = lazy(() => import("./pages/SettingPage"));
const UnAuthorizedUser = lazy(() => import("./pages/UnAuthorizedUser"));
const ForgetPassword = lazy(() => import("./pages/ForgetPassword"));
const RestPassword = lazy(() => import("./pages/RestPassword"));
const VerifiedEmail = lazy(() => import("./pages/VerifiedEmail"));
const BlogsPage = lazy(() => import("./pages/BlogsPage"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const SingleBlog = lazy(() => import("./pages/SingleBlogPage"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));

const router = createBrowserRouter([
  {
    element: <UnAuthorizedUser />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/forgetpassword",
        element: <ForgetPassword />,
      },
      {
        path: "/resetpassword",
        element: <RestPassword />,
      },
      { path: "/verifyemail", element: <VerifiedEmail /> },
    ],
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/blog/:id",
        element: <SingleBlog />,
        loader: singleBlogLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "/blogs",
        element: <BlogsPage />,
      },
      {
        path: "/contact",
        element: (
          <h1
            className="h-screen text-center"
            style={{ height: "calc(100vh - 300px)" }}
          >
            comming soon...
          </h1>
        ),
      },
      {
        element: <AuthorizedUser />,
        children: [
          {
            path: "/setting",
            element: <SettingPage />,
          },
        ],
      },
    ],
  },
]);

function App() {
  const querClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });
  return (
    <Provider store={store}>
      <ThemeProviderCustom>
        <Suspense fallback={<Loader />}>
          <QueryClientProvider client={querClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <RouterProvider router={router} />
          </QueryClientProvider>
        </Suspense>
      </ThemeProviderCustom>
    </Provider>
  );
}

export default App;

function ThemeProviderCustom({ children }) {
  const modes = useSelector((store) => store.blog.mode);
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: modes,
          primary: {
            main: "#181a2a",
          },
        },
      }),
    [modes]
  );
  return (
    <>
      <ToastContainer
        position={"top-center"}
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
        theme={modes}
        transition={Bounce}
      />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </>
  );
}
