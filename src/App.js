import './App.css';
import { BrowserRouter } from 'react-router-dom';
import MainContent from './features/MainContent';

function App() {
  return (
    <BrowserRouter>
      <MainContent />
    </BrowserRouter>
  );
}

export default App;
