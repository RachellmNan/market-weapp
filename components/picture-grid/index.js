// components/picture-grid/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        list:{
            type:Array
        }
    },
    observers:{
        'list':function(list){
            if(!list) return
            if(!list.length) return 
            let left ,rightTop,rightBottom
            for(let i of list){
                if(i.name == 'left') {
                    left = i
                }else if(i.name == 'right-top'){
                    rightTop = i
                }else {
                    rightBottom = i
                }
            }
            this.setData({
                left,
                rightTop,
                rightBottom
            })
        }
    },
    /**
     * 组件的初始数据
     */
    data: {
        left:[],
        rightTop:[],
        rightBottom:[]
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
