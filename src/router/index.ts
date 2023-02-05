
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { store }from '@/store/index';
import { login_redirect_url } from '@/config';
import {useAuth} from '@/composables/useAuth.composable'
const LabAccordion= () => import('@/components/UI/LabAccordion.vue');
const SubmittedLabList = () => import('@/components/UI/SubmitedLabList.vue');
const AddLab = () => import('@/components/UI/AddLab.vue');
const WelcomePage = () => import('@/components/UI/WelcomePage.vue');
const {SetNotAuthenticated} = useAuth();
const routes: Array<RouteRecordRaw> = [
  {
    path : "/",
    name : 'welcome',
    component : WelcomePage,
    props : false,
    meta:{requiresAuth :false}
  },
  {
    path : "/sign-in",
    name : 'sign-in',
    redirect: (to)=> window.location.href = login_redirect_url,
    meta : {requiresAuth :false}
  },
  {
    path : "/auth",
    name : 'auth',
    props:false,
    component : () => import("@/components/Auth/Auth.vue"),
    meta : {requiresAuth :false}
  },
  {
    path:"/red",
    name:"red",
    redirect: (to) => window.location.href = login_redirect_url
  },
  {
    path : "/lab-list",
    name : 'labList',
    component : LabAccordion,
    props : true,
    meta : {requiresAuth :true}
  },
  {
    path : "/submitted-labs",
    name : 'submittedLabs',
    component : SubmittedLabList,
    props : true,
    meta : {requiresAuth :true}
  },
  {
    path : "/add-lab",
    name : 'addlab',
    component : AddLab,
    props : true,
    meta : {requiresAuth :true,requiresIsTeacher : true}
  },
  {
    path : "/poutsa",
    name : 'poutsa',
    component : import('@/components/UI/TeacherSelect.vue'),
    props : true,
    meta : {requiresAuth :false}
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes : routes
});

router.beforeEach(async (to,_,next) => {

  const storeIsAuth = store.getters.IsAuth;
  if(to.meta.requiresAuth === false && storeIsAuth == false){
    next();
    return;
  }
  if(to.meta.requiresAuth === false && storeIsAuth == true){
    SetNotAuthenticated();
    next();
    return;
  }
  if(to.meta.requiresAuth === true && storeIsAuth === true)
  {
    next();
    return;
  }
  if(to.meta.requiresAuth === true && storeIsAuth === false)
  {
    next({name:'red'});
    return;
  }
  next(false);
  return;
});

export default router;
