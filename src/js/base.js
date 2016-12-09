;(function(global, $) {
  var UgcJsSDK = function(config) {
    console.log(111)
    var that = this;
    this.config = {
      host: config.host || ''
    }
    this.getQuery = function getQueryString(key) {
      var reg = new RegExp("(^|&)"+key+"=([^&]*)(&|$)");
      var result = window.location.search.substr(1).match(reg);
      return result?decodeURIComponent(result[2]):null;
    }
    this.createAjax = function(url,type, data, cb) {
      $.ajax({
        type: type,
        url: url,
        data: data,
        dataType: "json",
        success: function(data){
          var err = null;
          if (data.starus !== 200 && data.message !== 'ok') {
            err = data.message;
          }
          cb ? cb(err, data) : null;
        },
        error: function(err) {
          cb ? cb(err) : null
        }
      });
    }
    this.pv = function(cb) {
      $.ajax({
        type: 'post',
        url: 'http://activity-test.camera360.com/common/statistic/index',
        data: {
          id: 'ugc01',
          type: 'ugc'
        },
        dataType: "jsonp",
        success: function(data){
          var err = null;
          if (data.starus !== 200 && data.message !== 'ok') {
            err = data.message;
          }
          cb ? cb(err, data) : null;
        },
        error: function(err) {
          cb ? cb(err) : null
        }
      });
    }
    this.upData = function(url, form_data, cb) {
      $.ajax({
        type: "POST",
        url: url,
        dataType : "jsonp",
        processData: false,
        contentType: false,
        data: form_data,
        success: function(data){
          var err = null;
          if (data.starus !== 200) {
            err = data.message;
          }
          console.log(data);
          cb ? cb(err, data) : null;
        },
        error: function(err) {
          cb ? cb(err) : null
        }
      })
    }
    this.postUGC = function(data, cb) {
      var _config = that.config;
      var url = _config.host + '/create';
      that.createAjax(url, 'POST', data, cb);
    }
    this.putUGC = function(data, cb) {
      var _config = that.config;
      var url = _config.host + '/edit';
      that.createAjax(url, 'POST', data, cb);
    }
    this.getUGC = function(data, cb) {
      var _config = that.config;
      var url = _config.host + '/get';
      that.createAjax(url, 'GET', data, cb);
    }
  }
  global.UgcJsSDK = UgcJsSDK;
})(window, $);


$(function(){
  var ModalJsSDK = function(config) {
    var that = this;
    this.config = {
      title: '',
      body: '',
      ok: config.ok,
      clear: config.clear
    }
    var $gModal = $('.js-gModal'),
        $gModalTitle = $('.js-gModal-title'),
        $gModalBG = $('.js-gModal-bg'),
        $gModalBody = $('.js-gModal-body'),
        $gModalClearBtn = $('.js-gModal-clearBtn'),
        $gModalOkBtn = $('.js-gModal-okBtn');
    this.show = function(data, time) {
      this.setTitle(data.title);
      this.setBody(data.body);
      that.setHandleClear(data.clear);
      that.setHandleOK(data.ok);
      $gModal.show();
      $('html').addClass('showImg');
    }
    this.hede = function(){
      $gModal.hide();
      $('html').removeClass('showImg');
    }
    this.setTitle = function(title) {
      $gModalTitle.text(title);
    }
    this.setBody = function(body) {
      $gModalBody.text(body);
    }
    this.setHandleOK = function(fun) {
      $gModalOkBtn.on('click', function(){
        that.hede();
        typeof fun === 'function' ? fun() : null;
      });
    }
    this.setHandleClear = function(fun) {
      $gModalClearBtn.on('click', function(){
        that.hede();
        typeof fun === 'function' ? fun() : null;
      });
      $gModalBG.on('click', function(){
        that.hede();
        typeof fun === 'function' ? fun() : null;
      });
    }
    $gModalBG.on('click', function(){
      that.hede();
      typeof that.config.clear === 'function' ? that.config.clear() : null;
    });
    $gModalClearBtn.on('click', function(){
      that.hede();
      typeof that.config.clear === 'function' ? that.config.clear() : null;
    });
    $gModalOkBtn.on('click', function(){
      that.hede();
      typeof that.config.ok === 'function' ? that.config.ok() : null;
    });
  }
  window.ModalJsSDK = ModalJsSDK;
})
