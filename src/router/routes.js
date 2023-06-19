import SingleArticle from '../views/SingleArticle.vue'
import PageNotFound from '../views/PageNotFound.vue'
import ArticlesPage from '../views/ArticlesPage.vue'

export default [
    {path:'/article/:id',component:SingleArticle},
    {path:'/',component:ArticlesPage},
    {path: "*", component: PageNotFound },
    
]