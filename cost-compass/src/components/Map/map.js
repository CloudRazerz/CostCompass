import { useState } from "react";
import { Map, Marker } from "@vis.gl/react-google-maps";
import './info-tab.css';

function MyMapComponent() {

    const [marker, setMarker] = useState([]);
    const [scroll_cover, setScrollCover] = useState(<div style={{width: '100%', height: '100%', position: 'absolute', zIndex: '0'}}></div>)
    const [info_tab, setInfoTab] = useState(<div className="infotab"></div>)

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
                    // alert(`
                    //     ${data.location_data.county}, ${data.location_data.state}\n
                    //     population: ${data.county_data.population}\n
                    //     home value: ${data.county_data.home_value}\n
                    //     housing cost: ${data.county_data.housing_cost}\n
                    //     household income: ${data.county_data.household_income}\n
                    //     unemployment_rate: ${data.county_data.unemployment_rate}\n
                    //     poverty_rate: ${data.county_data.poverty_rate}
                    //     `)
                    setInfoTab(
                        <div className="infotab">
                            <h2 className="kode-mono-o"><span className="color">{data.location_data.county}</span>, {data.location_data.state}</h2>
                            <p>{data.description}</p>
                            <p>Population: {data.county_data.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                            <p>Median Home Value: ${data.county_data.home_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                            <p>Median Housing Cost: ${data.county_data.housing_cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                            <p>Median Household Income: ${data.county_data.household_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                            <p>Unemployment Rate: {data.county_data.unemployment_rate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}%</p>
                            <p>Poverty Rate: {data.county_data.poverty_rate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}%</p>
                        </div>
                    )
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
                  latLngBounds: {east: -65, north: 51, south: 24, west:-130},
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
        {info_tab}
        </>
    )
}

export default MyMapComponent
