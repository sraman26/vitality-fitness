import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm.jsx";
import SignupForm from "./components/auth/SignupForm.jsx";
import WorkoutList from "./components/WorkoutList.jsx";
import Home from "./components/Home.jsx";
import Nav from "./components/Nav.jsx";
import CardioWorkoutForm from "./components/CardioWorkoutForm.jsx";
import CardioWorkoutDetail from "./components/CardioWorkoutDetails";
import UpdateCardioWorkout from "./components/UpdateCardioWorkout";
import StrengthWorkoutForm from "./components/StrengthWorkoutForm";
import StrengthWorkoutDetail from "./components/StrengthWorkoutDetails";
import UpdateStrengthWorkout from "./components/UpdateStrengthWorkout";
import ErrorPage from "./components/ErrorPage";
import { useGetAccountQuery } from "./services/workout";

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, '');
  const { data: account, isLoading } = useGetAccountQuery();
  if (isLoading) {
    return;
  }

  return (
    <BrowserRouter basename={basename}>
      <Nav />
      <div className="">
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="Login" element={<LoginForm />} />
          <Route path="Signup" element={<SignupForm />} />
          {account && (
            <>
              <Route path="Workouts">
                <Route index element={<WorkoutList />} />
                <Route path="Cardio/:workoutId">
                  <Route index element={<CardioWorkoutDetail />} />
                  <Route path="Update" element={<UpdateCardioWorkout />} />
                </Route>
                <Route path="Strength/:workoutId">
                  <Route index element={<StrengthWorkoutDetail />} />
                  <Route path="Update" element={<UpdateStrengthWorkout />} />
                </Route>
                <Route path="CardioForm" element={<CardioWorkoutForm />} />
                <Route path="StrengthForm" element={<StrengthWorkoutForm />} />
              </Route>
            </>
          )}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
