import { BarsApi } from "../../api-client/apis/BarsApi";
import { Configuration } from "../../api-client/runtime";
import Cookies from "js-cookie";
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App";
import credentials from '../../credentials.json'

const apiInst = new BarsApi(
    new Configuration(
      {
        basePath: 'http://' + credentials.HOST_IP + ':' + credentials.HOST_PORT,
        headers:{'X-CSRFToken':Cookies.get('csrftoken')},
      },
    )
)
apiInst.barsList({type:"cafes"})
.then(list => console.log(list))

const router = createBrowserRouter(
    [
      {
        path:"/",
        element:<App apiInst={apiInst}/>,
      }
    ],
    {basename: "/"},
)
  
  
const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)

root.render(<RouterProvider router={router}/>)