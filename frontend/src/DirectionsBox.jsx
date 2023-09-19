import React from "react"


function createUrl(name){
    let splitName = name.split(" ")
    let query =  splitName.reduce((acc, word)=>{
        return acc + word + "+";
    }, "");

    return "https://www.google.com/maps/search/?api=1&query=" + query + "Thessaloniki"
}

export default function DirectionsBox(props){
    function handleClick(){
        const url = createUrl(props.clickedFeature.properties.title)
        console.log("opening" + url)
        window.open(url)
        return
    }

    return (
        <button onClick={handleClick} id="directions_button">
            Directions
        </button>
    )
}