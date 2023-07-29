import React from "react";
import { layer_ids, COLOR } from "./App";


export default function FilterButton({map, layer_id, activeButton, setActiveButton}){
    const inactiveButtonStyle = {
        position:'relative'
    }
    const activeButtonStyle = {
        ...inactiveButtonStyle,
        backgroundColor:'black',
        color: COLOR
    }

    function handleClick(){
        //TODO: Check map has fully rendered before accessing layout properties,
        // otherwise Error: "The layer 'bars' does not exist in the map's style and cannot be styled"

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