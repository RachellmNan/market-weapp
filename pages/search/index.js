import { HistoryKeyWords } from "../../model/history"
import { HotSearch } from "../../model/hot-search"
import { Search } from "../../model/search"

// pages/search/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchValue:'',
        showResult:false,
        Result:[],
        HistoryList:[],
        HotList:[],
        task:null //防抖判断，输入框输入时
    },
    async onLoad(options) {
        this.setData({
            HotList:await HotSearch.getHotWords(),
            HistoryList:HistoryKeyWords.getValue()
        })
    },
    cancel(){
        this.setData({
            searchValue:'',
            showResult:false
        })
    },
    onconfirm(event){
        let searchValue = event.detail.value
        if(this.ALlIsSpace(searchValue)){
            this.setData({
                searchValue:''
            })
            return
        }
        this.changeUi(searchValue)
    },
    async oninput(event){
        let value = event.detail.value
        await this.search(value)
        this.setData({
            searchValue:value
        })
    },
    async search(searchValue){
        this.bounce(async ()=>{
            let Result = await Search.getContent(searchValue)
            this.setData({
                Result
            })
        },500)()
    },
    bounce(fn,delay){
        return ()=>{
            if(this.data.task){
                clearTimeout(this.data.task)
            }
            this.data.task = setTimeout(() => {
                fn.apply(this)
                this.data.task = null
            }, delay);
        }
    },
    clearHistoryList(){
        wx.showModal({
            content:'是否删除历史搜索记录',
            success:()=>{
                HistoryKeyWords.clearAllValue()
                this.setData({
                    searchValue:'',
                    HistoryList:[],
                    showResult:false
                })
            }
        })  
    },
    ALlIsSpace(searchValue){
        return searchValue.search(/\S/g) < 0
    },
    changeUi(searchValue){
        HistoryKeyWords.setValue(searchValue)
        this.setData({
            searchValue,
            HistoryList:HistoryKeyWords.getValue()
        })
    },
    async tagSearch(event){
        let searchValue = event.currentTarget.dataset.value
        await this.search(searchValue)
        this.changeUi(searchValue)
    },
    delete(){
        this.setData({
            searchValue:'',
            Result:[]
        })
    }
})