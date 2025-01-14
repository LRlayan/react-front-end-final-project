import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import RootLayout from "./components/RootLayout.tsx";
import {Dashboard} from "./pages/Dashboard.tsx";
import {Equipment} from "./pages/equipment/Equipment.tsx";
import StaffPage from "./pages/staff/StaffPage.tsx";
import LogPage from "./pages/log/LogPage.tsx";
import {FieldPage} from "./pages/field/FieldPage.tsx";
import {Vehicle} from "./pages/vehicle/Vehicle.tsx";
import CropPage from "./pages/crop/CropPage.tsx";

function App() {
  const routes = createBrowserRouter([
    {
      path: '',
        element: <RootLayout/>,
          children:[
            {path:'',element:<Dashboard/>},
            {path:'/crop-manage',element:<CropPage/>},
            {path:'/field-manage',element:<FieldPage/>},
            {path:'/log-manage',element:<LogPage/>},
            {path:'/staff-manage',element:<StaffPage/>},
            {path:'/vehicle-manage',element:<Vehicle/>},
            {path:'/equipment-manage',element:<Equipment/>}
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
