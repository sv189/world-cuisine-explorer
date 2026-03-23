import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';
import Home from './pages/Home';
import CountryPage from './pages/CountryPage';
import DishPage from './pages/DishPage';
import FavoritesPage from './pages/FavoritesPage';
import Navbar from './components/Navbar';


function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/country/:id" element={<CountryPage />} />
            <Route path="/dish/:id" element={<DishPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </BrowserRouter>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;
       