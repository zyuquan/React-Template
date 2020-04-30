import BasicLayout from '@views/Layout/BasicLayout';
import MenuLayout from '@views/Layout/MenuLayout';
import Tast from '@views/Tast';
import Login from '@views/Login';
import About from '@views/About';
import Home from '@views/Home';


const menus = [ // 菜单
    {
        path: '/component/home',
        exact: true,
        component: Home
    },
    {
        path: '/component/about',
        exact: true,
        component: About
    }
]

const routes = [
    { // 测试
        path: '/tast',
        exact: true,
        component: Tast
    },
    {
        path: '/login',
        component: BasicLayout,
        children: [
            {
                path: '/login',
                exact: true,
                component: Login,
            }
        ]
    },
    {
        path: '/register',
        component: BasicLayout,
        children: [
            {
                path: '/register',
                exact: true,
                component: Login,
            }
        ]
    },
    
    {
        path: '/component',
        component: MenuLayout,
        datas: menus,
        children: [
            ...menus
        ]
    },
    {
        path: '/',
        redirect: '/login'
    },
]

export default routes;