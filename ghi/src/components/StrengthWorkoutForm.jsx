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
import { useCreateStrengthWorkoutsMutation } from "../services/workout";
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

  // ################################DYNAMIC ROWS ABOVE###################################

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [strengthworkoutform] = useCreateStrengthWorkoutsMutation();
  const { fields } = useSelector((state) => state.strengthForm);

  const handleSubmit = (e) => {
    e.preventDefault();
    let update = { ...fields, ...{ exercises: inputFields } };
    strengthworkoutform(update);
    dispatch(reset());
    navigate("/Workouts");
  };

  return (
    <>
      <div className="card form-cards">
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
                    <button onClick={() => removeFields(index)}>Remove</button>
                  </div>
                );
              })}
              <button onClick={addFields}>Add More..</button>
            </div>
            <div className="createorupdate-button-container">
              <button type="submit" className="btn btn-success">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default StrengthWorkoutForm;
