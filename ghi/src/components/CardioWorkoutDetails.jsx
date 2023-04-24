import React from "react";
import {
  useGetCardioWorkoutDetailsQuery,
  useDeleteCardioWorkoutMutation,
} from "../services/workout";
import { useParams, useNavigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";

const CardioWorkoutDetail = () => {
  let { workoutId } = useParams();

  let navigate = useNavigate();

  const { data: details, isLoading: Loading } =
    useGetCardioWorkoutDetailsQuery(workoutId);
  const [deleteWorkout] = useDeleteCardioWorkoutMutation();

  if (Loading) return <div>Loading the page--just a moment</div>;
  if (details?.length === 0) return <div>This workout does not exist</div>;

  function handleDelete(workoutId) {
    deleteWorkout(workoutId);
    navigate("/Workouts");
  }
  function handleUpdate(workoutId) {
    navigate(`/Workouts/Cardio/${workoutId}/Update`);
  }

  return (
    <>
      {!details ? (
        <ErrorPage />
      ) : (
        <div className="container">
          <div>
            <div className="shadow p-4 mt-4">
              <h1>{details.workout_name}</h1>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Exercise</th>
                    <th>Duration/ Distance</th>
                    <th>Notes</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={details.id}>
                    <td>{details.exercise}</td>
                    <td>{details.duration}</td>
                    <td>{details.notes}</td>
                  </tr>
                </tbody>
              </table>
              <button
                className="btn btn-danger"
                onClick={() => {
                  handleDelete(workoutId);
                }}
              >
                Delete
              </button>
              <button
                className="btn btn-success"
                onClick={() => {
                  handleUpdate(workoutId);
                }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardioWorkoutDetail;
