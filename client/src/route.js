import { createBrowserRouter } from 'react-router-dom'
import Login from './features/Auth/Login'

// create react router
const router =  createBrowserRouter([
    {
        path : "/login",
        element : <Login />,
    }
])
export default router
