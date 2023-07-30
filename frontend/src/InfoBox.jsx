import React, {useState} from "react"

export function InfoBox(props){
    return <p>{props.clickedFeature ? props.clickedFeature.properties.description : null }</p>
}