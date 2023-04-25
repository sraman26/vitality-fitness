## Project Documentation

Team Members:
- Aaron Lee
- Mike Mikius
- Sitara Raman
- Tahmid Baro Bhuiyan

Application Name: Vitality

Application Description: Vitality is your next  workout app tracker. It displays your list of logged workouts, both completed and incompleted. This way, you can keep track of your completed progress while still looking forward to upcoming workouts. Users have the ability to create distinct workouts that focus on either cardio or strength development. Users also have the ability to view their completed and incompleted workouts side by side, allowing for self-reflection of your progress, while maintaining the ability to modify/delete created workouts and change their status from incomplete to complete.

Application Design:
Application backend was created utilizing python in FastAPI, and a Mongo-DB database for flexible data storage. The front-end was built utilizing Javascript in React Redux, with Bootstrap to compliment our CSS design.

Framework:
- [Wireframe](docs/Project_Wireframes.png)
- [Endpoints and Request/Response Shapes](docs/API_ENDPOINTS.MD)


Functionality:
- Visitors begin on a homepage that provides a general description of the application. Prompts to login or sign up are provided. Every other functionality is protected until user is logged in.
- After logging in, the navigation bar will contain the following:
    - View user's Workout List Page
    - Add a Cardio Workout
    - Add a Strength Workout
- Successfully creating workouts will redirect users back to the Workout List page, which should be dynamically updating.
- Workouts from the Workout List page can be selected, redirecting users to a detail page for the given workout
- From the detail page, users can update/delete the workouts. Successful updates redirect the user back to the detail page. Successful deletes redirect them to the Workout List page.
- Full functionality is limited to strictly the homepage, signup/login page and an error page until user is logged in.
- Users who attempt to access existing pages via URL will be redirected to the error page until authentication is complete.

Using our Application
Please follow the provided steps to clone the repository and run it on your local machine.
1. Clone the repository down to your local machine
2. CD into the new project directory
3. Run docker volume create mongo-data
4. Run docker compose build
5. Run docker compose up
6. Allow some time for React servers to fully boot
7. Enjoy!

Future of the Project
- Workout Cards
- Implementing a Calendar View for the Workout List Page
- Integrating Youtube instruction videos
- Allowing for users to select favorite workouts and exercises
- Integrating API fetches into CRUD methods
- Implement diet tracking as a core feature
