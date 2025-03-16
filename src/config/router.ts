import { createWebHashHistory,createWebHistory, createRouter } from 'vue-router'
 
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
  { path: '/',meta:{title:"主页"}, component: Index },
  { path: '/team', meta:{title:"找队伍"},component: Team },
  { path: '/user', meta:{title:"个人信息"}, component: User },
  { path: '/user/update', meta:{title:"更新信息"}, component: UserUpdate },
  { path: '/user/edit', meta:{title:"编辑信息"}, component: UserEdit },
  { path: '/user/team/create', meta:{title:"我创建的队伍"}, component: UserTeamCreate },
  { path: '/user/team/join', meta:{title:"我加入的队伍"}, component: UserTeamJoin },
  { path: '/search', meta:{title:"搜索"}, component: SearchPage },
  { path: '/user/list', meta:{title:"用户列表"}, component: SearchResultPage },
  { path: '/user/login', meta:{title:"用户登录"}, component: UserLogin },
  { path: '/team/add', meta:{title:"创建队伍"}, component: TeamAdd },
  { path: '/team/update', meta:{title:"更新队伍"}, component: TeamUpdate },

]
console.log(routes);

 const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router