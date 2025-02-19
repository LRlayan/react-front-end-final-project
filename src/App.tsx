import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import RootLayout from "./components/RootLayout.tsx";
import {Dashboard} from "./pages/Dashboard.tsx";
import EquipmentPage from "./pages/equipment/EquipmentPage.tsx";
import StaffPage from "./pages/staff/StaffPage.tsx";
import LogPage from "./pages/log/LogPage.tsx";
import {FieldPage} from "./pages/field/FieldPage.tsx";
import VehiclePage from "./pages/vehicle/VehiclePage.tsx";
import CropPage from "./pages/crop/CropPage.tsx";
import SignInSignUp from "./pages/signIn-signup/SignIn-signUp.tsx";
import {useSelector} from "react-redux";
import {UserRootState} from "./reducer/UserSlice.ts";

function App() {
    const isAuthenticated = useSelector((state: UserRootState) => state.user.isAuthenticated);

  const routes = createBrowserRouter([
      { path: "/", element: <SignInSignUp /> },
      {
      path: '/',
        element: <RootLayout/>,
          children:[
            {path:'/dashboard',element: isAuthenticated ? <Dashboard/> : <SignInSignUp/>},
            {path:'/crop-manage',element:<CropPage/>},
            {path:'/field-manage',element:<FieldPage/>},
            {path:'/log-manage',element:<LogPage/>},
            {path:'/staff-manage',element:<StaffPage/>},
            {path:'/vehicle-manage',element:<VehiclePage/>},
            {path:'/equipment-manage',element:<EquipmentPage/>}
          ]
    }
  ]);

  return (
    <>
      <RouterProvider router={routes}/>
    </>
  )
}

export default App
