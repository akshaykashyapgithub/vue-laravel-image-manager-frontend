import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "./DefaultLayout.vue";
import Home from "./pages/Home.vue";
import Login from "./pages/Login.vue";
import Signup from "./pages/Signup.vue";
import MyImages from "./pages/Myimages.vue";
import NotFound from "./pages/NotFound.vue";
import  useUserStore  from "../store/user.js";


const routes =[
    {
        path: "/",
        component: DefaultLayout,
        children:[
            {   path: '/',
                name:'Home', 
                component : Home
            },
            { 
                path: '/myimages', 
                name: 'MyImages', 
                component: MyImages
            }
        ],
        beforeEnter: async (to, from, next) => {
            try {
                const userStore = useUserStore();
                await userStore.fetchUser();
                next();
              } catch (error) {
                next(false); // Cancel navigation if data fetching fails
              }
        }   
    },
    {
        path:'/login',
        name: 'Login',
        component: Login,
        beforeEnter: async (to, from, next) => {
            const userStore = useUserStore();
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    await userStore.fetchUser();
                    // If user is authenticated, redirect to home
                    next({ name: 'Home' });
                } catch (error) {
                    // Token is invalid, allow access to login
                    localStorage.removeItem('token');
                    next();
                }
            } else {
                next();
            }
        }
    },
    { 
        path:'/signup',
        name: 'Signup',
        component: Signup,
        beforeEnter: async (to, from, next) => {
            const userStore = useUserStore();
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    await userStore.fetchUser();
                    next({ name: 'Home' });
                } catch (error) {
                    localStorage.removeItem('token');
                    next();
                }
            } else {
                next();
            }
        }  
        
    },
    {
        path:'/:pathMatch(.*)',
        name: 'NotFound',
        component: NotFound   
    }
];

const router = createRouter({   
    history:createWebHistory(),
    routes
})

router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore();
    if (!userStore.user && localStorage.getItem('token')) {
        try {
            await userStore.initializeAuth();
        } catch (error) {
            localStorage.removeItem('token');
        }
    }
    next();
});

export default router