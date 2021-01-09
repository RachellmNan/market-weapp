import {Http} from '../utils/http'
class explain{
    static getExplain(){
        return Http.request({
            url:`/v1/sale_explain/fixed`
        })
    }
}
export {
    explain
}