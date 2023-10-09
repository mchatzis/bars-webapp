import React, { useState, useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import HdImageBox from './HdImageBox';


export const COLOR = '#ffe42f';

const layerIds = JSON.parse(document.getElementById('layerIds').textContent);


export default function App({apiInst, client, settings}) {
    const map_container = useRef(null)
    const map = useRef(null)
    const data = useRef({}) // Our own rep of feature data, seperate from mapbox's one
    const [clickedFeature, setClickedFeature] = useState(null)
    const [displayHdImg, setDisplayHdImg] = useState(false)

    useEffect(() => {
        mapboxgl.accessToken = settings.MAPBOX_TOKEN
        map.current = new mapboxgl.Map({
            container: map_container.current,
            style: 'mapbox://styles/mchatzis/clk130qw500bo01qy3bt7frrx',
            center: [22.9435, 40.631], // starting position [lng, lat]
            zoom: 14.4, // starting zoom,
            pitch: 20, // pitch in degrees
            bearing: 40, // bearing in degrees
        });

        const elm = document.createElement('div')
        elm.style.backgroundImage = 'url(' + apiInst.configuration.basePath + '/static/whitetower.png)'
        elm.setAttribute("id", "tower");
        const marker1 = new mapboxgl.Marker(elm)
            .setLngLat([22.9478, 40.62547])
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
                const html = '<img src="' + place.tinyThumbnailUrl + '" width="75" height="75" >'

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
            map.current.on('movestart', () => {
                setClickedFeature(null)
                setDisplayHdImg(null)
            })
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
                setDisplayHdImg={setDisplayHdImg}
            />
            {displayHdImg && clickedFeature? <HdImageBox
                        data={data}
                        clickedFeature={clickedFeature}
                        apiInst={apiInst}
                        setDisplayHdImg={setDisplayHdImg}
                        /> : null}
            {clickedFeature ? <RightSidebar 
                                    map={map} 
                                    client={client} 
                                    clickedFeature={clickedFeature} 
                                    data={data}
                                    setDisplayHdImg={setDisplayHdImg}
                                /> : null}

        </>
    )
}