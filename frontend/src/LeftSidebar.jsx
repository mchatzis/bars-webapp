import React, {useState, useRef} from "react"
import FilterButton from "./FilterButton"


export default function LeftSidebar(props){
    const [activeButton, setActiveButton] = useState(null)
    const existingLayerIds = useRef([])

    return (
        <div id="left-sidebar">
            {props.layerIds.map((layerId) =>{
                return (
                    <div key={layerId}>
                        <FilterButton 
                            map={props.map}
                            data={props.data}
                            client={props.client}
                            apiInst={props.apiInst}
                            layerId={layerId}
                            existingLayerIds={existingLayerIds}
                            activeButton={activeButton}
                            setActiveButton={setActiveButton}
                            setClickedFeature={props.setClickedFeature}
                            setDisplayHdImg={props.setDisplayHdImg}
                        />
                    </div>
                );
            })}
        </div>
    );
}