import React from "react";
import "../App.css";
import { NavLink } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="temp-container">
        <img src={require("../images/splash.png")} alt=""></img>
      </div>
      <div class="container">
        <div class="row row-cols-2">
          <div className="col">
            <div className="card card-containers">
              <div className="card-body">
                <h5 className="card-title">Vitality</h5>
                <p className="card-text">
                  Vitality is designed to help you figure out your workout plans
                  based on your desires and interests.
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card card-containers">
              <div className="card-body">
                <h5 className="card-title">How is Vitality Different?</h5>
                <p className="card-text">
                  Vitality filters your selectable exercises based on what you
                  tell it. Whether it's biceps, triceps, quads, you decide what
                  exercises you want to see.
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card card-containers">
              <div className="card-body">
                <h5 className="card-title">User Friendly</h5>
                <p className="card-text">
                  A lot of websites are over-complicated and overwhelm you with
                  all the features on one page. You worry about the plan, let us
                  worry about getting you there.
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card card-containers">
              <div className="card-body">
                <h5 className="card-title">Track Your Growth</h5>
                <p className="card-text">
                  Keep track of your workouts by the day, and see live numbers
                  that show you how much progress you've made.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container text-center">
        <NavLink to="/signup">
          <button type="button" className="btn btn-success get-started-button">
            Let's get started!
          </button>
        </NavLink>
      </div>
    </>
  );
}

export default Home;
