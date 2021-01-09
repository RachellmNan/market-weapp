const { Category } = require("../../model/category")
import { getHeight } from '../../utils/util'
// pages/category/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentIndex:0,
        Selected:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        this.initData()
    },
    async initData(){
        let list = await Category.getCategoryAll()
        let roots = list.roots
        let subsArray = list.subs
        let subs = {}
        roots.forEach(root => {
                subs[root.id] = []
        });
        roots.sort((a,b)=>{
            return a.id -b.id
        })
        roots=roots.filter(item=>item.name != '测试数据')
        roots=roots.concat([{id:101,name:'家电'},
                            {id:102,name:'潮玩'},
                            {id:103,name:'香水'},
                            {id:103,name:'眼镜'},
                            {id:104,name:'个护清洁'},
                            {id:105,name:'电脑办公'},
                            {id:106,name:'玩具'},
                            {id:107,name:'户外'}])
        let subKey = Object.keys(subs)
        subsArray.forEach(v=>{
                if(subKey.includes(v.parent_id+'')){
                    subs[v.parent_id].push(v)
                }            
        })
        let ViewHeight = await getHeight(80) 
        this.setData({
            roots,
            subs,
            ViewHeight
        })
    },
    choseRoot(event){
        let index= event.currentTarget.dataset.index
        this.setData({
            currentIndex:index
        })
    },
    goSearch(){
        wx.navigateTo({
            url:'/pages/search/index'
        })
    }
})