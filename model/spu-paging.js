
import {Paging} from '../utils/paging'
class SpuPaging{
    static async getLatestPaging(){
        return new Paging({
            url:'/v1/spu/latest'
        }, 5)
    }
}

export {SpuPaging}