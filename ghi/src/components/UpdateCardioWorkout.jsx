import React from "react";
import "../App.css";
import { useSelector, useDispatch } from "react-redux";
import {
  handleDateChange,
  handleDurationChange,
  handleExerciseChange,
  handleNotesChange,
  handleStatusChange,
  handleWorkoutNameChange,
  reset,
} from "../features/cardio/CreateCardioWorkoutSlice";
import {
  useUpdateCardioWorkoutsMutation,
  useGetCardioWorkoutDetailsQuery,
} from "../services/workout";
import { useParams, useNavigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";

const UpdateCardioWorkout = () => {
  let { workoutId } = useParams();
  let navigate = useNavigate();

  const dispatch = useDispatch();
  const { data: details, isLoading: Loading } =
    useGetCardioWorkoutDetailsQuery(workoutId);
  const [cardioworkoutform] = useUpdateCardioWorkoutsMutation();

  const { fields } = useSelector((state) => state.cardioForm);

  if (Loading) return <div>Loading the page--just a moment</div>;
  if (details?.length === 0) return <div>This workout does not exist</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    const update = {};
    for (let key in fields) {
      if (fields[key] === "") {
        update[key] = details[key];
      } else {
        update[key] = fields[key];
      }
    }

    cardioworkoutform({ workoutId, update });
    dispatch(reset());
    navigate(`/Workouts/Cardio/${workoutId}/`);
  };

  return (
    <>
      {!details ? (
        <>
          <ErrorPage />
        </>
      ) : (
        <>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Update Cardio Workout</h5>
              <hr />
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="workout_name" className="form-label">
                    Workout Name:
                  </label>
                  <input
                    placeholder={details.workout_name}
                    className="form-control form-control-sm"
                    type={`text`}
                    id="workoutName"
                    value={fields.workout_name}
                    onChange={(e) =>
                      dispatch(handleWorkoutNameChange(e.target.value))
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exercise" className="form-label">
                    Exercise:
                  </label>
                  <input
                    placeholder={details.exercise}
                    className="form-control form-control-sm"
                    type={`text`}
                    id="exercise"
                    value={fields.exercise}
                    onChange={(e) =>
                      dispatch(handleExerciseChange(e.target.value))
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">
                    Date:
                  </label>
                  <input
                    className="form-control form-control-sm"
                    type={`date`}
                    id="date"
                    value={fields.date}
                    onChange={(e) => dispatch(handleDateChange(e.target.value))}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="duration" className="form-label">
                    Duration:
                  </label>
                  <input
                    placeholder={details.duration}
                    className="form-control form-control-sm"
                    type={`text`}
                    id="duration"
                    value={fields.duration}
                    onChange={(e) =>
                      dispatch(handleDurationChange(e.target.value))
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="notes" className="form-label">
                    Notes:
                  </label>
                  <textarea
                    className="form-control form-control-sm"
                    type={`text`}
                    id="notes"
                    value={fields.notes}
                    placeholder={details.notes}
                    onChange={(e) =>
                      dispatch(handleNotesChange(e.target.value))
                    }
                  />
                </div>
                <div className="mb-3">
                  <select
                    value={fields.status}
                    onChange={(e) =>
                      dispatch(handleStatusChange(e.target.value))
                    }
                    required
                    name="status"
                    id="status"
                    className="form-select"
                  >
                    <option key="Incomplete">Incomplete</option>
                    <option key="Complete">Complete</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-success">
                  Update
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default UpdateCardioWorkout;
