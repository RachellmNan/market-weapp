// components/counter/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        max_count:{
            type:Number,
            value:20
        },
        min_count:{
            type:Number,
            value:1
        },
        count:{
            type:Number,
            value:1
        }
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
        add(){
            if(this.data.count==this.data.max_count){
                wx.showToast({
                    icon:'none',
                    title:`所选数量超过最大值`
                })
                return
            }
            this.setCount(++this.data.count)
            this.transmitStock()
        },
        minus(){
            if(this.data.count==this.data.min_count){
                wx.showToast({
                    icon:'none',
                    title:`当前数量最少为${this.data.min_count}`
                })
                return
            }
            this.setCount(--this.data.count)
            this.transmitStock()
        },
        setCount(count){
            this.setData({
                count
            })
        },
        transmitStock(){
            this.triggerEvent('stockStatus',{
                count:this.data.count
            })
        }
    }
})
