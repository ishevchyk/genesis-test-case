import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {createTheme, ThemeProvider} from "@material-ui/core";
import {grey} from "@material-ui/core/colors";

import RootLayout from "./pages/Root";
import WelcomePage from "./pages/Welcome";
import CoursesRootLayout from "./pages/CoursesRoot";
import ErrorPage from "./pages/Error";
import CoursesPage, {loader as coursesLoader} from './pages/Courses';
import CoursePage, {loader as courseLoader} from "./pages/Course";
import {action as authAction} from "./pages/Welcome";
import {action as logoutAction} from './pages/Logout';
import {checkAuthLoader, tokenLoader} from "./utils/auth";

const theme = createTheme({
  palette: {
    primary: {
      main: '#0ba295'
    },
    secondary: grey
  },
  typography: {
    fontFamily: 'Noto+Sans',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightBold: 600
  }
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: tokenLoader,
    id: 'root',
    children: [
      {
        index: true,
        element: <WelcomePage/>,
        action: authAction
      },
      {
        path: 'courses',
        element: <CoursesRootLayout/>,
        loader: checkAuthLoader,
        children: [
          {
            index: true,
            element: <CoursesPage/>,
            loader: coursesLoader,
          },
          {
            path: ':courseId',
            element: <CoursePage/>,
            loader: courseLoader
          }
        ]
      },
      {
        path: 'logout',
        action: logoutAction
      }
    ]
  }
])

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router}/>
    </ThemeProvider>
  )
}

export default App;
