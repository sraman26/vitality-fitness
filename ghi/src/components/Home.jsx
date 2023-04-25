import React from "react";
import "../App.css";
import { NavLink } from "react-router-dom";
import { useGetAccountQuery } from "../services/workout";
import Carousel from "react-bootstrap/Carousel";

function Home() {
  const { data: account, isLoading } = useGetAccountQuery();
  if (isLoading) {
    return;
  }

  return (
    <>
      <div className="carousel-index">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={require("../images/splash.png")}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={require("../images/sunset_runner.jpg")}
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={require("../images/sunset_runners.jpg")}
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={require("../images/Jumping.png")}
              alt="Fourth slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={require("../images/sunset-swim.jpg")}
              alt="Fifth slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="d-flex justify-content-center">
        <h1 className="home-title">Vitality Fitness</h1>
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
    </>
  );
}

export default Home;
