import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import EventLayout from '../views/event/Layout.vue'
import EventDetails from '../views/event/Details.vue'
import EventEdit from '../views/event/Edit.vue'
import EventRegister from '../views/event/Register.vue'
import NotFound from '../views/NotFound.vue'
import NetworkError from '../views/NetworkError.vue'
import NProgress from 'nprogress'
import EventService from '../services/EventService'
import { usePiniaStore } from '../stores/PiniaStore'

// import PostsView from '../components/PostsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventListView,
      props: (route) => ({
        //If page exists parse the string, or return 1
        page: parseInt(route.query.page as string) || 1
      })
    },
    {
      path: '/about-us',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      ///Redirecting from old URL
      path: '/about',
      redirect: '/about-us'
    },
    {
      path: '/events/:id',
      name: 'event-layout',
      beforeEnter: (to) => {
        const store = usePiniaStore()
        const eventId = Number(to.params.id) 
        return EventService.getEvent(eventId)
          .then((response) => {
            store.setEvent(response.data)
          })
          .catch((error) => {
            console.log(error)
            if (error.response && error.response.status == 404) {
              return {
                name: '404Resource',
                params: { resource: 'event' }
              }
            } else {
              return { name: 'NetworkError' }
            }
            // })
          })
      },
      props: true,
      component: EventLayout,
      children: [
        {
          path: '',
          name: 'event-details',
          component: EventDetails
        },
        {
          path: 'register',
          name: 'event-register',
          component: EventRegister
        },
        {
          path: 'edit',
          name: 'event-edit',
          component: EventEdit,
          meta: { requireAuth: true }
        }
      ]
    },
    {
      path: '/event/:afterEvent(.*)',
      redirect: (to) => {
        return { path: '/events/' + to.params.afterEvent }
      }
    },
    {
      ///when page is not found
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound
    },
    {
      ///when resource is not found
      path: '/404/:resource',
      name: '404Resource',
      component: NotFound,
      props: true
    },
    {
      path: '/network-error',
      name: 'NetworkError',
      component: NetworkError
    },
    {
      path: '/clients',
      name: 'clients',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].ts) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "clients" */ '../views/ClientsView.vue')
    }
    // {
    //   path: '/posts',
    //   name: 'posts',
    //   component: PostsView
    // }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, from) => {
  const store = usePiniaStore()
  NProgress.start()

  const notAuthorized = true
  if (to.meta.requireAuth && notAuthorized) {
    store.updateMessage('Sorry, you are not authorized to view this page') 

    setTimeout(() => {
      store.updateMessage('') 
    }, 3000)

    if (from.fullPath) { // <--- If this navigation came from a previous page.
      return false
    } else {  // <--- Must be navigating directly
      return { path: '/' }  // <--- Push navigation to the root route.
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})
export default router
