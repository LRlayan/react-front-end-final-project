import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import {RootLayout} from "./components/RootLayout.tsx";
import {Dashboard} from "./pages/Dashboard.tsx";
import {Equipment} from "./pages/equipment/Equipment.tsx";
import {Staff} from "./pages/staff/Staff.tsx";
import {Log} from "./pages/log/Log.tsx";
import {Field} from "./pages/field/Field.tsx";
import {Crop} from "./pages/crop/Crop.tsx";
import {Vehicle} from "./pages/vehicle/Vehicle.tsx";

function App() {
  const routes = createBrowserRouter([
    {
      path: '',
        element: <RootLayout/>,
          children:[
            {path:'',element:<Dashboard/>},
            {path:'/cropsManagement',element:<Crop/>},
            {path:'/fieldManagement',element:<Field/>},
            {path:'/logManagement',element:<Log/>},
            {path:'/staffManagement',element:<Staff/>},
            {path:'/vehicleManagement',element:<Vehicle/>},
            {path:'/equipmentManagement',element:<Equipment/>}
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
