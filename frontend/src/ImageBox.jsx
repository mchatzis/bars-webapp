import React from "react"

const img_style = {
    width: 100,
    height: 100
}
export function ImageBox(props){

    return (
        props.clickedFeature ? <img src={props.clickedFeature.properties.thumbnailUrl} style={img_style}></img> : null
    )
}