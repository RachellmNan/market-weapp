import { Storage } from "../utils/storage"

class HistoryKeyWords{
    static key='historyKeyWord'
    static MAX_LENGTH = 10
    static setValue(value){
        let storage = Storage.getStorage(this.key)
        let need_delete = false
        if(storage.length==this.MAX_LENGTH){
            need_delete = true
        }
        if(!storage){
            value = [value]
            Storage.setStorage(this.key,value)
            return
        }
        if(!storage.includes(value)){
            storage.unshift(value)
            if(need_delete){
                storage.pop()
            }
            Storage.setStorage(this.key,storage)
        }else{
            let index = storage.findIndex(val=>{
                return val  == value
            })
            storage.splice(index,1)
            storage.unshift(value)
            Storage.setStorage(this.key,storage)
        }
    }
    static getValue(){
        return Storage.getStorage(this.key)
    }
    static clearAllValue(){
        Storage.setStorage(this.key,[])
    }
}

export {
    HistoryKeyWords
}