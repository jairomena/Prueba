
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css'

import ShowClientes from './components/ShowClientes'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import AddCliente from './components/AddCliente'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {


  return (
    
       <div>
        <BrowserRouter>
          <HeaderComponent/>
          <div className='container'>
            <Routes>
              <Route exact path='/' element={<ShowClientes />}></Route>
              <Route path='/clientes' element={<ShowClientes />}></Route>
              <Route path='/add-cliente' element={<AddCliente />}></Route>
              <Route path='/edit-cliente/:id' element={<AddCliente />}></Route>
            </Routes>
          </div>
          <FooterComponent/>
        </BrowserRouter>
       
        
      
       </div>
  )
}

export default App
