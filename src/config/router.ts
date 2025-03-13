import { createWebHashHistory, createRouter } from 'vue-router'
 
const Index= () => import('../pages/Index.vue')
const Team = () => import('../pages/Team.vue')
const User = () => import('../pages/User.vue')
const UserUpdate = () => import('../pages/UserUpdate.vue')
const UserTeamCreate = () => import('../pages/UserTeamCreate.vue')
const UserTeamJoin = () => import('../pages/UserTeamJoin.vue')
const SearchPage = () => import('../pages/SearchPage.vue')
const UserEdit = () => import('../pages/UserEdit.vue')
const SearchResultPage = () => import('../pages/SearchResultPage.vue')
const UserLogin = () => import('../pages/UserLogin.vue')
const TeamAdd = () => import('../pages/TeamAdd.vue')
const TeamUpdate = () => import('../pages/TeamUpdate.vue')


const routes = [
  { path: '/', component: Index },
  { path: '/team', component: Team },
  { path: '/user', component: User },
  { path: '/user/update', component: UserUpdate },
  { path: '/user/edit', component: UserEdit },
  { path: '/user/team/create', component: UserTeamCreate },
  { path: '/user/team/join', component: UserTeamJoin },
  { path: '/search', component: SearchPage },
  { path: '/user/list', component: SearchResultPage },
  { path: '/user/login', component: UserLogin },
  { path: '/team/add', component: TeamAdd },
  { path: '/team/update', component: TeamUpdate },

]
console.log(routes);

 const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router