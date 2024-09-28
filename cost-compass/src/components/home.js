import Navbar from "./Navbar/navbar";
import { APIProvider, Map } from '@vis.gl/react-google-maps';
//import Intro from "./components/Intro/intro";

const apiKey = process.env.REACT_APP_API_KEY;

function Home(){
    return (
        <>
        <Navbar />
        
        <APIProvider apiKey={apiKey} onLoad={() => console.log('Maps API has loaded.')}>
            <Map
            defaultZoom={13}
            defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
            mapId='da37f3254c6a6d1c'
            />
        </APIProvider>
        </>
    )
}

export default Home;