// pages/detail/detail.js
import { explain } from '../../model/explain'
import {Spu} from '../../model/spu'
import { getHeight } from '../../utils/util'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        Spus:{},
        showRealm:false,
        SwiperImgList:[],
        title:'',
        subtitle:'',
        price:'',
        disPrice:'',
        tags:'',
        Height:0,
        imgList:[]
    },
    async onLoad(options) {
        let id = options.pid
        let Spus = await Spu.getDetail(id)
        let explainList = await explain.getExplain()
        let Height = await getHeight(100)
        this.setData({
            Spus,
            SwiperImgList:Spus.spu_img_list,
            title:Spus.title,
            subtitle:Spus.subtitle,
            tags:Spus.tags.split('$'),
            price:Spus.price,
            disPrice:Spus.discount_price,
            explainList,
            Height,
            imgList:Spus.spu_detail_img_list
        })
    },
    add(){
        this.openRealm()
    },
    buy(){
        this.openRealm()
    },
    closeRealm(){
        this.setData({
            showRealm:false
        })
    },
    openRealm(){
        this.setData({
            showRealm:true
        })
    },
    onShareAppMessage(){

    }
})