import React from "react";
import './resources.css';
import pic from '../../assets/la.png';

const Resource = () => {
  return (
      <section id="resources">
          <div className="projContent">
            <h1 className="kode-mono-o">RESOURCES</h1>
              <br></br><br></br>
              <div className="mobileproj kode-mono-o">
                  <div className="box">
                    <p className="name kode-mono-o">React Documentation</p>
                  <a href="https://reactjs.org/docs/getting-started.html" target="_blank" rel="noopener noreferrer">
                    <img src={pic} alt="pic" className="r-icon" />
                  </a> </div>
                  <p className="description kode-mono-o">Learn the basics and advanced concepts of React.js.</p>
                            
                  <div className="box">
                    <h2 className="name kode-mono-o">React Router Documentation</h2>
                  <a href="https://reactrouter.com/en/main" target="_blank" rel="noopener noreferrer">
                    <img src={pic} alt="pic" className="r-icon" />
                  </a></div>
                  <p className="description kode-mono-o">API for embedding Google Maps and related features.</p>

                  <div className="box">
                    <h2 className="name kode-mono-o">React-Google-Maps Documentation</h2>
                  <a href="https://visgl.github.io/react-google-maps/" target="_blank" rel="noopener noreferrer">
                      <img src={pic} alt="pic" className="r-icon" />
                  </a></div>
                  <p className="description kode-mono-o">React component library for Google Maps integration.</p>

                  <div className="box">
                    <h2 className="name kode-mono-o">React Scroll Documentation</h2>
                  <a href="https://www.npmjs.com/package/react-scroll" target="_blank" rel="noopener noreferrer">
                      <img src={pic} alt="pic" className="r-icon" />
                  </a></div>
                  <p className="description kode-mono-o">Smooth scrolling library for navigating within the page.</p>
             
                  <div className="box">
                    <h2 className="name kode-mono-o">CSS Documentation</h2>
                  <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank" rel="noopener noreferrer">
                      <img src={pic} alt="pic" className="r-icon" />
                  </a></div>
                  <p className="description kode-mono-o">Comprehensive guide to CSS for styling web applications.</p>
              </div>
              <div className="card-wrapper">
              <div className="box">
                    <p className="name kode-mono-o">React Documentation</p>
                  <a href="https://reactjs.org/docs/getting-started.html" target="_blank" rel="noopener noreferrer">
                    <img src={pic} alt="pic" className="r-icon" />
                  </a> </div>
                  <p className="description kode-mono-o">Learn the basics and advanced concepts of React.js.</p>
                  
                  <div className="box">
                    <h2 className="name kode-mono-o">React Router Documentation</h2>
                  <a href="https://reactrouter.com/en/main" target="_blank" rel="noopener noreferrer">
                    <img src={pic} alt="pic" className="r-icon" />
                  </a></div>
                  <p className="description kode-mono-o">API for embedding Google Maps and related features.</p>

                  <div className="box">
                    <h2 className="name kode-mono-o">React-Google-Maps Documentation</h2>
                  <a href="https://visgl.github.io/react-google-maps/" target="_blank" rel="noopener noreferrer">
                      <img src={pic} alt="pic" className="r-icon" />
                  </a></div>
                  <p className="description kode-mono-o">React component library for Google Maps integration.</p>

                  <div className="box">
                    <h2 className="name kode-mono-o">React Scroll Documentation</h2>
                  <a href="https://www.npmjs.com/package/react-scroll" target="_blank" rel="noopener noreferrer">
                      <img src={pic} alt="pic" className="r-icon" />
                  </a></div>
                  <p className="description kode-mono-o">Smooth scrolling library for navigating within the page.</p>
             
                  <div className="box">
                    <h2 className="name kode-mono-o">CSS Documentation</h2>
                  <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank" rel="noopener noreferrer">
                      <img src={pic} alt="pic" className="r-icon" />
                  </a></div>
                  <p className="description kode-mono-o">Comprehensive guide to CSS for styling web applications.</p> 
              </div> 
          </div>
      </section>
  );
};

export default Resource;