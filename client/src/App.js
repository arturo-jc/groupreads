import './App.css';
import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from "./components/pages/Landing";
import Login from "./components/auth/Login";
import Register from './components/auth/Register';
import Dashboard from './components/pages/Dashboard';
import { Provider } from "react-redux";
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          {/* Alerts should go here */}
          <Routes>
            <Route path="" element={<Landing />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Routes>
          {/* Footer should go here */}
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
