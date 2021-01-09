import {config} from '../config/config'
import {promiseic} from '../utils/util'
class Http{
    static request({url,method='GET',data={}}){
        // 方法一
        return new Promise((resolve,reject)=>{
            wx.request({
                url:config.baseUrl + url,
                data,
                method,
                header:{
                    "content-type":"application/json",
                    "appkey":config.appkey
                },
                success(res){
                    resolve(res.data)
                },
                fail:err=>{
                    reject(err)
                    console.log('fail请求失败')
                }
            })
        })
 
        // 方法二
        // let result = await promiseic(wx.request)({
        //     url:config.baseUrl + url,
        //     data,
        //     method,
        //     header:{
        //         "content-type":"application/json",
        //         "appkey":config.appkey
        //     }
        // })
        // console.log('resule',result)
        // return result
    }
}
export {
    Http
}