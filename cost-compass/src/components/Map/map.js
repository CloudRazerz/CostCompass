import { useState } from "react";
import { Map, Marker } from "@vis.gl/react-google-maps";

function MyMapComponent() {

    const [marker, setMarker] = useState([]);
    const [scroll_cover, setScrollCover] = useState(<div style={{width: '100%', height: '100%', position: 'absolute', zIndex: '0'}}></div>)

    const handleMapClick = async (event) => {
        setMarker(<Marker position={event.detail.latLng} cursor={'wait'}></Marker>)
        setScrollCover(<div style={{cursor: 'wait', width: '100%', height: '100%', position: 'absolute', zIndex: '1'}}></div>)
        const location_data = {'latitude': event.detail.latLng.lat, 'longitude': event.detail.latLng.lng}
        

        try{
            const response = await fetch('/api/coordinates_to_county', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'},
                body: JSON.stringify(location_data)
                })
                const data = await response.json()
                
                if (data.location_data !== 'unavailable'){
                    alert(`
                        ${data.location_data.county}, ${data.location_data.state}\n
                        population: ${data.county_data.population}\n
                        home value: ${data.county_data.home_value}\n
                        housing cost: ${data.county_data.housing_cost}\n
                        household income: ${data.county_data.household_income}\n
                        unemployment_rate: ${data.county_data.unemployment_rate}\n
                        poverty_rate: ${data.county_data.poverty_rate}
                        `)
                }
                else {
                    alert('no data available')
                };
        }
        catch{
            setMarker(<Marker position={event.detail.latLng} cursor={'default'}></Marker>)
            setScrollCover(<div style={{width: '100%', height: '100%', position: 'absolute', zIndex: '0'}}></div>)
            alert('api unavailable')
        }
        finally{
            setMarker(<Marker position={event.detail.latLng} cursor={'default'}></Marker>)
            setScrollCover(<div style={{width: '100%', height: '100%', position: 'absolute', zIndex: '0'}}></div>)
        }
    };

    return (
        <>
        {scroll_cover}
        <Map
            defaultZoom={6.75}
            defaultCenter={{ lat: 28.1, lng: -82.5 }}
            maxZoom={10}
            minZoom={3}
            options={{
                restriction: {
                  latLngBounds: {east: -65, north: 51, south: 24, west:-126},
                  strictBounds: false,
                },
                clickableIcons: false,
                disableDefaultUI: true,
                disableDoubleClickZoom: true,
                keyboardShortcuts: false,
            }}
            
            onClick={handleMapClick}

            >
            {marker}
        </Map>
        </>
    )
}

export default MyMapComponent
