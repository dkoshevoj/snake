import { createRouter, createWebHistory } from 'vue-router';

const Home = () => import('@/views/HomeView');
const Game = () => import('@/views/PlayGame');
const PageNotFound = () => import('@/views/PageNotFound');

const routes = [
	{
		path: '/game',
		name: 'PlayGame',
		component: Game,
	},
	{
		path: '/',
		name: 'HomeView',
		component: Home,
	},
	{
		path: '/:pathMatch(.*)*',
		component: PageNotFound,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	scrollBehavior: () => ({ y: 0 }),
	routes,
});

export default router;
