import { createRouter, createWebHistory } from "vue-router";
import { nextTick } from "vue";

const Home = () => import('../views/Home.vue');
const Doctors = () => import('../views/Doctors.vue');
const Nurses = () => import('../views/Nurses.vue');
const CardiologyDepartment = () => import('../views/CardiologyDepartment.vue');
const SurgicalDepartment = () => import('../views/SurgicalDepartment.vue');

const defaultTitle = 'Medical Departments';

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: { title: defaultTitle }
    },
    {
        path: '/doctor',
        name: 'doctor',
        component: Doctors,
        meta: { title: 'Doctors' }
    },
    {
        path: '/nurse',
        name: 'nurse',
        component: Nurses,
        meta: { title: 'Nurses' }
    },
    {
        path: '/cardiology',
        name: 'cardiology',
        component: CardiologyDepartment,
        meta: { title: 'Cardiology Department' }
    },
    {
        path: '/surgical',
        name: 'surgical',
        component: SurgicalDepartment,
        meta: { title: 'Surgical Department' }

    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.afterEach(async (to, _) => {
    await nextTick(() => {
        const title = to.meta?.title as string | undefined;
        document.title = title || defaultTitle;
    });
});