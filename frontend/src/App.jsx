import React, { useState, useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl';
import { ACCESS_TOKEN } from '../../mapbox-token';

mapboxgl.accessToken = ACCESS_TOKEN;


export default function App({apiInst}){
    const map_container = useRef(null)
    const map = useRef(null)

    useEffect(() => {
        map.current = new mapboxgl.Map({
            container: map_container.current, // container ID
            style: 'mapbox://styles/mchatzis/clk130qw500bo01qy3bt7frrx', // style URL
            center: [22.945705, 40.633564], // starting position [lng, lat]
            zoom: 14, // starting zoom,
            pitch: 20, // pitch in degrees
            bearing: 40, // bearing in degrees
        });
        console.log("logging: map initialized")

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
            map.current.addSource("cafes", {
                type: 'geojson',
                data: "static/geo_layers/cafes_layer.geojson"
            });

            map.current.addLayer({
                'id': 'cafes',
                'type': 'symbol',
                'source': 'cafes',
                'layout': 
                    {
                    'icon-image': 'pin',
                    'icon-size' : 0.05,
                    'icon-anchor': 'bottom',
                    // get the title name from the source's "title" property
                    'text-field': ['get', 'title'],
                    'text-offset': [0, -2.5],
                    },
                'paint':
                {
                    'text-color':'white'
                }
            });
        })

    }, [])


    return (
        <div ref={map_container} id="map"></div>
    )
}