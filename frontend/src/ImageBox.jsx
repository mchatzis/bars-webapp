import React from "react"
import { getImage } from "./helpers";

function extractDirs(featProps, arrOut, count=1){
    var imgStr = "image" + count;

    if (featProps[imgStr]){
        arrOut.push([imgStr, featProps[imgStr]])
        extractDirs(featProps, arrOut, count + 1)
    }
}

export function ImageBox({map, client, clickedFeature, data, setDisplayHdImg}){
    function fetchHdImgs(){
        const dirsArr = []
        extractDirs(clickedFeature.properties, dirsArr)

        const layerId = clickedFeature.layer.id
        const featureId = clickedFeature.properties.id
        const dataPoint = data.current[layerId][featureId]
        dirsArr.map((dir)=> {
                const urlName = dir[0] + "Url";
                getImage(client, dir[1])
                .then(url => dataPoint[urlName] = url)
                .then(_ => {
                    if (dir[0] === "image1"){
                        setDisplayHdImg(true)
                    }
                })
            }
        )
    }

    const imgUrl = clickedFeature.properties.thumbnailUrl;
    return (
        clickedFeature ? <img 
                            src={imgUrl} 
                            id="image_box" 
                            onClick={fetchHdImgs}
                        />: null
    )
}