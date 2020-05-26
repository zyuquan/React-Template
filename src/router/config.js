import BasicLayout from '@views/Layout/BasicLayout';
import MenuLayout from '@views/Layout/MenuLayout';
import Tast from '@views/Tast';
import Login from '@views/Login';
import About from '@views/About';
import Home from '@views/Home';


const menus = [ // 菜单
    {
        path: '/home',
        exact: true,
        component: Home
    },
    {
        path: '/about',
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
        exact: true,
        component: Login,
    },
    {
        path: '/',
        exact: true,
        redirect: '/login'
    },
    {
        component: MenuLayout,
        datas: menus,
        children: [
            ...menus
        ]
    },
    
]

export default routes;