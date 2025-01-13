import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import RootLayout from "./components/RootLayout.tsx";
import {Dashboard} from "./pages/Dashboard.tsx";
import {Equipment} from "./pages/equipment/Equipment.tsx";
import {Staff} from "./pages/staff/Staff.tsx";
import {Log} from "./pages/log/Log.tsx";
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
            {path:'/log-manage',element:<Log/>},
            {path:'/staff-manage',element:<Staff/>},
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
