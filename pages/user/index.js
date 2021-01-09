// pages/user/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        loginStatus:false
    },
    goOrder(event){
        let index = event.currentTarget.dataset.index
        wx.navigateTo({
            url:`/pages/orders/index?index=${index}`
        })
    },
    login(event){
        wx.getUserInfo({
            success:(res)=>{
                this.setData({
                    loginStatus:true
                })
                console.log('UserInfo',res)
            }
        })
        
        console.log('loginEvent',event)
    },
    setting(event){
        console.log('setEvent',event)
        wx.openSetting({
            success(res){
                console.log('Setting',res)
            },
            fail(err){
                console.log('setFail',err)
            }
        })
        wx.getSetting({
            success(res){
                console.log('GetSetting',res)
            }
        })
    },
    authorize(event){
        wx.authorize({
            scope:'scope.record',
            success(res){
                console.log('authorize',res)
            },
            fail(err){
                console.log('authorizeFail',err)
            }
        })
    }
})