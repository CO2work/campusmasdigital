
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'p', component: () => import('pages/Index.vue'),
        children: [
          { path: '*', component: () => import('pages/Index.vue') }
        ]
      },
      { path: 'index-tarjetas', component: () => import('pages/IndexTarjetas.vue') },
      { path: 'imagen', component: () => import('pages/Index.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
