import NavBar from './components/NavBar';
import Banner from './components/Banner';
import Books from './components/Books';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Favourites from './components/Favourites';
import './App.css';
import Detail from './components/Detail';
import Cover from './components/Cover';
import Cart from './components/Cart';

function App() {
  return (
    <div>
     <BrowserRouter>
          <NavBar></NavBar>
          <Routes>
            <Route path="/"  element={ <Cover />} />
            <Route path="/books" element={
              <>
                <Banner />
                <Books />
                
              </>
            } />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
