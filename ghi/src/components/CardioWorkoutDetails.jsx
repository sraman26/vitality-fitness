import React from "react";
import {
  useGetCardioWorkoutDetailsQuery,
  useDeleteCardioWorkoutMutation,
  useFetchYoutubeAPIQuery
} from "../services/workout";
import { useParams, useNavigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import YoutubeEmbed from "./YoutubeEmbed";




const CardioWorkoutDetail = () => {
  let { workoutId } = useParams();

  let navigate = useNavigate();

  const { data: details, isLoading: Loading } =
    useGetCardioWorkoutDetailsQuery(workoutId);
  const [deleteWorkout] = useDeleteCardioWorkoutMutation();

  const { data: video, isLoading: VideoLoading } =
    useFetchYoutubeAPIQuery(details?.exercise);
  if (VideoLoading) return <div>Loading the page--just a moment</div>;
  if (Loading) return <div>Loading the page--just a moment</div>;
  if (details?.length === 0) return <div>This workout does not exist</div>;

  const date = new Date(details.date)

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
        <div className="workout-background">
          <div className="container">
            <div className="list-container">
              <div className="shadow p-4 mt-4">
                <h1>
                  {details.workout_name} - {date.toDateString()} -{" "}
                  {details.status}
                </h1>
                <hr />
                <table className="table table-striped detail-table">
                  <thead>
                    <tr>
                      <th className="table-header">Exercise</th>
                      <th className="table-header">Duration/ Distance</th>
                      <th className="table-header">Video</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={details.id}>
                      <td>{details.exercise}</td>
                      <td>{details.duration}</td>
                      <td className="video-td">
                        <YoutubeEmbed embedId={video} />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <h3>Workout Notes</h3>
                <p className="detail-notes">{details.notes}</p>
                <hr />
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
                    className="btn btn-primary detail-button"
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
      )}
    </>
  );
};

export default CardioWorkoutDetail;
