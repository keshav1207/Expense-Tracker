import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import HomePage from "../pages/HomePage";
import TransactionHistoryPage from "../pages/TransactionHistoryPage"

  
  const Router = () => {
    const router = createBrowserRouter([
        {
          path: "/",
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