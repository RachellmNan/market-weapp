// components/water-flow/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        data:Array
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        onItemTap(event){
            let pid = event.currentTarget.dataset.pid
            wx.navigateTo({
                url:`/pages/detail/detail?pid=${pid}`
            })
            console.log('pid',pid)
        }
    }
})
