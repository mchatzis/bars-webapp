import React from "react"

export function InfoBox(props){
    return (
        <div id="info_box">
            <p>{props.clickedFeature ? props.clickedFeature.properties.description : null }</p>
        </div>
    )
}