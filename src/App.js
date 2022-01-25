import 'antd/dist/antd.min.css';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <Router>
      <div className='App'>
        <h1>Github list of issues:</h1>
        <AppRouter />
      </div>
    </Router>
  );
}

export default App;
