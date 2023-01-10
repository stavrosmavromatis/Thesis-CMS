import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const LabAccordion= () => import('@/components/UI/LabAccordion.vue');
const SubmittedLabList = () => import('@/components/UI/SubmitedLabList.vue');
const AddLab = () => import('@/components/UI/AddLab.vue');
const BaseSlider = () => import('@/components/Base/BaseSlider.vue');
const WelcomePage =() => import('@/components/UI/WelcomePage.vue');
const routes: Array<RouteRecordRaw> = [
  {
    path : "/",
    name : 'welcome',
    component : WelcomePage,
    props : false
  },
  {
    path : "/lab-list",
    name : 'labList',
    component : LabAccordion,
    props : true
  },
  {
    path : "/submitted-labs",
    name : 'submittedLabs',
    component : SubmittedLabList,
    props : true
  },
  {
    path : "/add-lab",
    name : 'addlab',
    component : AddLab,
    props : true
  },
  {
    path : "/poutsa",
    name : 'poutsa',
    component : BaseSlider,
    props : true
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes : routes
})

export default router
