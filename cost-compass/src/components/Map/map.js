import { useState } from "react";
import { Map, Marker } from "@vis.gl/react-google-maps";
import Loader from "./loader";
import './info-tab.css';

function MyMapComponent() {

    const [marker, setMarker] = useState([]);
    const [scroll_cover, setScrollCover] = useState(<div style={{width: '100%', height: '100%', position: 'absolute', zIndex: '0'}}></div>)
    const [info_tab, setInfoTab] = useState(<div className="infotab hidden" id="info"><h2 className="kode-mono-o">INFORMATION</h2></div>)


    const handleMapClick = async (event) => {
        setMarker(<Marker position={event.detail.latLng} cursor={'wait'}></Marker>);
        setScrollCover(<div style={{cursor: 'wait', width: '100%', height: '100%', position: 'absolute', zIndex: '1'}}></div>);
        setInfoTab(<div className="infotab" id="info"><h2 className="kode-mono-o">INFORMATION</h2><Loader /></div>)
        
        const location_data = {'latitude': event.detail.latLng.lat, 'longitude': event.detail.latLng.lng}
        

        try{
            const response = await fetch('/api/coordinates_to_county', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'},
                body: JSON.stringify(location_data)
                })
                const data = await response.json();
                if (data.location_data !== 'unavailable'){
                    setInfoTab(
                        <div className="infotab">
                            <h2 className="kode-mono-o"><span className="color kode-mono-o">{data.location_data.county}</span>, {data.location_data.state}</h2>
                            <p className="kode-mono-o">{data.description}</p>
                            <p className="sans-serif"><span className="color kode-mono-o">Population:</span> {data.county_data.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                            <p className="sans-serif"><span className="color kode-mono-o">Median Home Value:</span> ${data.county_data.home_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                            <p className="sans-serif"><span className="color kode-mono-o">Median Housing Cost:</span> ${data.county_data.housing_cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                            <p className="sans-serif"><span className="color kode-mono-o">Median Household Income:</span> ${data.county_data.household_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                            <p className="sans-serif"><span className="color kode-mono-o">Unemployment Rate:</span> {data.county_data.unemployment_rate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}%</p>
                            <p className="sans-serif"><span className="color kode-mono-o">Poverty Rate:</span> {data.county_data.poverty_rate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}%</p>
                        </div>
                    )
                }
                else {
                    setInfoTab(
                        <div className="infotab">
                            <h2 className="kode-mono-o">No data available</h2>
                        </div>
                    )
                };
        }
        catch{
            setMarker(<Marker position={event.detail.latLng} cursor={'default'}></Marker>)
            setScrollCover(<div style={{width: '100%', height: '100%', position: 'absolute', zIndex: '0'}}></div>)
            setInfoTab(
                <div className="infotab">
                    <h2 className="kode-mono-o">Server unavailable</h2>
                </div>
            )
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
