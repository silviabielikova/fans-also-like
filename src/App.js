import logo from './logo.svg';
import './App.css';
import AccessToken from "./features/token/AccessToken";



function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
      <AccessToken
          clientId={'034dcd59e74443a9abd2232e115960dd'}
          clientSecret={'ba99678cbe6544bb980c7f16349f2d2a'}
      />
  );
}

export default App;

