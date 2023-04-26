import React from "react";
import {
  useGetCardioWorkoutDetailsQuery,
  useDeleteCardioWorkoutMutation,
<<<<<<< HEAD
  useFetchYoutubeApiQuery
=======
  useFetchYoutubeAPIQuery
>>>>>>> a71af057cad53e679c1e4d05315951ca29e79e00
} from "../services/workout";
import { useParams, useNavigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import YoutubeEmbed from "./YoutubeEmbed";




const CardioWorkoutDetail = () => {
  let { workoutId } = useParams();

  let navigate = useNavigate();

  const { data: details, isLoading: Loading } = useGetCardioWorkoutDetailsQuery(workoutId);

  Promise.then((details) => {console.log(details)})
  const [deleteWorkout] = useDeleteCardioWorkoutMutation();
  // while(Loading)
  // {

  // }

<<<<<<< HEAD
  const {data: videos, isLoading: VideoLoading} = useFetchYoutubeApiQuery("potato")


  if (Loading) {
    return <div>Loading the page--just a moment</div>
  }
=======
  const { data: video, isLoading: VideoLoading } =
    useFetchYoutubeAPIQuery(details?.exercise);
  console.log(video);
  if (VideoLoading) return <div>Loading the page--just a moment</div>;
  if (Loading) return <div>Loading the page--just a moment</div>;
>>>>>>> a71af057cad53e679c1e4d05315951ca29e79e00
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
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Exercise</th>
                      <th>Duration/ Distance</th>
                      <th>Notes</th>
                    <th>Video</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={details.id}>
                      <td>{details.exercise}</td>
                      <td>{details.duration}</td>
                      <td>{details.notes}</td>
                    <td>
                      <YoutubeEmbed embedId={video}/>
                        {/* <img className= "video-img" src={require("../images/youtube_logo.png")} alt="youtube logo"></img> */}
                    </td>
                    </tr>
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
      )}
    </>
  );
};

export default CardioWorkoutDetail;
