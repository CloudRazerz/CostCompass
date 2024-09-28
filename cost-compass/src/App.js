import React from 'react';
import {Routes, Route} from 'react-router-dom';  // Import necessary router components
import Home from './components/home';
import ResourceInfo from './components/resource-info';
// import { motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";

// const Section = ({ children }) => {
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.4, 
//   });

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 100 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.5 }}
//     >
//       {children}
//     </motion.div>
//   );
// };

const apiKey = process.env.REACT_APP_API_KEY;

function App() {

  return (
    <div className="App">
      <Navbar />
      {/* <Intro />
      <Resources /> */}
      <APIProvider apiKey={'api-key'} onLoad={() => console.log('Maps API has loaded.')}>
    <Map
      defaultZoom={13}
      defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
      mapId='da37f3254c6a6d1c'
      >
    </Map>
  </APIProvider>
    </div>
  );
}

export default App;