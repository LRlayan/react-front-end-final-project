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
import SignIn from "./pages/signIn/SignIn.tsx";

function App() {
  const routes = createBrowserRouter([
      { path: "/", element: <SignIn /> },
      {
      path: '/',
        element: <RootLayout/>,
          children:[
            {path:'/dashboard',element:<Dashboard/>},
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
