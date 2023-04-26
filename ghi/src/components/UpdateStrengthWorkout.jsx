import React from "react";
import "../App.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useUpdateStrengthWorkoutsMutation,
  useGetStrengthWorkoutDetailsQuery,
  useFetchStrengthApiQuery
} from "../services/workout";
import { useParams, useNavigate } from "react-router-dom";
import {
  handleWorkoutNameChange,
  handleDateChange,
  handleStatusChange,
  reset,
} from "../features/strength/CreateStrengthWorkoutSlice";
import ErrorPage from "./ErrorPage";

const UpdateStrengthWorkout = () => {
  let { workoutId } = useParams();
  let navigate = useNavigate();

  const [inputFields, setInputFields] = useState([]);

  const addFields = (e) => {
    let newfield = { muscle: "", name: "", reps: "", notes: "" };

    setInputFields([...inputFields, newfield]);
    e.preventDefault();
  };

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  };

  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };


  // ################################DYNAMIC ROWS ABOVE###################################

  const dispatch = useDispatch();
  const { data: details, isLoading: Loading } =
    useGetStrengthWorkoutDetailsQuery(workoutId);
  const [strengthworkoutform] = useUpdateStrengthWorkoutsMutation();
  const [muscle, setMuscle] = useState("abdominals");
  const { data: fetch, isLoading: FetchLoading } =
      useFetchStrengthApiQuery(muscle);
  const { fields } = useSelector((state) => state.strengthForm);


  const [suggestion, setSuggestion] = useState(false);

  if (Loading) return <div>Loading the page--just a moment</div>;
  if (details?.length === 0) return <div>This workout does not exist</div>;
   if (FetchLoading) {
     return;
   }

  let muscles = [
    "abdominals",
    "abductors",
    "adductors",
    "biceps",
    "calves",
    "chest",
    "forearms",
    "glutes",
    "hamstrings",
    "lats",
    "lower_back",
    "middle_back",
    "neck",
    "quadriceps",
    "traps",
    "triceps",
  ];


    const handleMuscleChange = (event) => {
      const value = event.target.value;
      setMuscle(value);
    };

    const handleSuggestionChange = (event) => {
      setSuggestion(!suggestion);
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    let update = { ...fields, ...{ exercises: inputFields } };

    const newData = {};
    for (let key in update) {
      if (update[key] === "" || update[key].length === 0) {
        newData[key] = details[key];
      } else {
        newData[key] = update[key];
      }
    }

    strengthworkoutform({ newData, workoutId });
    dispatch(reset());
    navigate(`/Workouts/Strength/${workoutId}/`);
  };

  return (
    <>
      {!details ? (
        <>
          <ErrorPage />
        </>
      ) : (
        <>
          <div className="workout-background form-background">
            <div className="row row-cols-2">
              <div className="card form-cards col workout-container">
                <div className="card-body">
                  <h5 className="card-title">Update Strength Workout</h5>
                  <hr />
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="workout_name" className="form-label">
                        Workout Name:
                      </label>
                      <input
                        className="form-control form-control-sm"
                        type={`text`}
                        id="workoutName"
                        value={fields.workout_name}
                        placeholder={details.workout_name}
                        onChange={(e) =>
                          dispatch(handleWorkoutNameChange(e.target.value))
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
                        onChange={(e) =>
                          dispatch(handleDateChange(e.target.value))
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
                        <option key="Complete">Complete</option>
                        <option key="Incomplete">Incomplete</option>
                      </select>
                    </div>
                    <div className="App">
                      {inputFields.map((input, index) => {
                        return (
                          <div key={index}>
                            <input
                              name="muscle"
                              placeholder="Muscle"
                              value={input.muscle}
                              required={true}
                              onChange={(event) =>
                                handleFormChange(index, event)
                              }
                            />
                            <input
                              name="name"
                              placeholder="Exercise Name"
                              value={input.name}
                              required={true}
                              onChange={(event) =>
                                handleFormChange(index, event)
                              }
                            />
                            <input
                              name="reps"
                              placeholder="Reps"
                              value={input.reps}
                              required={true}
                              onChange={(event) =>
                                handleFormChange(index, event)
                              }
                            />
                            <input
                              name="notes"
                              placeholder="Notes"
                              value={input.notes}
                              required={true}
                              onChange={(event) =>
                                handleFormChange(index, event)
                              }
                            />
                            <button
                              type="button"
                              class="btn btn-danger"
                              onClick={() => removeFields(index)}
                            >
                              Remove
                            </button>
                          </div>
                        );
                      })}
                      <button
                        type="button"
                        class="btn btn-success"
                        onClick={addFields}
                      >
                        Add More..
                      </button>
                    </div>
                    <div className="createorupdate-button-container">
                      <button type="submit" className="btn btn-success">
                        Update
                      </button>
                      <button
                        className="btn btn-warning suggestion-buttons"
                        onClick={handleSuggestionChange}
                        value={suggestion}
                        type="button"
                      >
                        Would you like suggestions?
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              {suggestion && (
                <>
                  <div className="card form-cards col">
                    <div className="card-body">
                      <div className="justify-content-center d-flex">
                        <select onChange={handleMuscleChange} value={muscle}>
                          {muscles.map((muscle, index) => {
                            return <option key={index}>{muscle}</option>;
                          })}
                        </select>
                      </div>
                      <hr />
                      <h5 className="card-title">Suggested Exercises</h5>
                      <hr />
                      <table>
                        <thead>
                          <tr>
                            <th>Exercise</th>
                            <th>Difficulty</th>
                            <th>Equipment</th>
                          </tr>
                        </thead>
                        <tbody>
                          {fetch.exercises.map((exercise, index) => {
                            return (
                              <tr key={index}>
                                <td>{exercise.name}</td>
                                <td>{exercise.difficulty}</td>
                                <td>{exercise.equipment}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateStrengthWorkout;
