import React from "react";
import { COLOR } from "./App";
import credentials from '../../credentials.json'

const IP = credentials.HOST_IP
const PORT = credentials.HOST_PORT


function to_geojson(dbData){
    let feature_list = dbData.map((feature)=>{
        return {
            "type": "Feature",
            "geometry": {
                "type": feature.feature_type,
                "coordinates": [
                    feature.longitude,
                    feature.latitude
                ]
            },
            "properties": {
                "title": feature.title,
                "description": feature.description,
                "image_url": feature.image_url
            }
        }
    })

    return  {
        "type": "FeatureCollection",
        "features":feature_list
    }
}

async function fetchAddLayer(map, layerId, existingLayerIds){
            // TODO: Handle server bad responses!
            return  fetch("http://" + IP + ":" + PORT + "/api/bars/?type=" + layerId)
                .then(res => res.json())
                .then(data => to_geojson(data))
                .then(geojsonData => {
                    map.current.addSource(layerId, {
                        type: "geojson",
                        data: geojsonData
                    })
                
                    map.current.addLayer({
                        'id': layerId,
                        'type': 'circle',
                        'source': layerId,
                        'paint': {
                            'circle-color': COLOR,
                            'circle-radius': 6,
                            }
                    })
                })
                .then(()=> existingLayerIds.current.push(layerId))
}

export default function FilterButton({map, layerId, existingLayerIds, activeButton, setActiveButton, setClickedFeature}){

    const inactiveButtonStyle = {
        position:'relative'
    }
    const activeButtonStyle = {
        ...inactiveButtonStyle,
        backgroundColor:'black',
        color: COLOR
    }

    async function handleClick(){
        if (map.current.getLayer(layerId) === undefined){
            await fetchAddLayer(map, layerId, existingLayerIds)
        }

        // Make only the chosen layer visible
        existingLayerIds.current.forEach((layer) => map.current.setLayoutProperty(layer, 'visibility', 'none'))
        map.current.setLayoutProperty(layerId, 'visibility', 'visible')
        setActiveButton(layerId)
        setClickedFeature(null)
    }

    return(
        <>
            <button 
                onClick={() => handleClick()}
                style={activeButton===layerId ? activeButtonStyle : inactiveButtonStyle}>
                     {layerId}
            </button>
        </>
    )
}