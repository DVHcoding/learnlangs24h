// ##########################
// #      IMPORT NPM        #
// ##########################
import { ComponentType } from 'react';
import loadable from '@loadable/component';

// ##########################
// #    IMPORT Components   #
// ##########################
const Home = loadable(() => import('@components/Home/Home'));
const Grammar = loadable(() => import('@components/Courses/Grammar/Grammar'));
const Profile = loadable(() => import('@components/Profile/Profile'));

/* -------------------------------------------------------------------------- */
/*                               ADMIN COMPONENT                              */
/* -------------------------------------------------------------------------- */
const Dashboard = loadable(() => import('@admin/AdminComponents/Dashboard'));
const CoursesList = loadable(() => import('@admin/AdminComponents/CoursesManager/CoursesList'));
const LessonTable = loadable(() => import('@admin/AdminComponents/CoursesManager/LessonTable'));
const UnitLesson = loadable(() => import('@admin/AdminComponents/CoursesManager/UnitLesson'));
const GrammarManagement = loadable(() => import('@admin/AdminComponents/CoursesManager/Grammar/Update/Grammar'));

interface PublicRouteType {
    path: string;
    component: ComponentType;
    layout?: React.FC | null;
}

interface ProtectedRouteType {
    path: string;
    component: ComponentType;
    layout?: React.FC | null;
}

/* -------------------------------------------------------------------------- */
/*                                PUBLIC ROUTE                                */
/* -------------------------------------------------------------------------- */
const publicRoute: PublicRouteType[] = [
    {
        path: '/',
        component: Home,
    },
];

/* -------------------------------------------------------------------------- */
/*                               PROTECTED ROUTE                              */
/* -------------------------------------------------------------------------- */
const protectedRoute: ProtectedRouteType[] = [
    {
        path: '/grammar/:id',
        component: Grammar,
    },
    {
        path: '/profile/:id',
        component: Profile,
    },
];

/* -------------------------------------------------------------------------- */
/*                                 ADMIN ROUTE                                */
/* -------------------------------------------------------------------------- */

const adminRoute: ProtectedRouteType[] = [
    {
        path: '/admin',
        component: Dashboard,
    },
    {
        path: '/admin/courses',
        component: CoursesList,
    },
    {
        path: '/admin/course/:id',
        component: LessonTable,
    },
    {
        path: '/admin/lesson/:id',
        component: UnitLesson,
    },
    {
        path: '/admin/unitlesson/:id',
        component: UnitLesson,
    },
    {
        path: '/admin/course/:id/edit/:unitId',
        component: GrammarManagement,
        layout: null,
    },
];

export { publicRoute, protectedRoute, adminRoute };
