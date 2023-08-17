const { Op } = require('sequelize')
function FilterObject(object,array)
{
    return Object.keys(object)
    .filter(key => !array.includes(key))
    .reduce((obj, key) => {
        obj[key] = object[key];
        return obj;
  }, {});
}
function ParseQuery(param)
{
    const paramfilter = ['page','limit','expand']
    let offset = 0
    let limit = (parseInt(param.limit) > 0 && parseInt(param.limit))  || 10
    if(param.page)
    {
        offset = (parseInt(param.page)-1) * limit
        if(offset < 0){offset = 0}
    }
    let Options = {
        offset:offset,
        limit:limit,
        ...(param.expand) && {include:param.expand},
    } 
    const filteredObject = FilterObject(param,paramfilter)
    if((Object.keys(filteredObject).length > 0))
    {
        const arr = []
        Object.keys(filteredObject).map(key =>{
            arr.push({
                [key]:{
                    [Op.like]:`%${filteredObject[key]}%`
                }
            })
        })
        Options = {...Options,
            where:{[Op.and]:arr}
        }
    }
    console.log(Options)
    return Options
}

module.exports = ParseQuery