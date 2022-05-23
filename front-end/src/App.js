import './App.css';
import Header from './Header';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Login';
import Home from './Home';
import Page404 from './Page404';
import Logout from './Logout';

import Profile from './Profile';
import Register from './Register';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
        <Route path="*" element={<Page404 />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/profile' element={<Profile />} />
          <Route exact path='/logout' element={<Logout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
