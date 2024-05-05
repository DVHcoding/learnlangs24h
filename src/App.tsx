// ##################################
// #       IMPORT Npm
// ##################################
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useEffect, useState, useCallback } from 'react';

// ##################################
// #       IMPORT Components
// ##################################
import ProtectedRoute from '@components/ProtectedRoute/ProtectedRoute';
import RedirectToHome from '@components/ProtectedRoute/RedirectToHome';
import { useUserDetailsQuery } from '@store/api/userApi';

// ##################################
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));
const Loader = lazy(() => import('./pages/Loader/Loader'));
const Login = lazy(() => import('./features/Authentication/Login'));
const Home = lazy(() => import('./components/Home/Home'));
const Register = lazy(() => import('./features/Authentication/Register'));
const ForgotPassword = lazy(() => import('./features/Authentication/ForgotPassword'));
const Grammar = lazy(() => import('./components/Courses/Grammar/Grammar'));
const Profile = lazy(() => import('./components/Profile/Profile'));

// Admin Components
const Dashboard = lazy(() => import('@admin/AdminComponents/Dashboard'));
const CoursesList = lazy(() => import('@admin/AdminComponents/CoursesManager/CoursesList'));
const LessonTable = lazy(() => import('@admin/AdminComponents/CoursesManager/LessonTable'));
const UnitLesson = lazy(() => import('@admin/AdminComponents/CoursesManager/UnitLesson'));
const GrammarManagement = lazy(() => import('@admin/AdminComponents/CoursesManager/Grammar/Grammar'));

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
    const toggleTheme = useCallback(() => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    }, []);

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
                    {/*#################################
                       #          PUBLIC ROUTE         #
                       #################################*/}
                    <Route path="*" element={<NotFound />} />
                    <Route path="/" element={<Home toggleTheme={toggleTheme} />} />

                    {/*#######################################
                       # REDIRECT TO HOME WHEN AUTHENTICATED #
                       #######################################*/}
                    <Route element={<RedirectToHome isAuthenticated={data?.success} isLoading={isLoading} />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/forgot" element={<ForgotPassword />} />
                    </Route>

                    {/*#################################
                       # AUTHENTICATED PROTECTED ROUTE #
                       #################################*/}
                    <Route element={<ProtectedRoute isAuthenticated={data?.success} isLoading={isLoading} />}>
                        <Route path="/grammar/:id" element={<Grammar toggleTheme={toggleTheme} />} />
                        <Route path="/profile/:id" element={<Profile toggleTheme={toggleTheme} />} />
                    </Route>

                    {/*#################################
                       #          ADMIN ROUTE          #
                       #################################*/}
                    <Route
                        element={
                            <ProtectedRoute isAuthenticated={data?.success} isLoading={isLoading} isAdmin={true} role={data?.user?.roles} />
                        }
                    >
                        <Route path="/admin" element={<Dashboard toggleTheme={toggleTheme} />} />
                        <Route path="/admin/courses" element={<CoursesList toggleTheme={toggleTheme} />} />
                        <Route path="/admin/course/:id" element={<LessonTable toggleTheme={toggleTheme} />} />
                        <Route path="/admin/lesson/:id" element={<UnitLesson toggleTheme={toggleTheme} />} />
                        <Route path="/admin/unitlesson/:id" element={<UnitLesson toggleTheme={toggleTheme} />} />
                        <Route path="/admin/courses/grammar" element={<GrammarManagement />} />
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
