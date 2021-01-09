import { Http } from "../utils/http"

class Search{
    static getContent(keyword){
        return Http.request({
            url:`/v1/search?q=${keyword}`
        })
    }
}
export {
    Search
}