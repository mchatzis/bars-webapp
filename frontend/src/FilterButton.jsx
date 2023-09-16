import React from "react";
import { COLOR } from "./App";
import { getImage } from "./helpers";


function to_geojson(dbData){
    let feature_list = dbData.map((feature)=>{
        return {
            "type": "Feature",
            "geometry": {
                "type": feature.featureType,
                "coordinates": [
                    feature.longitude,
                    feature.latitude
                ]
            },
            "properties": {
                "id": feature.id,
                "title": feature.title,
                "description": feature.description,
                "tinyThumbnail": feature.tinyThumbnail,
                "thumbnail": feature.thumbnail,
                "image1": feature.image1,
                "image2": feature.image2
            }
        }
    })

    return  {
        "type": "FeatureCollection",
        "features":feature_list
    }
}

async function fetchAddLayer(map, data, apiInst, layerId){
            // TODO: Handle server bad responses
                await apiInst.barsList({type:layerId})
                .then(dbData => {
                    // First convert array of places to dictionary with place id as key
                    // then store db data for future use
                    var dataRefactored = {}
                    dbData.reduce((accum, current) => {
                        accum[current.id] = current
                        return accum
                    }, dataRefactored)
                    data.current[layerId] = dataRefactored

                    // convert to geojson original db data
                    var geojsonData = to_geojson(dbData)
                    return geojsonData
                })
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
}



export default function FilterButton({map, data, client, apiInst, layerId, existingLayerIds, activeButton, setActiveButton, setClickedFeature}){

    const inactiveButtonStyle = {
        position:'relative'
    }
    const activeButtonStyle = {
        ...inactiveButtonStyle,
        backgroundColor:'black',
        color: COLOR
    }

    async function handleClick(){
        // Load layer unless already loaded
        if (map.current.getLayer(layerId) === undefined){
            await fetchAddLayer(map, data, apiInst, layerId);
            existingLayerIds.current.push(layerId);
        }

        // Make only the chosen layer visible
        existingLayerIds.current.forEach((layer) => map.current.setLayoutProperty(layer, 'visibility', 'none'))
        map.current.setLayoutProperty(layerId, 'visibility', 'visible')
        setActiveButton(layerId)
        setClickedFeature(null)

        // Prefetch tiny thumbnail and thumbnail (to avoid UI latency due to fetching)
        for (let id in data.current[layerId]) {
            let place = data.current[layerId][id]
            if (place.tinyThumbnail) {
                getImage(client, place.tinyThumbnail)
                .then(url => place.tinyThumbnailUrl = url)
            }
            if (place.thumbnail) {
                getImage(client, place.thumbnail)
                .then(url => place.thumbnailUrl = url)
            }
        }
    }

    return(
        <>
            <button 
                onClick={handleClick}
                style={activeButton===layerId ? activeButtonStyle : inactiveButtonStyle}>
                     {layerId}
            </button>
        </>
    )
}