
import './App.css';
import InputTodo from './components/InputTodo';
import ListTodo from './components/ListTodo';
function App() {
  return (
    <div className="App">
      <div className='container'>
        <InputTodo/>
        <ListTodo/>
      </div>
    </div>
  );
}

export default App;
