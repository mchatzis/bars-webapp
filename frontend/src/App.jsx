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
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            center: [22.945705, 40.633564], // starting position [lng, lat]
            zoom: 14, // starting zoom,
            pitch: 20, // pitch in degrees
            bearing: 40, // bearing in degrees
        });
        console.log("logging: map initialized")
    }, [])


    return (
        <div ref={map_container} id="map"></div>
    )
}