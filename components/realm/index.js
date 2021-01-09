// components/realm/index.js
import { Spu } from '../../model/spu'
import { Cell } from '../models/cell'
import {FenceGroup} from '../models/fence-group'
import {Judger} from '../models/judger'
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        spu:{
            type:Object,
            value:{}
        }
    },

    /**
     * 组件的初始数据
     */
    observers:{
        'spu':function(spu){
            if(JSON.stringify(spu)=='{}'){
                return 
            }
            // 没有规格
            if(Spu.isNoSpec(spu)){
                this.processNoSpec(spu)
            }else{
            // 有规格
                this.processHasSpec(spu)
            }
            
        }
    },
    data: {
        fences:[],
        judger:null,
        fenceGroup:null,
        previewImg:null,
        title:null,
        stock:null,
        noSpec:false,
        OverStocks:false,
        SelectedCount:1
    },

    /**
     * 组件的方法列表
     */
    methods: {
        processNoSpec(spu){
            this.setData({
                noSpec:true
            })
            this.bindSkuData(spu.sku_list[0])
        },
        processHasSpec(spu){
            let fenceGroup = new FenceGroup(spu)
            fenceGroup.initFences()
            const judger = new Judger(fenceGroup)
            this.setData({
                judger,
                fenceGroup
            })
            let defaultSku = fenceGroup.getDefaultSku()
            if(defaultSku){
                this.bindSkuData(defaultSku)
            }else{
                this.bindSpuData()
            }
            this.bindTipData()
            this.bindFenceGroupData(fenceGroup)
        },
        bindSpuData(){
            const spu = this.properties.spu
            this.setData({
                previewImg:spu.img,
                title:spu.title,
                price:spu.price,
                discount_price:spu.discount_price
            })
        },
        bindSkuData(Sku){
            this.setData({
                previewImg:Sku.img,
                title:Sku.title,
                price:Sku.price,
                discount_price:Sku.discount_price,
                stock:Sku.stock
            })
            this.changePurchaseStatus(this.data.SelectedCount)
        },
        bindTipData(){
            this.setData({
                skuIntact:this.data.judger.isSkuIntact(),
                currentValues:this.data.judger.getCurrentValues(),
                missingKeys:this.data.judger.getMissingKeys()
            })
        },
        bindFenceGroupData(fenceGroup){
            this.setData({
                fences:fenceGroup.fences
            })
        },
        onCellTap(event){
            let x = event.detail.x
            let y = event.detail.y
            let cell = new Cell(event.detail.cell.spec)
            cell.status = event.detail.cell.status
            let judger = this.data.judger
            // 判断cell的状态，重新更改状态
            judger.judge(cell,x,y)
            let skuIntact = judger.isSkuIntact()
            if(skuIntact){
                let currentSku = judger.getDeterminateSku()
                this.bindSkuData(currentSku)
            }
            this.bindTipData()
            this.bindFenceGroupData(judger.fenceGroup)
        },
        getPurchaseStatus(event){
            this.setData({
                SelectedCount:event.detail.count
            })
            this.changePurchaseStatus(this.data.SelectedCount)
        },
        changePurchaseStatus(count){
            if(this.data.stock >= count){
                this.setData({
                    OverStocks:false
                })
            }else{
                this.setData({
                    OverStocks:true
                })
            }
        },
        addCart(){
            this.closeRealm()
        },
        buy(){
            this.closeRealm()
        },
        closeRealm(){
            this.triggerEvent('closeRealm')
        }
    }
})
