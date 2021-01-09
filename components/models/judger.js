import { SkuCode } from "./sku-code";
import {CellStatus} from '../../core/enum'
import {SkuPending} from './sku-pending'
import {Joiner} from '../../utils/joiner'
class Judger{
    fenceGroup
    pathDict = []
    skuPending
    constructor(fenceGroup){
        this.fenceGroup = fenceGroup
        this._initPathDict()
        this._initSkuPending()
    }
    isSkuIntact(){
        return this.skuPending.isIntact()
    }
    _initSkuPending(){
        // 若请求结果中需要显示默认sku，则生成默认sku
        const specsLength = this.fenceGroup.fences.length
        this.skuPending = new SkuPending(specsLength)
        let defaultSku = this.fenceGroup.getDefaultSku()
        if(!defaultSku){
            return
        }
        this.skuPending.init(defaultSku)
        this._initSelectedCell()
        this.judge(null,null,null,true)
        console.log('SkuPending',this.skuPending)
    }
    // 初始化默认已选sku
    _initSelectedCell(){
        this.skuPending.pending.forEach(cell=>{
            this.fenceGroup.changeCellStatusById(cell.id,CellStatus.SELECTED)
        })
    }
    _initPathDict(){
        this.fenceGroup.spu.sku_list.forEach(s => {
            const skuCode = new SkuCode(s.code)
            this.pathDict = this.pathDict.concat(skuCode.totalSegments)
        });
        console.log('pathDict',this.pathDict)
    }
    judge(cell,x,y,isInit=false){
        if(!isInit){
            this._changeCurrentCellStatus(cell,x,y)
        }
        this.fenceGroup.eachCell((cell,x,y)=>{
            const path = this._findPotentialPath(cell,x,y)
            if(!path){
                return
            }
            const isIn = this._isInDict(path)
            if(isIn){
                this.fenceGroup.changeCellStatusByXY(x,y,CellStatus.WAITING)
                console.log('path',path,'cell',cell.title)
            }else{
                this.fenceGroup.changeCellStatusByXY(x,y,CellStatus.FORBIDDEN)
            }
            
        })
    }
    _isInDict(path){
        return this.pathDict.includes(path)
    }

    getDeterminateSku(){
        let code = this.skuPending.getSkuCode()
        let sku = this.fenceGroup.getSku(code)
        return sku
    }
    getCurrentValues(){
        return this.skuPending.getCurrentSpecValues()
    }
    getMissingKeys(){
        let missingKeysIndex = this.skuPending.getMissingSpecKeysIndex()
        return missingKeysIndex.map(i=>{
            return this.fenceGroup.fences[i].title
        })
    }
    _findPotentialPath(cell,x,y){
        const joiner = new Joiner('#')
        for(let i=0;i<this.fenceGroup.fences.length;i++){
            const selected = this.skuPending.findSelectedCellByX(i)
            // 当前行
            if(x===i){
                if(this.skuPending.isSelected(cell,x)){
                    console.log('当前被选中',cell.title)
                    return 
                }
                const cellCode = this._getCellCode(cell.spec)
                joiner.join(cellCode)
            }else{
                // 其他行
                if(selected){
                    const selectedCellCode = this._getCellCode(selected.spec)
                    joiner.join(selectedCellCode)
                }
            }
        }
        return joiner.getStr() 
    }
    _getCellCode(spec){
        return spec.key_id + '-' + spec.value_id
    }

    _changeCurrentCellStatus(cell,x,y){
        if(cell.status == CellStatus.WAITING){
            this.fenceGroup.changeCellStatusByXY(x,y,CellStatus.SELECTED) 
            this.skuPending.insertCell(cell,x)
        }else if(cell.status == CellStatus.SELECTED){
            this.fenceGroup.changeCellStatusByXY(x,y,CellStatus.WAITING)
            this.skuPending.removeCell(x)
        }
        
    }
}  
 
export {
    Judger
}