import axios from 'axios'
const API_URL = 'http://localhost:3000'
const Author = 'Authors'
const Article = 'Articles'



let MyPlugin = {
    install(Vue) {
       Vue.prototype.$GetArticles = async function(Addon)
       {
            try
            {
                const response = await axios.get(`${API_URL}/${Article}${Addon??''}`)
                return response
            }
            catch(error)
            {
                return null
            }
       },
       Vue.prototype.$GetAuthors = async function(Addon)
       {
            try
            {
                const response = await axios.get(`${API_URL}/${Author}${Addon??''}`)
                return response
            }
            catch(error)
            {
                return null
            }
       },
       Vue.prototype.$UpdateArticle = async function(ID,ArticleObject)
       {
            try
            {
                const response = await axios.patch(`${API_URL}/${Article}/${ID}`,
                ArticleObject)
                return response
            }
            catch(error)
            {
                return null
            }
       },
       Vue.prototype.$CreateArticle = async function(ArticleObject)
       {
            try
            {
                const response = await axios.post(`${API_URL}/${Article}`,
                ArticleObject)
                return response
            }
            catch(error)
            {
                return null
            }
       }
       Vue.prototype.$DeleteArticle = async function(id)
       {
            try
            {
                const response = await axios.delete(`${API_URL}/${Article}/${id}`)
                return response
            }
            catch(error)
            {   
                return null
            }
       }
    }
  };
  
  export default MyPlugin