import Navbar from "./Navbar/navbar";
import MyMapComponent from "./Map/map";
import { APIProvider } from '@vis.gl/react-google-maps';
import up from '../assets/up.png';
import './home.css'; 

//import Intro from "./components/Intro/intro";
function hideOverlay() {
    document.getElementById('overlay').classList.add('hidden');
    document.getElementById('info').classList.remove('hidden');
}

function Home(){
    return (
        <>
        <Navbar />
        <div className="paragraph" id="overlay" onclick="hideOverlay()">
            <h1>Welcome to <span class="color">CostCompass!</span></h1>
            <p>CostCompass provides a Geographic Information System (GIS)-powered map, offering real-time insights on the cost of living across the United States. By integrating data from Google Maps AI, OpenAI, and the U.S. Census, CostCompass delivers up-to-date information, helping users make informed decisions about living expenses based on budget and lifestyle preferences. Whether you're exploring local costs or regional trends, CostCompass provides precise data, highlighting differences in cost of living across various cities in the US.</p>
            <p><span>Did you know?</span> Over the past five years, the average cost of living in the United States has increased by approximately 15%.</p>
            <a>© Developed by TheNivedha, CostCompass is your go-to resource for financial planning in Florida. All rights reserved.</a>
    
            <a href="#" onClick={hideOverlay} style={{cursor: 'pointer'}}><img alt="up_arrow" src={up}/></a>
        </div>
        <APIProvider apiKey={process.env.REACT_APP_API_KEY}>
            <MyMapComponent />
        </APIProvider>
        </>
    )
}

export default Home;