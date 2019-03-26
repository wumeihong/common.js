module.exports = {
  Vue: require('vue'),
  $router: require('@/router'),
  $: require('jquery'),
  'window.$': require('jquery'),
  jCookie: require('jquery.cookie'),
  element: require( 'element-ui' ),

  // needLogin: function () {
  //   this.deleteCookie('token')
  //   this.$router.default.push({ path: '/Login' })
  // },

  // cookie操作
  // key：键名  value：值( 如果不设置此项，则为获取对应cookie )  option：参数  no_default不设置默认时间：默认为false
  cookie: function (key, value, option, no_default) {
    if (value == null || this.notNull(value)) {
      // 保存cookie
      option = this.isNull(option) ? {} : option

      if (no_default == true) {
        // 不设置默认参数
        return window.$.cookie(key, value, option)
      } else {
        // 包含默认参数
        var options = $.extend(true, {}, { 'expires': 30, path: '/' }, option)
        return window.$.cookie(key, value, options)
      }
    } else {
      // 获取cookie
      return window.$.cookie(key, { path: '/' })
    }
  },

  message: function () {
    this.element[ 'Message' ]({
      message: '登录状态已失效，请重新登录。',
      type: 'error'
    })
  },

  // 获取Cookie
  getCookie: function (key) {
    return this.cookie(key)
  },

  // 设置Cookie
  setCookie: function (key, value, option, no_default) {
    return this.cookie(key, value, option, no_default)
  },

  // 删除Cookie
  deleteCookie: function (key) {
    return this.cookie(key, null, { expires: 0, path: '/' }, true)
  },

  formatDate: function (originalData, fmt) {
    if (originalData && (isNaN(originalData) || (originalData instanceof Date))) {
      if ((typeof originalData === 'string') && (originalData.indexOf('%') != -1)) {
        return originalData
      }

      var date = originalData instanceof Date ? originalData : new Date(originalData)
      if (date != 'Invalid Date') {
        if (typeof fmt === 'string') {
          return date.format(fmt)
        } else {
          return date.format('yyyy-MM-dd')
        }
      }
    }

    return originalData
  },

  // 计算字符串中的中文字符数量
  computerChinaChartNumber: function (content) {
    var sum = 0, reg = /[\u4E00-\u9FA5]/g // 测试中文字符的正则
    if (content) {
      if (reg.test(content)) // 使用正则判断是否存在中文
      {
        sum = content.match(reg).length
      }
    }

    return sum
  },

  // 年龄计算
  computerAge: function (birthDay) {
    var t = new Date().getTime(), b = this.notNull(birthDay) ? new Date(birthDay) : null, age = '未知'

    if (this.notNull(b) && b != 'Invalid Date') {
      age = Math.floor((t - b.getTime()) / 1000 / 60 / 60 / 24 / 365)
    }

    return age
  },

  // 月薪计算
  computerSalary: function (minSalary, maxSalary) {
    var salary = '未知'

    if (this.notNull(minSalary)) {
      salary = minSalary

      if (this.notNull(maxSalary)) {
        salary += '-' + maxSalary + 'K'
      } else {
        salary += 'K'
      }
    } else {
      if (this.notNull(maxSalary)) {
        salary = maxSalary + 'K'
      }
    }
    return salary
  },

  // 数字补位
  coverRage: function (number, digit) {
    var str = number
    digit = isNaN(digit) ? 2 : digit
    switch (digit) {
      case 2:
        str = number > 9 ? str : '0' + str
        break
      case 3:
        str = number > 99 ? str : '00' + str
        break
    }
    return str
  },

  // 判断是否为一个方法
  isFunc: function (func) {
    return typeof func === 'function'
  },

  // 判断对象是否为空（并包含空对象、空字符串、空数组的判断）
  isNull: function (obj) {
    if ((obj && obj != '' && obj != '') || obj == 0) {
      if (typeof obj === 'string') {
        return obj.trim() == ''
      } else {
        if (obj instanceof Object) {
          if (typeof obj.length !== 'undefined') {
            return obj.length == 0
          } else {
            return $.isEmptyObject(obj)
          }
        } else {
          if (obj instanceof Array) {
            return obj.length == 0
          } else {
            return false
          }
        }
      }
    } else {
      return true
    }
  },

  // 判断对象是否非空（并包含空对象、空字符串、空数组的判断）
  notNull: function (obj) {
    return !(this.isNull(obj) == true)
  },

  // 判断后台传值为true的几种方式，并返回boolean型结果
  isTrue: function (obj) {
    return this.notNull(obj) && (obj == 1 || obj == true || obj == 'true' || obj == 'TRUE' || obj == 'True')
  },

  // 判断后台传值为false的几种方式，并返回boolean型结果
  isFalse: function (obj) {
    return !(this.isTrue(obj) == true)
  },

  // 去掉所有的html标记
  delAllHtmlTag: function (str) {
    str = str.replace(/<br>/g, '\n')
    str = str.replace(/<\/br>/g, '\n')
    str = str.replace(/<br\/>/g, '\n')
    str = str.replace(/<br \/>/g, '\n')

    return str.replace(/<[^>]+>/g, '')
  },

  // 设置自定义滚动条
  initScrollbar: function (selector, userConfig) {
    var target = $(selector), config = {}, baseConfig = {
      axis: 'yx',
      setWidth: '100%',
      setTop: '0px',
      theme: 'dark-thin',
      autoHideScrollbar: false,
      mouseWheelPixels: 'auto',
      scrollButtons: {
        enable: true
      }
    }

    if (this.notNull(userConfig)) {
      config = $.extend(true, {}, baseConfig, userConfig)
    } else {
      config = baseConfig
    }

    this.notNull(target) && target.mCustomScrollbar(config)
  },

  /**
   * 遮挡手机号
   * @param number 源手机号码
   * example： common.maskMobile( '13693066692' );
   */
  maskMobile: function (number) {
    if (number.length == 11) {
      var front = number.substring(0, 3), last = number.substring(7)
      number = front + ' * * * * ' + last
    }

    return number
  },

  /**
   * 判定异步加载对象判定是否有效
   * @param target 用以判定是否加载完成的目标对象( 需传入该对象的获取方法，例如：() => { return $('div') } )
   * @param callback 加载后执行的回调
   * @param delay_time 延迟加载时间 默认10毫秒
   * @param retry 加载失败重试次数 默认10次
   * return boolean 返回加载结果；
   */
  delayLoad: function (target, callback, delay_time, retry) {
    var self = this,

      load = function (target, callback, delay_time, retry) {
        var that = this
        that.opt = {
          target: target,
          callback: callback,
          delay_time: (delay_time && isNaN(delay_time) && delay_time > 0) ? delay_time : 10,
          retry: (delay_time && isNaN(delay_time) && retry > 0) ? retry : 10,
          count: 0
        }

        that._delayLoad = function () {
          var opt = that.opt

          window.setTimeout(function () {
            if (self.notNull(opt.target())) {
              self.callback(opt.callback, true)
            } else {
              if (opt.count < opt.retry) {
                opt.count++
                that._delayLoad()
              } else {
                self.callback(opt.callback, false)
              }
            }
          }, opt.delay_time)
        }
      }

    var load_obj = new load(target, callback, delay_time, retry)
    load_obj._delayLoad()
  },

  /**
   * 获取浏览器可视区域高度
   * @return number 高度值
   * example： common.get_browser_height();
   */
  get_browser_height: function () {
    var winHeight

    if (document.documentElement.clientHeight) {
      winHeight = document.documentElement.clientHeight
    } else if ((document.body) && (document.body.clientHeight)) {
      winHeight = document.body.clientHeight
    } else {
      winHeight = 0
    }

    return winHeight
  },

  /**
   * 获取浏览器可视区域宽度
   * @return number 高度值
   * example： common.get_browser_width();
   */
  get_browser_width: function () {
    var winWidth

    if (document.documentElement.clientWidth) {
      winWidth = document.documentElement.clientWidth
    } else if ((document.body) && (document.body.clientWidth)) {
      winWidth = document.body.clientWidth
    } else {
      winWidth = 0
    }

    return winWidth
  }
}

