
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import Home from './Home'



function App(){
    return(
        <>
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
        </Routes>
        </BrowserRouter>
        </>
    )

}
export default App