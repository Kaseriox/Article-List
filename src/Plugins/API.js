import axios from 'axios'
const API_URL = 'http://localhost:3000'
const Author = 'Authors'
const Article = 'Articles'

export function ErrorHandling(error) {
    if (error.response) {
      return error.response.status;
    }
    if (error.request) {
      return "Server Not Responding";
    } else {
      return "Unexpected error";
    }
}

let MyPlugin = {
    install(Vue,options) {
       Vue.prototype.$GetArticles = async function(Addon)
       {
            try
            {
                let response;
                if(Addon === undefined)
                {
                    response = await axios.get(`${API_URL}/${Article}`)
                }
                else
                {
                    response = await axios.get(`${API_URL}/${Article}${Addon}`)
                }
                return response
            }
            catch(error)
            {
                return ErrorHandling(error)
            }
       },
       Vue.prototype.$GetAuthors = async function(Addon)
       {
            try
            {
                let response;
                if(Addon === undefined)
                {
                    response = await axios.get(`${API_URL}/${Author}`)
                }
                else
                {
                    response = await axios.get(`${API_URL}/${Author}${Addon}`)
                }
                return response
            }
            catch(error)
            {
                return ErrorHandling(error)
            }
       },
       Vue.prototype.$UpdateArticle = async function(ID,ArticleObject)
       {
            try
            {
                let response;
                response = await axios.patch(`${API_URL}/${Article}/${ID}`,
                ArticleObject)
                return response
            }
            catch(error)
            {
                return ErrorHandling(error)
            }
       },
       Vue.prototype.$UpdateAuthor = async function(ID)
       {
            try
            {
                let response;
                response = await axios.patch(`${API_URL}/${Author}/${ID}`)
                return response
            }
            catch(error)
            {
                return ErrorHandling(error)
            }
       },
       Vue.prototype.$CreateArticle = async function(ArticleObject)
       {
            try
            {
                let response;
                response = await axios.post(`${API_URL}/${Article}`,
                ArticleObject)
        
                return response
            }
            catch(error)
            {
                return ErrorHandling(error)
            }
       }
       Vue.prototype.$DeleteArticle = async function(id)
       {
            try
            {
                let response;
                response = await axios.delete(`${API_URL}/${Article}/${id}`)
                return response
            }
            catch(error)
            {   
                return ErrorHandling(error)
            }
       }
    }
  };
  
  export default MyPlugin