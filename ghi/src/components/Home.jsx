import React from 'react'
import '../App.css'


function Home() {
  return (
    <>
        <div className="temp-container">
            <img src={require("../images/splash.png")}></img>
        </div>
        <div className="container-fluid">
            <div className="row row-cols-3 d-flex mt-5 justify-content-center">
                <div className="card" >
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
                        <div className="card" >
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
                        <div className="card" >
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
                        <div className="card" >
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Home
