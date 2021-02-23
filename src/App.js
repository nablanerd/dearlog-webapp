import './mini-dark.css';

import './App.css';
import Logo from './Logo'
import Navigation from './Navigation'
import Message from './Message';
import LogList from './LogList';

function App() {
  return (
    <div className="container">
      
      <Navigation />
      <Message type="warning" />
      <LogList />
    </div>
  );
}

export default App;
