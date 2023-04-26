import React from "react";
import {
  useGetStrengthWorkoutDetailsQuery,
  useDeleteStrengthWorkoutMutation,
} from "../services/workout";
import { useParams, useNavigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";

const StrengthWorkoutDetail = () => {
  let { workoutId } = useParams();

  let navigate = useNavigate();

  const { data: details, isLoading: Loading } =
    useGetStrengthWorkoutDetailsQuery(workoutId);
  const [deleteWorkout] = useDeleteStrengthWorkoutMutation();

  if (Loading) return <div>Loading the page--just a moment</div>;
  if (details?.length === 0) return <div>This workout does not exist</div>;

  const date = new Date(details.date)

  function handleDelete(workoutId) {
    deleteWorkout(workoutId);
    navigate("/Workouts");
  }
  function handleUpdate(workoutId) {
    navigate(`/Workouts/Strength/${workoutId}/Update`);
  }

  return (
    <>
      {!details ? (
        <>
          <ErrorPage />
        </>
      ) : (
        <>
          <div className="workout-background">
            <div className="container">
              <div className="list-container">
                <div className="shadow p-4 mt-4">
                  <h1>
                    {details.workout_name} - {date.toDateString()} -{" "}
                    {details.status}
                  </h1>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Exercise</th>
                        <th>Muscle</th>
                        <th>Reps</th>
                        <th>Notes</th>
                      <th>Video</th>
                      </tr>
                    </thead>
                    <tbody>
                      {details.exercises.map((exercise, i) => {
                        return (
                          <tr key={i}>
                            <td>{exercise.name}</td>
                            <td>{exercise.muscle}</td>
                            <td>{exercise.reps}</td>
                            <td>{exercise.notes}</td>
                          <td>
                            <a href= {`https://www.youtube.com/results?search_query=${exercise.name}`}>
                              <img className= "video-img" src={require("../images/youtube_logo.png")} alt="youtube logo"></img>
                            </a>
                          </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div className="detail-button-container">
                    <button
                      className="btn btn-danger detail-button"
                      onClick={() => {
                        handleDelete(workoutId);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-success detail-button"
                      onClick={() => {
                        handleUpdate(workoutId);
                      }}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default StrengthWorkoutDetail;
