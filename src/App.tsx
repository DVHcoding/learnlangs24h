// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment, useEffect } from 'react';
import loadable from '@loadable/component';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import { adminRoute, protectedRoute, publicRoute } from './routes/routes';
import ProtectedRoute from '@components/ProtectedRoute/ProtectedRoute';
import RedirectToHome from '@components/ProtectedRoute/RedirectToHome';
import { useUserDetailsQuery } from '@store/api/userApi';
import DefaultLayout from '@layouts/DefaultLayout/DefaultLayout';
import AdminDefaultLayout from '@layouts/AdminDefaultLayout/AdminDefaultLayout';
import { SocketProvider } from '@utils/socket';

/* -------------------------------------------------------------------------- */
/*                                   MODULES                                  */
/* -------------------------------------------------------------------------- */
import '@components/Modules/Antd/Drawer.css';
import '@components/Modules/Antd/Progress.css';
import '@components/Modules/Antd/Collapse.css';
import DesktopNotification from '@components/Shared/DesktopNotification';

////////////////////////////////////////////////////////////////////////////////
const NotFound = loadable(() => import('@pages/NotFound/NotFound'));
const Loader = loadable(() => import('@pages/Loader/Loader'));
const Login = loadable(() => import('@features/Authentication/Login'), {
    fallback: <Loader />,
});
const Register = loadable(() => import('./features/Authentication/Register'), {
    fallback: <Loader />,
});
const ForgotPassword = loadable(() => import('./features/Authentication/ForgotPassword'), {
    fallback: <Loader />,
});

// ##################################

function App() {
    /* ########################################################################## */
    /*                               REACT ROUTE DOM                              */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                              STATE MANAGEMENT                              */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */
    const { data, isLoading } = useUserDetailsQuery();

    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */
    const themeLocal = localStorage.getItem('theme');
    const theme = themeLocal === 'false' ? 'light' : 'dark';

    /* ########################################################################## */
    /*                             FUNCTION MANAGEMENT                            */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                CUSTOM HOOKS                                */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  useEffect                                 */
    /* ########################################################################## */
    useEffect(() => {
        document.body.classList.add(theme);

        return () => {
            document.body.classList.remove(theme);
        };
    }, [theme]);

    return (
        <Router>
            <SocketProvider>
                <div className="App">
                    {/* Sử dụng để thông báo từ vựng */}
                    <DesktopNotification />

                    <Routes>
                        {/*#################################*/}
                        {/*#          PUBLIC ROUTE          */}
                        {/*#################################*/}
                        <Route path="*" element={<NotFound />} />

                        {publicRoute.map((route, index) => {
                            let Layout = DefaultLayout;

                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }

                            const Page = route.component;

                            return (
                                <Route
                                    path={route.path}
                                    key={index}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}

                        {/*############################################*/}
                        {/*#    REDIRECT TO HOME WHEN AUTHENTICATED    */}
                        {/*############################################*/}
                        <Route element={<RedirectToHome isAuthenticated={data?.success} isLoading={isLoading} />}>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/forgot" element={<ForgotPassword />} />
                        </Route>

                        {/*######################################*/}
                        {/*#    AUTHENTICATED PROTECTED ROUTE    */}
                        {/*######################################*/}
                        {protectedRoute.map((route, index) => {
                            let Layout = DefaultLayout;

                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }

                            const Page = route.component;

                            return (
                                <Route
                                    path={route.path}
                                    key={index}
                                    element={
                                        <ProtectedRoute isAuthenticated={data?.success} isLoading={isLoading}>
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        </ProtectedRoute>
                                    }
                                />
                            );
                        })}

                        {/*#################################*/}
                        {/*#          ADMIN ROUTE           */}
                        {/*#################################*/}
                        {adminRoute.map((route, index) => {
                            let Layout = AdminDefaultLayout;

                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }

                            const Page = route.component;

                            return (
                                <Route
                                    path={route.path}
                                    key={index}
                                    element={
                                        <ProtectedRoute
                                            isAuthenticated={data?.success}
                                            isLoading={isLoading}
                                            isAdmin={true}
                                            role={data?.user?.roles}
                                        >
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        </ProtectedRoute>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </div>
            </SocketProvider>
        </Router>
    );
}

export default App;
