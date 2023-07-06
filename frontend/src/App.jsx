import React, { useState, useEffect } from 'react'


export default function App({apiInst}){
    
    const [barsList, setBarsList] = useState([])
    
    useEffect(fetch_bars, [])

    function fetch_bars(){
        apiInst.barsList()
        .then(res => setBarsList(res))
    }


    return (
        <>
            <ul>
                {barsList.map(item => 
                    <li key={item.latitude}>
                        {item.latitude}
                    </li>)
                }
            </ul>
        </>
    )
}