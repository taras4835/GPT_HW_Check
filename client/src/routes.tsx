//pages N/A
import AuthPage from './pages/nonauthpages/AuthPage'; // sigin signup page


//pages FOUNDER



interface IRoute {
    path: string;
    element: JSX.Element;
}

export const publicRoutes: IRoute[] = [
    {
        path: '/',
        element: <AuthPage />
    },

    {
        path: '/signin',
        element: <AuthPage />
    },
    {
        path: '/signup',
        element: <AuthPage />
    }
];

/*export const userRoutes: IRoute[] = [
    {
        path: '/',
        element: <HomePageUser />
    },
    {
        path: '/profile',
        element: <ProfilePageUser />
    }
];*/
