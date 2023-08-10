import React, { useState, useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import credentials from '../../credentials.json'

export const COLOR = '#ffe42f';
const IP = credentials.HOST_IP
const PORT = credentials.HOST_PORT
mapboxgl.accessToken = credentials.ACCESS_TOKEN;

const layerIds = JSON.parse(document.getElementById('layerIds').textContent);


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
        
        const elm = document.createElement('div')
        elm.style.backgroundImage = 'url(http://' + IP + ':' + PORT + '/static/tower.png)'
        elm.style.width = `50px`;
        elm.style.height = `57px`;
        elm.style.backgroundSize = '100%';
        const marker1 = new mapboxgl.Marker(elm)
        .setLngLat([22.948380,40.626352])
        .addTo(map.current);


        map.current.on('load', () => {
            
            // Add popup
            const popup = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false
            })

            map.current.on('mouseenter', layerIds, (e) => {
                map.current.getCanvas().style.cursor = 'pointer';

                const feature = e.features[0]
                const coords = feature.geometry.coordinates
                const img_url = "static/" + feature.properties.image_url
                const html = '<img src="' + img_url + '" width="50" height="50" >'

                popup.setLngLat(coords).setHTML(html).addTo(map.current);
            });
            map.current.on('mouseleave', layerIds, () => {
                map.current.getCanvas().style.cursor = '';
                popup.remove();
            })

            map.current.on('click', layerIds, (e)=>{
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
                    layerIds={layerIds}
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