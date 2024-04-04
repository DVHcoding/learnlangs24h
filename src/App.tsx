// ##################################
// #       IMPORT Npm
// ##################################
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// ##################################
// #       IMPORT Components
// ##################################
import Loader from './pages/Loader/Loader';
import ProtectedRoute from '@components/ProtectedRoute/ProtectedRoute';
import { useUserDetailsQuery } from '@store/api/userApi';

// ##################################
const Login = lazy(() => import('./features/Authentication/Login'));
const Home = lazy(() => import('./components/Home/Home'));
const Register = lazy(() => import('./features/Authentication/Register'));
const Grammar = lazy(() => import('./components/Courses/Grammar'));

// ##################################
function App() {
    const { data, isLoading } = useUserDetailsQuery();

    return (
        <Router>
            <Suspense fallback={<Loader />}>
                <Routes>
                    {/* Public Route */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Protected Route */}
                    <Route
                        element={<ProtectedRoute isLogin={data?.success} isLoading={isLoading} />}
                    >
                        <Route path="/grammar" element={<Grammar />} />
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
