import { useState } from "react";
import { Map, Marker } from "@vis.gl/react-google-maps";

function MyMapComponent() {

    const [marker, setMarker] = useState([]);

    const handleMapClick = (event) => {
        const location_data = {'latitude': event.detail.latLng.lat, 'longitude': event.detail.latLng.lng}

        setMarker(<Marker position={event.detail.latLng} cursor='default'></Marker>)

        try{
            fetch('/api/coordinates_to_county', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'},
                body: JSON.stringify(location_data)
                })
                .then(response => response.json())
                .then(data => {
                    alert(`longitude: ${data.longitude}, latitude: ${data.latitude}`)
                });
        }
        catch{}
    };

    return (
        <Map
            defaultZoom={6.75}
            defaultCenter={{ lat: 28.1, lng: -82.5 }}
            minZoom={6.75}
            maxZoom={6.75}
            options={{
                restriction: {
                  latLngBounds: {east: -65, north: 51, south: 24, west:-126},
                  strictBounds: false,
                },
                
                clickableIcons: false,
                disableDefaultUI: true,
                keyboardShortcuts: false
            }}
            
            onClick={handleMapClick}

            >
            {marker}
        </Map>
    )
}

export default MyMapComponent