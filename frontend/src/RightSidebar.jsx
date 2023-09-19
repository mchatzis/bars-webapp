import React from "react"
import { InfoBox } from "./InfoBox"
import { ImageBox } from "./ImageBox"
import DirectionsBox from "./DirectionsBox"

export default function RightSidebar(props) {

    return (
        <div id="right-sidebar">
            <ImageBox {...props}/>
            <h3 id="feature_title">{props.clickedFeature.properties.title}</h3>
            <InfoBox {...props}/>
            <DirectionsBox {...props}/>
        </div>
    )
}