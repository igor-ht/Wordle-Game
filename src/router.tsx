import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { AppWordle } from "./Pages/AppWordle";
import { HomePage } from "./Pages/Home";
import { SignIn } from "./Pages/SignIn";

export const wordleRouter = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/home',
        element: <HomePage/>
      },
      {
        path: '/sign-in',
        element: <SignIn/>
      },
      {
        path: '/play',
        element: <AppWordle/>
      }
    ]
  }
])