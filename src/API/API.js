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




export async function CreateAuthor(AuthorObject)
{
    try
    {
        let response;
        response = await axios.post(`${API_URL}/${Author}`,
        AuthorObject)

        return response
    }
    catch(error)
    {
        return ErrorHandling(error)
    }
}

export async function GetAuthors(Addon)
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
}

export async function UpdateAuthor(ID)
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
}
export async function CreateArticle(ArticleObject)
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

export async function GetArticles(Addon)
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
    
}

export async function UpdateArticle(ID,ArticleObject)
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
}
export async function DeleteArticle(ID)
{
    try
    {
        let response;
        response = await axios.delete(`${API_URL}/${Article}/${ID}`)
        return response
    }
    catch(error)
    {
        return ErrorHandling(error)
    }
}
