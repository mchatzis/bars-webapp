import { BarsApi } from "../../api-client/apis/BarsApi";
import { Configuration } from "../../api-client/runtime";
import Cookies from "js-cookie";
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App";
import { S3Client } from "@aws-sdk/client-s3";

const settings = JSON.parse(document.getElementById('settings').textContent);

const apiInst = new BarsApi(
    new Configuration(
      {
        basePath: settings.PROTOCOL + settings.HOST_NAME,
        headers:{'X-CSRFToken':Cookies.get('csrftoken')},
      },
    )
)

// AWS S3 client
const REGION = settings.S3_REGION

const awsClient = new S3Client({
    region: REGION,
    credentials: {
        accessKeyId: settings.AWS_S3_READONLY_KEY_ID,
        secretAccessKey: settings.AWS_S3_READONLY_SECRET_ACCESS_KEY
    }
})
awsClient.s3_bucket = settings.S3_BUCKET_NAME

const router = createBrowserRouter(
    [
      {
        path:"/",
        element:<App apiInst={apiInst} client={awsClient} settings={settings}/>,
      }
    ],
    {basename: "/"},
)
  
  
const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)

root.render(<RouterProvider router={router}/>)
