import AvatarFeed from './AvatarFeed.js';
import './App.css';
import Logo from './Rick-and-Morty-Logo.png';
function App() {
  return (
    <>
      <center>
        <img src={Logo} className="logo"></img>
        <AvatarFeed/>
      </center>
    </>
  );
}

export default App;
