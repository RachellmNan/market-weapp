import {Matrix} from './matrix'
import {Fence} from './fence'
class FenceGroup{
    spu
    skuList
    fences
    constructor(spu){
        this.spu = spu
        this.skuList = spu.sku_list
    }
    getDefaultSku(){
        let defaultSkuId = this.spu.default_sku_id
        if(!defaultSkuId){
            return
        }
        return this.skuList.find(sku=>sku.id === defaultSkuId)
    }
    changeCellStatusById(cellId,status){
        this.eachCell(cell=>{
            if(cell.id == cellId){
                cell.status = status
            }
        })
    }
    getSku(skuCode){
        let sku = this.spu.sku_list.find(s=>s.code.split('$')[1] === skuCode)
        return sku?sku:null
    }
    changeCellStatusByXY(x,y,status){
        this.fences[x].cells[y].status = status
    }
    initFences(){
        const matrix = this._createMatrix(this.skuList)
        let fences = []
        const AT = matrix.transpose()
        AT.forEach((r)=>{
            const fence = new Fence(r)
            fence.init() 
            if(this.hasSketchFence() && this.isSkectchFence(fence.id)){
                fence.setFenceSketch(this.skuList)
            }
            
            fences.push(fence)
        })
        this.fences = fences
        console.log('fences',this.fences)
    }
    hasSketchFence(){
        return this.spu.sketch_spec_id?true:false
    }
    isSkectchFence(fenceId){
        return this.spu.sketch_spec_id === fenceId
    }
    eachCell(cb){
        for(let i = 0 ;i <this.fences.length; i++){
            for(let j = 0 ; j <this.fences[i].cells.length ; j++){
                const cell = this.fences[i].cells[j]
                cb(cell,i,j)
            }
        }
    }
    eachRowCell(cb,index){
        for(let i = 0 ;i <this.fences.length; i++){
            if(index == i){
                for(let j = 0 ; j <this.fences[i].cells.length ; j++){
                    const cell = this.fences[i].cells[j]
                    cb(cell,i,j)
                }
            }
        }
    }
    _createMatrix(skuList){
        let m = []
        skuList.forEach(sku => {
            m.push(sku.specs)
        });
        return new Matrix(m)
    }
}

export {
    FenceGroup
} 