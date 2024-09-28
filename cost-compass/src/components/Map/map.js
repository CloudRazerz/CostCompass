import { Map } from "@vis.gl/react-google-maps";

function MyMapComponent() {
    const handleMapClick = (event) => {
        alert(`You clicked the map at latitude: ${event.detail.latLng.lat}, longitude: ${event.detail.latLng.lng}`);
    };

    return (
        <Map
            defaultZoom={6.75}
            defaultCenter={{ lat: 28.1, lng: -82.5 }}
            onClick={handleMapClick}
            gestureHandling={'none'}
            disableDefaultUI={'true'}
            keyboardShortcuts={'false'}
            />
    )
}

export default MyMapComponent