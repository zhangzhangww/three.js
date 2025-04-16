import { checker } from 'three/tsl'
import { createRouter, createWebHashHistory } from 'vue-router'



const routes = [
	{
		path: '/',
		component: () => import('../views/Layout.vue'), // 首页
		children:[
			{
				path: '',
				component: () => import('../views/Navigation.vue'), // 导航页
			},
			
			{
				path: '/box',
				name: 'box',
				component: () => import('../views/box.vue'),
			},
			{
				path: '/bac',
				name: 'bac',
				component: () => import('../views/bac.vue'),
			},
			{
				path: '/fog',
				name: 'fog',
				component: () => import('../views/fog.vue'),
			},
			{
				path: '/jiaohu',
				component: () => import('../views/jiaohu.vue'),
			},
			{
				path: '/bird',
				component: () => import('../views/bird.vue'),
			},
			{
				path: '/car',
				component: () => import('../views/car.vue'),
			},
		]
	
	},
	
	


]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})




export default router