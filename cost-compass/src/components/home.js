import Navbar from "./Navbar/navbar";
import MyMapComponent from "./Map/map";
import { APIProvider } from '@vis.gl/react-google-maps';
//import Intro from "./components/Intro/intro";


function Home(){
    return (
        <>
        <Navbar />
        <APIProvider apiKey={process.env.REACT_APP_API_KEY}>
            <MyMapComponent />
        </APIProvider>
        </>
    )
}

export default Home;