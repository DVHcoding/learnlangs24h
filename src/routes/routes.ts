// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { ComponentType } from 'react';
import loadable from '@loadable/component';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
const Home = loadable(() => import('@components/Home/Home'));
const Grammar = loadable(() => import('@components/Courses/Grammar/Grammar'));
const Listening = loadable(() => import('@components/Courses/Listening/Listening'));
const Profile = loadable(() => import('@components/Profile/Profile'));
const Gift = loadable(() => import('@components/Gift/Gift'));

/* -------------------------------------------------------------------------- */
/*                               ADMIN COMPONENT                              */
/* -------------------------------------------------------------------------- */
const Dashboard = loadable(() => import('@admin/components/Dashboard'));
const CoursesList = loadable(() => import('@admin/components/Courses/CoursesList'));
const LessonTable = loadable(() => import('@admin/components/Courses/LessonTable'));
const UnitLesson = loadable(() => import('@admin/components/Courses/UnitLesson'));
const Messenger = loadable(() => import('@components/Messenger/Messenger'));
const WriteVocaExercise = loadable(() => import('@components/Courses/Listening/WriteVocaExercise/WriteVocaExercise'));
const WriteSentenceExercise = loadable(() => import('@components/Courses/Listening/WriteSentenceExercise/WriteSentenceExercise'));
const Quiz = loadable(() => import('@components/Courses/Listening/Quiz/Quiz'));

const CoursesEditable = loadable(() => import('@admin/components/Courses/CoursesEditable/CoursesEditable'));

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
        path: '/listening/:id',
        component: Listening,
    },
    {
        path: '/listening/:id/write',
        component: WriteVocaExercise,
    },
    {
        path: '/listening/:id/write/sentence',
        component: WriteSentenceExercise,
    },
    {
        path: '/listening/:id/quiz',
        component: Quiz,
    },
    {
        path: '/profile/:nickname',
        component: Profile,
    },
    {
        path: '/gift',
        component: Gift,
    },
    {
        path: '/messages/:chatId',
        component: Messenger,
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
        component: CoursesEditable,
        layout: null,
    },
];

export { publicRoute, protectedRoute, adminRoute };
