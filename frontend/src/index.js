import { BarsApi } from "../../api-client/apis/BarsApi";
import { Configuration } from "../../api-client/runtime";
import Cookies from "js-cookie";
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App";

const apiInst = new BarsApi(
    new Configuration(
      {
        basePath:'http://127.0.0.1:8000',
        headers:{'X-CSRFToken':Cookies.get('csrftoken')},
      },
    )
)

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