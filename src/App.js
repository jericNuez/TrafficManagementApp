import './App.css';
import { BrowserRouter } from 'react-router-dom';
import MainContent from './features/MainContent';
import TopNav from './features/TopNav';
import SideBar from './components/Sidebar';

function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <SideBar />
      <MainContent />
    </BrowserRouter>
  );
}

export default App;
