;(function(global, $) {
  var UgcJsSDK = function(config) {
    console.log(111)
    var that = this;
    this.config = {
      host: config.host || ''
    }
    this.getID = function getQueryString(name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      }
      return null;
    }
    this.createAjax = function(url,type, data, cb) {
      $.ajax({
        type: type,
        url: url,
        data: data,
        dataType: "json",
        success: function(data){
          var err = null;
          if (data.stata !== 200) {
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
        url: "....",
        dataType : "json",
        processData: false,
        contentType: false,
        data: form_data,
        success: function(data){
          cb ? cb(null, data) : null;
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

;(function(global, $){
  $(function(){
    var ModalJsSDK = function(config) {
      var that = this;
      this.config = {
        title: '',
        body: '',
        ok: config.ok,
        clear: config.clear
      }
      var $gModal = $('js-gModal'),
          $gModalTitle = $('js-gModal-title'),
          $gModalBG = $('js-gModal-bg'),
          $gModalBody = $('js-gModal-body'),
          $gModalClearBtn = $('js-gModal-clearBtn'),
          $gModalOkBtn = $('js-gModal-okBtn');
      this.show = function() {
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
      $gModalBG.on('click', function(){
        that.hede();
        this.config.clear ? this.config.clear() : null;
      });
      $gModalClearBtn.on('click', function(){
        that.hede();
        this.config.clear ? this.config.clear() : null;
      });
      $gModalOkBtn.on('click', function(){
        that.hede();
        this.config.ok ? this.config.ok() : null;
      });
      this.setTitle(this.config.title);
      this.setBody(this.config.body);
    }
    global.ModalJsSDK = ModalJsSDK;
  })
})(window, $);
