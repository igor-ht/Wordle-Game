import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Welcome } from "./components/Welcome";
import { AppWordle } from "./Pages/AppWordle";
import { SignIn } from "./Pages/SignIn";
import { SignUp } from "./Pages/SignUp";

export const wordleRouter = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/home',
        element: <Welcome/>
      },
      {
        path: '/sign-in',
        element: <SignIn/>
      },
      {
        path: '/sign-up',
        element: <SignUp/>
      },
      {
        path: '/play',
        element: <AppWordle/>
      }
    ]
  }
]);