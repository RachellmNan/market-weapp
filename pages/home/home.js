// pages/home/home.js
import {Theme} from '../../model/theme'
import {Banner} from '../../model/banner'
import {Category} from '../../model/category'
import {Activity} from '../../model/activity'
import { SpuPaging } from '../../model/spu-paging'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        themeA:null,
        themeE:null,
        bannerB:null,
        themeF:null,
        themeH:null,
        gridC:[],
        activityD:{},
        waterFlow:[],
        spuPaging:null,
        moreData:true
    },

    async onLoad(options) {
        this.initAllData()
        await this.initBottomSpuList()
    },
    async initBottomSpuList(){
        this.data.spuPaging = await SpuPaging.getLatestPaging()
        const data = await this.data.spuPaging.getMoreData()
        this.setData({
            waterFlow:data.items
        })
        // wx.lin.renderWaterFlow(this.data.waterFlow, false )
    },
    async onReachBottom(){
        console.log('到底了 ')
        let data = await this.data.spuPaging.getMoreData()
        if(!data){
            return
        }
        this.setData({
            waterFlow:data.accumulator,
            moreData:data.moreData
        })
    },
    async initAllData(){
        let theme = new Theme()
        await theme.getThemes()
        let themeA = theme.getHomeLocationA()
        let themeE = theme.getHomeLocationE()
        let themeESpuList = []
        if(themeE.online){
            let data = await Theme.getHomeLocationESpu()
            if(data){
                themeESpuList = data.spu_list.slice(0,8)
            }
        }
        let themeF = theme.getHomeLocationF()
        let themeH = theme.getHomeLocationH()
        let bannerB = await Banner.getHomeLocationB()
        let gridC = await Category.getGridCategoryC()
        let activityD = await Activity.getHomeLocationD()
        let bannerG = await Banner.getHomeLocationG()
        this.setData({
            themeA, 
            themeE,
            themeF,
            themeH,
            bannerB,
            gridC,
            activityD ,
            themeESpuList,
            bannerG
        })
    }
})