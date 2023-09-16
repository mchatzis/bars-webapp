import React, {useState, useEffect} from "react"
import { InfoBox } from "./InfoBox"
import { ImageBox } from "./ImageBox"

export default function RightSidebar(props) {

    return (
        <>
            <ImageBox {...props}/>
            <InfoBox {...props}/>
        </>
    )
}