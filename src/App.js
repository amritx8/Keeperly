import { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Screens/Home';
import SignIn from './Screens/SignIn';
import SignUp from './Screens/SignUp';
import Profile from './Screens/Profile';
import { UserContext } from './userContext';

function App() {

  const prevUser = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState(prevUser);

  return (
    <Router>
      <UserContext.Provider value={{user, setUser}}>
        <Header />
        <div className="app">
          <Route path='/' component={Home} exact />
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          <Route path='/profile' component={Profile} />
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;