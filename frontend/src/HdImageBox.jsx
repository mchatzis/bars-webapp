import React, { useState } from "react"


export default function HdImageBox({data, clickedFeature, apiInst, setDisplayHdImg}){
    const [imgNum, setImgNum] = useState(1)

    const layerId = clickedFeature.layer.id
    const featureId = clickedFeature.properties.id
    const dataPoint = data.current[layerId][featureId]
    const imgUrl = dataPoint["image" + imgNum + "Url"]

    const leftBracketUrl = apiInst.configuration.basePath + '/static/leftbracket.png'
    const rightBracketUrl = apiInst.configuration.basePath + '/static/rightbracket.png'
    const quitUrl = apiInst.configuration.basePath + '/static/quit.png'


    return (
        <div id="hd_box">
            <img 
                className="bracket" 
                src={leftBracketUrl}
                onClick={()=>{
                    if (imgNum > 1){
                        setImgNum(imgNum - 1)
                    }
                }}
            />
            <img id="hd_img" src={imgUrl}/>
            <img 
                className="bracket" 
                src={rightBracketUrl}
                onClick={()=>{
                    if (imgNum < 5){
                        setImgNum(imgNum + 1)
                    }
                }}
            />
            <img 
                id="quit" 
                src={quitUrl}
                onClick={()=>{
                  setDisplayHdImg(false)  
                }}/>
        </div>
    )
}