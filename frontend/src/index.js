import { BarsApi } from "../../api-client/apis/BarsApi";
import { Configuration } from "../../api-client/runtime";
import Cookies from "js-cookie";

const apiInst = new BarsApi(
    new Configuration(
      {
        basePath:'http://127.0.0.1:8000',
        headers:{'X-CSRFToken':Cookies.get('csrftoken')},
      },
    )
)

apiInst.barsList()
.then(res => console.log(res))

console.log("hello frontend")