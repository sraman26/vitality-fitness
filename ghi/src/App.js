import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginForm from './components/auth/LoginForm.jsx';
import SignupForm from './components/auth/SignupForm.jsx';
import WorkoutList from './components/WorkoutList';
import Home from './components/Home.jsx';
import Nav from './components/Nav.jsx';


function App() {
  // const [launch_info, setLaunchInfo] = useState([]);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   async function getData() {
  //     let url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api/launch-details`;
  //     console.log('fastapi url: ', url);
  //     let response = await fetch(url);
  //     console.log("------- hello? -------");
  //     let data = await response.json();

  //     if (response.ok) {
  //       console.log("got launch data!");
  //       setLaunchInfo(data.launch_details);
  //     } else {
  //       console.log("drat! something happened");
  //       setError(data.message);
  //     }
  //   }
  //   getData();
  // }, [])


  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route index element={<Home />} />
          <Route path="Login" element={<LoginForm />}/>
          <Route path="Signup" element={<SignupForm/>}/>
          <Route path="workouts" element={<WorkoutList/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
