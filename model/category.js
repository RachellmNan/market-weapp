import {Http} from '../utils/http'

class Category{
    static getGridCategoryC(){
        return Http.request({
            url:'/v1/category/grid/all'
        })
    }
    static getCategoryAll(){
        return Http.request({
            url:'/v1/category/all'
        })
    }
}

export {Category}