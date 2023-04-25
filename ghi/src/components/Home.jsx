import React from "react";
import "../App.css";
import { NavLink } from "react-router-dom";
import { useGetAccountQuery } from "../services/workout";

function Home() {
  const { data: account, isLoading } = useGetAccountQuery();
  if (isLoading) {
    return;
  }

  return (
    <>
      <div className="temp-container">
        <img src={require("../images/splash.png")} alt=""></img>
      </div>
      <div className="container">
        <div className="row row-cols-2">
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
      {!account && (
        <div className="container text-center">
          <NavLink to="/signup">
            <button
              type="button"
              className="btn btn-success get-started-button"
            >
              Let's get started!
            </button>
          </NavLink>
        </div>
      )}
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="false"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={require("../images/splash.png")}
              className="d-block w-100"
              alt="..."
            ></img>
            <div className="carousel-caption d-none d-md-block">
              <h5>First slide label</h5>
              <p>
                Some representative placeholder content for the first slide.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src={require("../images/splash.png")}
              className="d-block w-100"
              alt="..."
            ></img>
            <div className="carousel-caption d-none d-md-block">
              <h5>Second slide label</h5>
              <p>
                Some representative placeholder content for the second slide.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src={require("../images/splash.png")}
              className="d-block w-100"
              alt="..."
            ></img>
            <div className="carousel-caption d-none d-md-block">
              <h5>Third slide label</h5>
              <p>
                Some representative placeholder content for the third slide.
              </p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}

export default Home;
