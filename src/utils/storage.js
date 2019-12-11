
    /**
     * 
     * @param {*} key 
     * @param {*} val 
     */
    let setSessionStorage = (key,val)=>{
       let result = window.sessionStorage.setItem(key,val)
    }
    /**
     * 
     * @param {*} key 
     */
    let getSessionStorage = (key)=>{
        let result = window.sessionStorage.getItem(key)
        return result
     }
     /**
     * 
     * @param {*} key 
     * @param {*} val 
     * @param {*} expired 失效时间戳
     */
    let setLocalStorage=(key,val,expired)=>{
        expired=new Date(expired|| '2099-12-12').getTime()
        let obj = {
            startTime:new Date().getTime(),
            expired:expired
        }
        Object.assign(obj,{data:val})
        window.localStorage.setItem(key,JSON.stringify(obj))
     }
     /**
      * 
      * @param {*} key 
      */
    let getLocalStorage=(key)=>{
         let result = window.localStorage.getItem(key)
         let item={}
            try{
                item = JSON.parse(result);
            }catch(error){
            //如果不行就不是json的字符串，就直接返回
                item = result;
            }
        if(item&&item.expired&&item.startTime){
            let date = new Date().getTime();
            if(date - item.startTime > item.expires){
                // 过期
                localStorage.removeItem(name);
                item = false
            }
        }
        if(item&&typeof(item.data)==='boolean'){
            return item.data
        }
         return item&&item.data ? item.data : item
    }
    /**
     * 
     * @param {*} key 
     */
    let deleteLocalStorage=key=>{
        window.localStorage.removeItem(key.toString());
    }
    /**
     * 
     * @param {*} type local或session
     * @param {*} key 
     * @param {*} data 
     */
    let emitStorage=(type, key, data) =>{
        // 创建一个StorageEvent事件
        let gaStorage
        if(!window.storageEvent){
            gaStorage = document.createEvent('storageEvent');
        }
        if (type === 'local') {
        const storage = {
            setItem: function (k, val) {
                setLocalStorage(k,val)
                localStorage.setItem(k, val);
                // 初始化创建的事件
                gaStorage.initStorageEvent(key, false, false, k, null, val, null, null);
                // 派发对象
                window.dispatchEvent(gaStorage);
            }
        }
        return storage.setItem(key, data);
      } else {
        const storage = {
            setItem: function (k, val) {
                setSessionStorage(k,val)
                // 初始化创建的事件
                gaStorage.initStorageEvent(key, false, false, k, null, val, null, null);
                // 派发对象
                window.dispatchEvent(gaStorage);
            }
        }
        return storage.setItem(key, data);
      }
    }
     /**
     * 
     * @param {*} type local或session
     * @param {*} key 
     */
    let onStorage = (key,cb)=>{
        window.addEventListener(key, (e) => {
           return cb(e.oldValue||null,e.newValue||null)
            // return {
            //     oldValue:e.oldValue||null,
            //     newValue:e.newValue||null
            // }
        });
    }
export default {
    setSessionStorage,
    getSessionStorage,
    setLocalStorage,
    getLocalStorage,
    deleteLocalStorage,
    emitStorage,
    onStorage
}