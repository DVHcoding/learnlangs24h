// ##################################
// #       IMPORT Npm
// ##################################
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useEffect, useState } from 'react';

// ##################################
// #       IMPORT Components
// ##################################
import Loader from './pages/Loader/Loader';
import NotFound from '@pages/NotFound/NotFound';
import ProtectedRoute from '@components/ProtectedRoute/ProtectedRoute';
import { useUserDetailsQuery } from '@store/api/userApi';

// ##################################
const Login = lazy(() => import('./features/Authentication/Login'));
const Home = lazy(() => import('./components/Home/Home'));
const Register = lazy(() => import('./features/Authentication/Register'));
const ForgotPassword = lazy(() => import('./features/Authentication/ForgotPassword'));
const Grammar = lazy(() => import('./components/Courses/Grammar/Grammar'));

// ##################################
type Theme = 'light' | 'dark';

function App() {
    const { data, isLoading } = useUserDetailsQuery();

    const [theme, setTheme] = useState<Theme>(() => {
        const themeLocal = localStorage.getItem('theme');

        let themeBoolean: Theme = 'light';

        if (themeLocal === 'false') {
            themeBoolean = 'light';
        } else if (themeLocal === 'true') {
            themeBoolean = 'dark';
        }

        return themeBoolean;
    });

    /* The function that is handle change theme when click on toggle*/
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        document.body.classList.add(theme);

        return () => {
            document.body.classList.remove(theme);
        };
    }, [theme]);

    return (
        <Router>
            <Suspense fallback={<Loader />}>
                <Routes>
                    {/* Public Route */}
                    <Route path="*" element={<NotFound />} />
                    <Route path="/" element={<Home toggleTheme={toggleTheme} />} />
                    <Route
                        path="/login"
                        element={<Login isAuthenticated={data?.success} isLoading={isLoading} />}
                    />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot" element={<ForgotPassword />} />

                    {/* Protected Route */}
                    <Route
                        element={
                            <ProtectedRoute isAuthenticated={data?.success} isLoading={isLoading} />
                        }
                    >
                        <Route path="/grammar" element={<Grammar toggleTheme={toggleTheme} />} />
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
