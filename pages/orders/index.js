// pages/orders/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentIndex:0
    },
    onLoad(options){
        let index = options.index
        this.setData({
            currentIndex:index
        })
    },
    chose(event){
        let index = event.currentTarget.dataset.index
        this.setData({
            currentIndex:index
        })
    }
})