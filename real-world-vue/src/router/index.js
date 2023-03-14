import { createRouter, createWebHistory } from 'vue-router'
import EventListVue from '../views/EventListView.vue'
import EventDetailsVue from '../views/EventDetailsView.vue'
// import PostsView from '../components/PostsView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventListVue
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/event/:id',
      name: 'event-details',
      props:true,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: EventDetailsVue
    },
    {
      path: '/clients',
      name: 'clients',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ClientsView.vue')
    },
    // {
    //   path: '/posts',
    //   name: 'posts',
    //   component: PostsView
    // }
  ]
})

export default router
