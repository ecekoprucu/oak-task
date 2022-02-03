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

const AppWrapper =  () => {
  return (
    <DataProvider><App /></DataProvider>
  )
};
export default AppWrapper;
