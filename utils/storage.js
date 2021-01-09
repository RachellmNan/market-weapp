class Storage{

    static setStorage(key,value){
        wx.setStorageSync(key,value)
    }

    static getStorage(key){
        return wx.getStorageSync(key)
    }
}

export {
    Storage
}