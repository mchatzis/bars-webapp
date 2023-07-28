import React, {useState} from "react"
import FilterButton from "./FilterButton"


export default function LeftSidebar(props){
    const [activeButton, setActiveButton] = useState(null)

    return (
        <>
            <FilterButton 
                map={props.map}
                layer_id={props.layer_ids[0]}
                activeButton={activeButton}
                setActiveButton={setActiveButton}
            />
            <br></br>
            <FilterButton 
                map={props.map}
                layer_id={props.layer_ids[1]}
                activeButton={activeButton}
                setActiveButton={setActiveButton}
            />
        </>
    )
}