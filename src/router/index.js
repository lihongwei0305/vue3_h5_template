import {createRouter, createWebHistory} from 'vue-router'
import Login from '@/view/login/login'
import Home from '@/view/home/home'
import My from '@/view/my/index'
import Backlog from "@/view/backlog/backlog";
import FinishedLog from "@/view/finishedLog/finishedLog";
import ReimbsLog from "@/view/reimbsLog/reimbsLog";
import NotFound from '@/view/notFound';

//my
import PersonInfo from "@/view/my/personInfo";
import AccessoryClamp from '@/view/my/accessoryClamp'


const routes = [
    {path: '/', redirect: '/home'},
    {path: "/login", name: 'login', component: Login},
    {
        path: '/home', name: 'home', component: Home, redirect: '/backlog', children: [
            {path: "/backlog", name: 'backlog', component: Backlog, meta: {isLayout: true, level: 1}},
            {path: '/my', name: 'my', component: My, meta: {isLayout: true, level: 1}},
            {path: "/personInfo", name: 'personInfo', component: PersonInfo, level: 2},
            {path: "/accessoryClamp", name: 'accessoryClamp', component: AccessoryClamp, meta: {level: 2}},
            {path: "/finishedLog", name: 'finishedLog', component: FinishedLog, meta: {isLayout: true, level: 1}},
            {path: "/reimbsLog", name: 'reimbsLog', component: ReimbsLog, meta: {isLayout: true, level: 1}},
        ]
    },

    {path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound},
]
const router = createRouter({
    history: createWebHistory('/'),
    routes,
})


export default router