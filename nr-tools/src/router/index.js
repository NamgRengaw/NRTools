import HomeView from '../views/HomeView.vue';
import { useAuthStore } from '@/stores/auth';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/password-recovery',
      name: 'password-recovery',
      component: () => import('@/views/PasswordRecoveryView.vue'),
    },
    {
      path: '/suport',
      name: 'suport',
      component: () => import('@/views/SuportView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue'),
    }
  ],
})

router.beforeEach((to, from, next) => {
    const store = useAuthStore();

    if(to.meta.requiresAuth && !store.isAuthenticated) {
      next('login');
    } else {
      next();
    }
});

export default router;
