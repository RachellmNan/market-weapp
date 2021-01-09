import {Http} from '../utils/http'
class Activity{
    static locationD = 'a-2'
    static getHomeLocationD(){
        return Http.request({
            url:`/v1/activity/name/${this.locationD}`
        })
    }
}
export {
    Activity
}