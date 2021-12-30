import './App.css';
import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Home from "./components/Home"
import Login from "./components/Login";
import Register from './components/Register';
import Alerts from "./components/Alerts"
import store from './store';

const App = () => {

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <ErrorBoundary>
            <Navbar />
            <Alerts/>
            <div className='main-container'>
              <Routes>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="/*" element={<Home />} />
              </Routes>
            </div>
            {/* Footer should go here */}
          </ErrorBoundary>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
