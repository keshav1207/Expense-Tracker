import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import HomePage from "../pages/HomePage";
import TransactionHistoryPage from "../pages/TransactionHistoryPage"
import LoginRegisterPage from "../pages/LoginRegisterPage";

  
  const Router = () => {
    const router = createBrowserRouter([

        {
          path: "/",
          element:<LoginRegisterPage/>,
        },

        {
          path: `/home/:userId`,
          element: <HomePage/>,
        },

        {
            path: "/history",
            element:<TransactionHistoryPage/>,
          }

          

      ]);

      return <RouterProvider router={router} />;
  };
  
  export default Router;