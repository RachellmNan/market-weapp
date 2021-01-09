import { Http } from "../utils/http"

class HotSearch{
    static getHotWords(){
        return  Http.request({
            url:'/v1/tag/type/1'
        })
    }
}

export {
    HotSearch
}