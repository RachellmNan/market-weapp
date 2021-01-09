import {Cell} from './cell'
class Fence{
    cells = []
    specs
    title
    id
    constructor(specs){
        this.specs = specs
        this.title = specs[0].key
        this.id = specs[0].key_id
    }

    init(){
        this.specs.forEach(s => {
            const cell = new Cell(s)
            if(!this.deduct(this.cells,cell.title)){
                this.cells.push(cell)
            }
        });
    }
    deduct(arr,arg){
        return arr.find(val=>{
            return val.title === arg
        })
    }
    setFenceSketch(skuList){
        this.cells.forEach(cell=>{
            this._setCellSkuImg(cell,skuList)
        })
    }
    _setCellSkuImg(cell,skuList){
        const specCode = cell.getCode()
        let matchedSku = skuList.find(v=>v.code.includes(specCode))
        if(matchedSku){
            cell.skuImg = matchedSku.img
        }
    }
}

export {
    Fence
}