import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index.js'
import LoginView from '../views/LoginView.vue'
import LogoutView from '../views/LogoutView.vue'
import SignupView from '../views/SignupView.vue'
import VocabView from '../views/VocabView.vue'
import MeaningView from '../views/MeaningView.vue'
import PracticeView from '../views/PracticeView.vue'
import NewWord from '../views/NewWord.vue'
const routes = [
  {
    path: '/',
    redirect: { name: 'login' }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      redirectIfAuth: true
    }
  },
  {
    path: '/logout',
    name: 'logout',
    component: LogoutView,
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView,
    meta: {
      redirectIfAuth: true
    }
  },
  {
    path: '/learn',
    name: 'learn',
    redirect: { name: 'vocab' },
    meta: {
      needAuth: true
    },

  },
  {
    path: '/learn/vocab',
    name: 'vocab',
    component: VocabView,
    meta: {
      needAuth: true
    }
  },
  {
    path: '/learn/vocab/:id',
    name: 'vocab-page',
    component: MeaningView,
    props: true,
    meta: {
      needAuth: true
    },
  },
  {
    path: '/learn/vocab/practice',
    name: 'practice',
    component: PracticeView,
    meta: {
      needAuth: true
    },
  },
  {
    path: '/learn/vocab/add',
    name: 'addWord',
    component: NewWord,
    meta: {
      needAuth: true
    },
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, _, next) => {

  const userAuth = store.getters.getAuthStatus;
  if (to.meta.needAuth && !userAuth) {
    next({ name: 'login' })
  }
  else if (to.meta.redirectIfAuth && userAuth) {
    next({ name: 'vocab' })
  }
  else {
    next()
  }

})

export default router
