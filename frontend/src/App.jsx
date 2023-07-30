import React, { useState, useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl';
import { ACCESS_TOKEN } from '../../mapbox-token';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';

mapboxgl.accessToken = ACCESS_TOKEN;

export const COLOR = '#ffe42f'
export const layer_ids = ['cafes','bars']


export default function App({apiInst}){
    const map_container = useRef(null)
    const map = useRef(null)
    const [clickedFeature, setClickedFeature] = useState(null)


    useEffect(() => {
        map.current = new mapboxgl.Map({
            container: map_container.current, // container ID
            style: 'mapbox://styles/mchatzis/clk130qw500bo01qy3bt7frrx', // style URL
            center: [22.945,40.632], // starting position [lng, lat]
            zoom: 14, // starting zoom,
            pitch: 20, // pitch in degrees
            bearing: 40, // bearing in degrees
        });

        map.current.loadImage('static/pin.png',
            (error, image) => {
                map.current.addImage('pin', image);
            }
        )
        
        const elm = document.createElement('div')
        elm.style.backgroundImage = 'url(http://127.0.0.1:8000/static/tower.png)'
        elm.style.width = `50px`;
        elm.style.height = `57px`;
        elm.style.backgroundSize = '100%';
        const marker1 = new mapboxgl.Marker(elm)
        .setLngLat([22.948380,40.626352])
        .addTo(map.current);


        map.current.on('load', () => {

            // Add sources and layers
            layer_ids.forEach((layer_id) => {
                map.current.addSource(layer_id, {
                    type: "geojson",
                    data: "static/geo_layers/" + layer_id + "_layer.geojson"
                })
                map.current.addLayer({
                    'id': layer_id,
                    'type': 'circle',
                    'source': layer_id,
                    'layout': {
                        'visibility': 'none'
                    },
                    'paint': {
                        'circle-color': COLOR,
                        'circle-radius': 6,
                        }
                })
            })
            
            // Add popup
            const popup = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false
            })

            map.current.on('mouseenter', layer_ids, (e) => {
                map.current.getCanvas().style.cursor = 'pointer';

                const feature = e.features[0]
                const coords = feature.geometry.coordinates
                const img = "static/" + feature.properties.image
                const html = '<img src="' + img + '" width="50" height="50" >'

                popup.setLngLat(coords).setHTML(html).addTo(map.current);
            });
            map.current.on('mouseleave', layer_ids, () => {
                map.current.getCanvas().style.cursor = '';
                popup.remove();
            })

            map.current.on('click', layer_ids, (e)=>{
                setClickedFeature(e.features[0])
                console.log(e.features[0])
            })
        })



    }, [])


    return (
        <>  
            <div ref={map_container} id="map"></div>
            <div id="left-sidebar">
                <LeftSidebar 
                    map={map}
                    layer_ids={layer_ids}
                    setClickedFeature={setClickedFeature}
                    />
            </div>
            <div id="right-sidebar">
                <RightSidebar
                    map={map}
                    clickedFeature={clickedFeature}
                />
            </div>
        </>
    )
}