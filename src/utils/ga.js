import utils from '@/utils/common'
import api from '@/utils/api.js'
import request from '@/utils/request'
import Vue from "vue";
import storage from './storage'
const pkg = require('../../package.json')
const pjName =  pkg.name
// import vm from '../main.js'
// 修改title
window.document.title = pjName
let vm =null
const analyticsId = 'UA-136757559-36'
const data={
    configData:{}
}
class GaTool{
    constructor(){
        this.data={},
        this.initSuccess=false,
        this.expire=null
    }
    // 判断菜单按钮是否打开
    menuOpen(time){
        const keys = Object.keys(time)
        const timeStatus = {}
        for (const item of keys) {
            let timeTmp = time[item]
            timeStatus[item] = new Date().valueOf()>new Date(timeTmp*1000).valueOf()
        }
        // console.log(timeStatus)
        return timeStatus
    }
    sendThis(_this){
        vm = _this
    }
    restUrl(){
        utils.resetUrl()
    }
    removeUrlParams(name){
        utils.removeUrlParams(name)
    }
     /**
     * 
     *
     * @param {*} region 
     * @param {*} config 
     */
    initGA(region,config){
        window.gtag('config', analyticsId, {
            dimension1: region,
            'page_title': pjName,
            'page_path': '/index.html'
        })
    }
    /**
     * 
     * @param {*} event required
     * @param {*} status required
     */
    addGA(event, status){
        var report = {
            'event_label': status
        }
        window.gtag('event', event, report)
    }
    errorGA(err){
        window.gtag('event', 'exception', {
            'description': err || 'ERROR',
            'fatal': false
        })
    }
    /**
     * 
     * @param {*} access_token 
     * @param {*} lang 
     */
    gaConfig(access_token,lang){
        window.dataLayer = window.dataLayer || [];
        window.gtag = function(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', analyticsId);
        this.storeParams(access_token,lang)
        // this.removeUrlParams("access_token","lang")
        this.getUserProfile(access_token,lang)
    }
    /**
     * 
     * @param {*} access_token 
     * @param {*} lang 
     */
    // 用户信息存储
	storeParams (access_token,lang) {
		access_token && window.sessionStorage.setItem('AccessToken', access_token)
        lang && window.sessionStorage.setItem('Lang', lang)
    }
     testTime(initTime){
        let timeOut = 1 * 10 * 1000; //设置超时时间： 10s
            let currentTime = new Date().getTime(); //更新当前时间
            if(currentTime - initTime > timeOut){//判断是否超时
            if(this.initSuccess){
                return 2
            }else{
                return 1
            }
         }else{
            return 0
        }
    }
    /**
     * 获取uid
     * @param {*} accessToken 
     * @param {*} lang 
     */
    getUserProfile(accessToken,lang){
       let initTime= new Date().getTime();
       let timer = setInterval(() => {
        this.expire = this.testTime(initTime)
        if((this.expire===1)&&!this.initSuccess){
            // let file ='../static/transify/common_toast/common_toast-'+lang+'.js' || '../static/transify/common_toast/common_toast-zh-Hant'
            // const commo_toast =  require(file)
            // console.log(commo_toast)
                vm.$wsLoading.hide()
                vm.$wsMessage('serverbusy',false,true)
                clearInterval(timer)
        }
        if(this.expire===2){
            clearInterval(timer)
        }
       }, 1000);
        vm.$wsLoading.show();
        let tokenSet = accessToken?{access_token: accessToken, lang: lang}:{lang: lang}
        let that=this
        request.get(api.link.profile, tokenSet)
        .then(response=>{
            console.log(response)
            this.initSuccess=true
            if(response&&response.status==='success'){
                data.userInfo = response.data
                data.translation = response.data.transify
                // 下面是这个项目特有的======
                // 所有config数据在globalConfig里
                Vue.prototype.globalConfig = data
                // 判断数据是否加载完成
                vm.isDataLoad = true
                vm.$wsLoading.hide()
                // 下面是这个项目特有的======
                // this.initConfig(lang,data.uid)
            }else{
                vm.$wsLoading.hide();
                if(that.expire!==1){
                    vm.$wsToast('NETWORK','NetWork Error',true,false)
                }

            }
            
        },(err)=>{
            let msg = JSON.stringify(err)
            if(err.msg){
                msg=err.msg
            }
            vm.$wsLoading.hide();
            this.addGA('getUserProfile', 'fail');
            this.errorGA(err);
            vm.$wsToast('NETWORK','NetWork Error',true,false)
            // vm.$wsToast(null,msg,true,false)
        })
        // .finally(()=>{
        //     this.initConfig(lang,data.uid)
        // })
        return this.data
    }
    /**
     * 
     * @param {*} lang 
     * @param {*} uid 
     * 0 networkError
     * 1 unlogin
     * 2 success
     */
    // 活动配置初始化
	initConfig (lang,uid) {
        let result ={}
		request.get(api.link.config, {lang: lang})
		.then((response) => {
			if (response&&response.status==='success') {
                this.addGA('initConfig', 'success');
				data.configData = response.data
                this.data = data
                // GA init
                this.initGA(this.data.configData.region)
                // 所有config数据在globalConfig里
                Vue.prototype.globalConfig = data
                // 判断数据是否加载完成
                vm.isDataLoad = true
                vm.$wsLoading.hide()
			}else {
                vm.$wsLoading.hide();
                vm.$wsToast('NETWORK','NetWork Error',true,false)
                this.addGA('initConfig', 'error');
            }
			window.gtag('set', {
                'user_id': uid || ''
              });
		},(err) => {
            vm.$wsLoading.hide();
            let msg = JSON.stringify(err)
            if(err.msg){
                msg=err.msg
            }
            this.errorGA(err);
            this.errorGA('initConfig', 'fail');
            vm.$wsToast('NETWORK','NetWork Error',true,false)
	    })
	}
}
export default new GaTool()