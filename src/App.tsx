// ##################################
// #       IMPORT Npm
// ##################################
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// ##################################
// #       IMPORT Components
// ##################################
import Loader from './pages/Loader/Loader';
const Login = lazy(() => import('./features/Authentication/Login'));
const Home = lazy(() => import('./components/Home/Home'));
const Register = lazy(() => import('./features/Authentication/Register'));

// ##################################
function App() {
    return (
        <Router>
            <Suspense fallback={<Loader />}>
                <Routes>
                    {/* Public Route */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Protected Route */}
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
