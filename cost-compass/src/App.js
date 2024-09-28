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

function App() {

  return (
        <div className="App">
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/resources" element={<ResourceInfo />} />
        </Routes>
        </div>
  );
}

export default App;