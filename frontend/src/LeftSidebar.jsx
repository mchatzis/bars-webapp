import React, {useState} from "react"
import FilterButton from "./FilterButton"


export default function LeftSidebar(props){
    const [activeButton, setActiveButton] = useState(null)

    return (
        <>
            {props.layer_ids.map((layer_id) =>{
                return (
                    <div key={layer_id}>
                        <FilterButton 
                            map={props.map}
                            layer_id={layer_id}
                            activeButton={activeButton}
                            setActiveButton={setActiveButton}
                            setClickedFeature={props.setClickedFeature}
                        />
                    </div>
                );
            })}
        </>
    );
}