// css3变形
$.fn.css3Transform = function (param) {
  $(this).css(
    {
      'transform': param,
      '-ms-transform': param,		/* IE 9 */
      '-webkit-transform': param,	/* Safari and Chrome */
      '-o-transform': param,		/* Opera */
      '-moz-transform': param		/* Firefox */
    }
  )
}

// 根据提供的对象键值，从一个对象数组中去掉匹配的对象
// 参数：key 匹配对象的键名  value 匹配到对象的值
// 返回值：去除后的新对象数组
Array.prototype.removeByObject = function (key, value) {
  var list = []
  $.each(this, function (index, item) {
    if (item[ key ] != value) {
      list.push(item)
    }
  })
  return list
}

// 根据提供的对象键值，从一个对象数组中获取匹配的对象
// 参数：key 匹配对象的键名  value 匹配到对象的值
// 返回值：获取后的对象
Array.prototype.getChooseByObject = function (key, value) {
  var list = []
  $.each(this, function (index, item) {
    if (item[ key ] == value) {
      list.push(item)
    }
  })
  return list
}

String.prototype.endWith = function (endStr) {
  var d = this.length - endStr.length
  return (d >= 0 && this.lastIndexOf(endStr) == d)
}

Date.prototype.format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'H+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds() // 毫秒
  }

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[ k ]) : (('00' + o[ k ]).substr(('' + o[ k ]).length)))
    }
  }

  return fmt
}

// 替换全部
String.prototype.replaceAll = function (findStr, replaceStr) {
  return this.replace(new RegExp(findStr, 'gm'), replaceStr)
}

// 获取所需时区的对应时间
Date.prototype.getDatetimeByTimeZone = function (timeZone) {
  var d = this,
    localTime = d.getTime(),
    localOffset = d.getTimezoneOffset() * 60000, // 获得当地时间偏移的毫秒数,这里可能是负数
    utc = localTime + localOffset, // utc即GMT时间
    offset = timeZone, // 时区，北京市+8  美国华盛顿为 -5
    localSecondTime = utc + (3600000 * offset) // 本地对应的毫秒数
  return new Date(localSecondTime)
}
