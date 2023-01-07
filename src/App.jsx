import React, { Suspense, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import UserForm from "./components/userForm";
import { Route, Routes } from "react-router";
import { BASE_ROUTE, LOGIN_ROUTE, USER_ROUTE } from "./constant/route";
const Login = React.lazy(() => import("./pages/login"));
const Home = React.lazy(() => import("./pages/home"));

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={LOGIN_ROUTE} element={<Login />} />
          <Route path={USER_ROUTE} element={<UserForm />} />
          <Route path={BASE_ROUTE} element={<Home />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
