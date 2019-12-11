export const resetUrl = () => {
    var http = 'https:' == document.location.protocol ? 'https://' : 'http://';
    window.history.replaceState({}, 0, http + window.location.host +window.location.pathname);
  }
  
  export  const removeUrlParams = (name) => {
      var query = window.location.search.substr(1);
      if (query.indexOf(name)>-1) {
          var obj = {}
          var arr = query.split("&");
          for (var i = 0; i < arr.length; i++) {
              arr[i] = arr[i].split("=");
              obj[arr[i][0]] = arr[i][1];
          };
          delete obj[name];
          var url = JSON.stringify(obj).replace(/[\"\{\}]/g,"").replace(/\:/g,"=").replace(/\,/g,"&");
          var http = 'https:' == document.location.protocol ? 'https://' : 'http://';
          window.history.replaceState({}, 0, http + window.location.host +window.location.pathname+"?"+url);
      };
      
  }
  
  export  const getLang = () => {
    let acceptableLang = ['en', 'es', 'fr', 'id', 'pt', 'ru', 'th', 'tr', 'vi', 'zh', 'ko', 'ja', 'ar', 'de', 'jv', 'ms']
    let lang = (navigator.language || navigator.browserLanguage).toLowerCase()
    for (var i = 0; i < acceptableLang.length; i++) {
      acceptableLang[i] = acceptableLang[i].toLowerCase()
      if (lang === acceptableLang[i]) {
        return lang
      } else if (lang === 'zh-tw') {
        return 'zh'
      }
    }
    return 'en'
  }
  
  export   const getCookie = (name) => {
    var cookieValue = null
    if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';')
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim()
        if (cookie.substring(0, name.length + 1) === name + '=') {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
          break
        }
      }
    }
    return cookieValue
  }
  
  export   const getTime = (time,config)=>{
    if(!config) config = 'UTC';
    if(config==='UTC'){
      return new Date(time*1000)
    }
    // 不知道还有什么要用
    // if(config === 'local'){
    //   let setDate = new Date(time*1000)
    //   let dateOffset = new Date().getTimezoneOffset()*6000
  
    //   return new Date(time*1000) 
    // }
  }
  export   const updateGlobalData = ((vm,...source)=>{
    if(vm.globalConfig){
      // console.log(vm.globalConfig.userInfo)
      Object.assign(vm.globalConfig.userInfo,...source)
      // console.log(vm.globalConfig.userInfo)
    }else{
      throw new Error("update global data error")
    }
  })
  export const isOverflow = el => {
    const node = el.current; // 判断的dom节点，使用ref
    const clientWidth = node.clientWidth;
    const scrollWidth = node.scrollWidth;
    return clientWidth < scrollWidth;
  };
  export const delayEffect = (fn, delay) => {
    let timer = null;
    timer = setTimeout(() => {
      fn();
      clearTimeout(timer);
      timer = null;
    }, delay);
  };
  export const getCusTime = time => {
    if (!time) {
      return "--";
    }
    let times = new Date(time * 1000);
    let month = times.toDateString().split(" ")[1];
    let day = times.toDateString().split(" ")[2];
    let hours = times.getHours();
    let minutes = times.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    return times.toLocaleString();
    //   month + "\v" + day + "\v" + "at" + "\v" + hours + ":" + minutes + ampm
  };
  /**
   *
   * @param {*} vm
   * @param {*} dom
   * @param {*} type height/width
   * @param {*} plus 扩展数值
   * @param {*} fn
   */
  export const judeOverflow = (vm, dom, type, plus, fn) => {
    let timer = null;
    vm.$nextTick(() => {
      timer = setTimeout(() => {
        if (type === "height") {
          // console.log(dom.clientHeight)
          // console.log(dom.scrollHeight)
          if (dom.clientHeight + plus < dom.scrollHeight) {
            fn();
          }
        }
        if (type === "width") {
          if (dom.clientWidth + plus < dom.scrollWidth) {
            fn();
          }
        }
        timer = null;
        clearTimeout(timer);
      }, 300);
    });
  };
  export const checkMobileAgent = ()=>{
          var u = window.navigator.userAgent, app = navigator.appVersion;
          return {
              trident: u.indexOf('Trident') > -1, //IE内核
              presto: u.indexOf('Presto') > -1, //opera内核
              webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
              gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
              mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
              ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
              android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
              iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
              iPad: u.indexOf('iPad') > -1, //是否iPad
              webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
              weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
              qq: u.match(/\sQQ/i) == " qq" //是否QQ
          };
  }
  
  export const checkUserAgent = () => {
    var naviVersion = window.navigator.userAgent;
    var sBrowser,
      sUsrAg = navigator.userAgent;
  
    // The order matters here, and this may report false positives for unlisted browsers.
  
    if (sUsrAg.indexOf("Firefox") > -1) {
      sBrowser = "Mozilla Firefox";
      // "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0"
    } else if (sUsrAg.indexOf("Opera") > -1 || sUsrAg.indexOf("OPR") > -1) {
      sBrowser = "Opera";
      //"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 OPR/57.0.3098.106"
    } else if (sUsrAg.indexOf("Trident") > -1) {
      sBrowser = "Microsoft Internet Explorer";
      // "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; Zoom 3.6.0; wbx 1.0.0; rv:11.0) like Gecko"
    } else if (sUsrAg.indexOf("Edge") > -1) {
      sBrowser = "Microsoft Edge";
      // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
    } else if (sUsrAg.indexOf("Chrome") > -1) {
      sBrowser = "Google Chrome or Chromium";
      // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.181 Chrome/66.0.3359.181 Safari/537.36"
    } else if (sUsrAg.indexOf("Safari") > -1) {
      sBrowser = "Apple Safari";
      // "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1 980x1306"
    } else {
      sBrowser = "unknown";
    }
    // window.alert("当前浏览器为: " + sBrowser);
    // window.alert("浏览器" + naviVersion);
    return naviVersion
  };