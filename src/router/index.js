import Vue from 'vue'
import VueRouter from 'vue-router'
import Story from '../views/Story.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Story',
    component: Story
  },
]

const router = new VueRouter({
  routes
})

export default router
