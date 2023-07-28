import React from "react";
import { layer_ids } from "./App";


export default function FilterButton({map, layer_id, activeButton, setActiveButton}){
    const inactiveButtonStyle = {
        position:'relative'
    }
    const activeButtonStyle = {
        ...inactiveButtonStyle,
        backgroundColor:'black',
        color:'orange'
    }

    function handleClick(){
        // Make only the chosen layer visible
        layer_ids.forEach((layer) => map.current.setLayoutProperty(layer, 'visibility', 'none'))
        map.current.setLayoutProperty(layer_id, 'visibility', 'visible')
        setActiveButton(layer_id)
    }

    return(
        <>
            <button 
                onClick={() => handleClick()}
                style={activeButton===layer_id ? activeButtonStyle : inactiveButtonStyle}>
                     {layer_id}
            </button>
        </>
    )
}