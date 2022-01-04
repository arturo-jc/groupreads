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
import Footer from './components/Footer';
import store from './store';

const App = () => {

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <ErrorBoundary>
              <div className="site-content">
                <Navbar />
                <Alerts/>
                  <Routes>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="/*" element={<Home />} />
                  </Routes>
              </div>
            <Footer/>
          </ErrorBoundary>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
