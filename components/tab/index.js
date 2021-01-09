// components/tab/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        count:{
            type:Number,
            value:99
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
            this.triggerEvent('add')
        },
        buy(){
            this.triggerEvent('buy')
        }
    }
})
