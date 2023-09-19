import React, { useState, useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';


export const COLOR = '#ffe42f';
mapboxgl.accessToken = "pk.eyJ1IjoibWNoYXR6aXMiLCJhIjoiY2xqc2JmMzVpMGI3cjNlbjBibTF0eW5hMSJ9.jRPaznp02gYmnLNdSblBCA";

const layerIds = JSON.parse(document.getElementById('layerIds').textContent);


export default function App({apiInst, client}) {
    const map_container = useRef(null)
    const map = useRef(null)
    const data = useRef({}) // Our own rep of feature data, seperate from mapbox's one
    const [clickedFeature, setClickedFeature] = useState(null)

    useEffect(() => {
        map.current = new mapboxgl.Map({
            container: map_container.current,
            style: 'mapbox://styles/mchatzis/clk130qw500bo01qy3bt7frrx',
            center: [22.945, 40.632], // starting position [lng, lat]
            zoom: 14, // starting zoom,
            pitch: 20, // pitch in degrees
            bearing: 40, // bearing in degrees
        });

        const elm = document.createElement('div')
        elm.style.backgroundImage = 'url(' + apiInst.configuration.basePath + '/static/tower.png)'
        elm.style.width = `50px`;
        elm.style.height = `57px`;
        elm.style.backgroundSize = '100%';
        const marker1 = new mapboxgl.Marker(elm)
            .setLngLat([22.948380, 40.626352])
            .addTo(map.current);


        map.current.on('load', () => {
            map.current.on('render', () => {
                map.current.resize();
            });

            map.current.on('mouseenter', layerIds, (e) => {
                const popup = new mapboxgl.Popup({
                    closeButton: false,
                    closeOnClick: false,
                    className: "popup"
                })

                map.current.getCanvas().style.cursor = 'pointer';

                const feature = e.features[0]
                const coords = feature.geometry.coordinates

                const layerId = feature.layer.id
                const featureId = feature.properties.id
                const place = data.current[layerId][featureId]
                const html = '<img src="' + place.tinyThumbnailUrl + '" width="55" height="55" >'

                popup.setLngLat(coords).setHTML(html).addTo(map.current);
            });
            map.current.on('mouseleave', layerIds, () => {
                map.current.getCanvas().style.cursor = '';

                /** Check if there is already a popup on the map and if so, remove it */
                const popUps = document.getElementsByClassName('mapboxgl-popup');
                if (popUps[0]) popUps[0].remove();
            })
            map.current.on('click', layerIds, (e) => {
                const feature = e.features[0]
                const layerId = feature.layer.id
                const featureId = feature.properties.id
                const dataPoint = data.current[layerId][featureId]
                feature.properties.thumbnailUrl = dataPoint.thumbnailUrl

                setClickedFeature(feature)
            })
            map.current.on('movestart', () => setClickedFeature(null))
        })
    }, [])

    return (
        <>
            <div ref={map_container} id="map"></div>
            <LeftSidebar
                map={map}
                data={data}
                client={client}
                apiInst={apiInst}
                layerIds={layerIds}
                setClickedFeature={setClickedFeature}
            />
            {clickedFeature ? <RightSidebar map={map} clickedFeature={clickedFeature}/> : null}
        </>
    )
}