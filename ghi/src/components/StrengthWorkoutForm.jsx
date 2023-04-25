import React from "react";
import "../App.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  handleWorkoutNameChange,
  handleDateChange,
  handleStatusChange,
  reset,
} from "../features/strength/CreateStrengthWorkoutSlice";
import {
  useCreateStrengthWorkoutsMutation,
  useFetchStrengthApiQuery,
} from "../services/workout";
import { useNavigate } from "react-router-dom";

const StrengthWorkoutForm = () => {
  const [inputFields, setInputFields] = useState([
    { muscle: "", name: "", reps: "", notes: "" },
  ]);

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

  // ############################### DYNAMIC ROWS ABOVE ##################################

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [strengthworkoutform] = useCreateStrengthWorkoutsMutation();
  const { fields } = useSelector((state) => state.strengthForm);

  const [muscle, setMuscle] = useState("abdominals");
  const [suggestion, setSuggestion] = useState(false);

  const handleMuscleChange = (event) => {
    const value = event.target.value;
    setMuscle(value);
  };

  const { data: fetch, isLoading: Loading } = useFetchStrengthApiQuery(muscle);

  if (Loading) {
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

  const handleSuggestionChange = (event) => {
    setSuggestion(!suggestion);
  };

  // ############################### API FETCH ABOVE ##################################
  const handleSubmit = (e) => {
    e.preventDefault();
    let update = { ...fields, ...{ exercises: inputFields } };
    strengthworkoutform(update);
    dispatch(reset());
    navigate("/Workouts");
  };

  return (
    <>
      <div className="row row-cols-2">
        <div className="card form-cards col">
          <div className="card-body">
            <h5 className="card-title">New Strength Workout</h5>
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
                  onChange={(e) => dispatch(handleDateChange(e.target.value))}
                />
              </div>
              <div className="mb-3">
                <select
                  value={fields.status}
                  onChange={(e) => dispatch(handleStatusChange(e.target.value))}
                  required
                  name="status"
                  id="status"
                  className="form-select"
                >
                  <option key="Incomplete">Incomplete</option>
                  <option key="Complete">Complete</option>
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
                        onChange={(event) => handleFormChange(index, event)}
                      />
                      <input
                        name="name"
                        placeholder="Exercise Name"
                        value={input.name}
                        onChange={(event) => handleFormChange(index, event)}
                      />
                      <input
                        name="reps"
                        placeholder="Reps"
                        value={input.reps}
                        onChange={(event) => handleFormChange(index, event)}
                      />
                      <input
                        name="notes"
                        placeholder="Notes"
                        value={input.notes}
                        onChange={(event) => handleFormChange(index, event)}
                      />
                      <button onClick={() => removeFields(index)}>
                        Remove
                      </button>
                    </div>
                  );
                })}
                <button onClick={addFields}>Add More..</button>
              </div>
              <div className="createorupdate-button-container">
                <button type="submit" className="btn btn-success">
                  Create
                </button>
                <button
                  className="btn btn-warning"
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
    </>
  );
};

export default StrengthWorkoutForm;
