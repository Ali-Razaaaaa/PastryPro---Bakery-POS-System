import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Loginpage from './Files/Pages/Loginpage';  
import Mainpage from './Files/Pages/Mainpage';

const App = () => {
  return (
    <div className='Body'>
      <Router>
        <Routes>
          <Route path="/" element={<Loginpage />} />
          <Route path="/main" element={<Mainpage />} />
          <Route path="/loginscreen" element={<Loginpage />} /> 
        </Routes>
      </Router>
    </div>
  );
};

export default App;