import './mini-dark.css';

import './App.css';
import Logo from './Logo'
import Navigation from './Navigation'
import Message from './Message';

function App() {
  return (
    <div className="container">
      
      <Navigation />
      <Message type="warning"/>
    </div>
  );
}

export default App;
