import React from "react"

export function ImageBox(props){

    return (
        props.clickedFeature ? <img src={props.clickedFeature.properties.thumbnailUrl} id="image_box"></img> : null
    )
}