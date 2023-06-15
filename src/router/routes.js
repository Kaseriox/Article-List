import SingleArticle from '../views/SingleArticle.vue'
import PageNotFound from '../views/PageNotFound.vue'
import ArticlesPage from '../views/ArticlesPage.vue'
import MainPage from '../views/MainPage.vue'
export default [
    {path:'/',redirect:'/page/1'},
    {path:'/article/:id',component:SingleArticle},
    {path:'/page/:page',component:ArticlesPage},
    {path: "*", component: PageNotFound },
    
]