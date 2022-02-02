import './App.css';
import CheckList from './components/CheckList';
import {DataProvider} from './context/dataContext';

function App() {

  return (
    <div className="App">
      <header className="header">
        <h2>Check List</h2>
      </header>
      <div className="top-body">
        <CheckList />
      </div>
    </div>
  );
}


export default () => {
  return (
    <DataProvider>
      <App />
    </DataProvider>
  );
};
