import {Http} from '../utils/http'

class Banner{
    static locationB = 'b-1'
    static locationG = 'b-2'
    static getHomeLocationB(){
        return Http.request({
            url:`/v1/banner/name/${this.locationB}`
        })
    }
    static getHomeLocationG(){
        return Http.request({
            url:`/v1/banner/name/${this.locationG}`
        })
    }
}

export {Banner}