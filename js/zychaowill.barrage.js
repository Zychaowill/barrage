(function(window, document, undefined) {

  function Barrage(selector) {
    this.doms = document.querySelectorAll(selector);

    for (var i = 0; i < this.doms.length; i++) {
      this[i] = this.doms[i];
    }
    this.length = this.doms.length;
  }

  Barrage.prototype = {
    each: function(callback) {
      if (this.length) {
        for (var i = 0; i < this.length; i++) {
          if (false === callback.call(this[i], i, this[i])) {
            break;
          }
        }
      }
      return this;
    },

    on: function(event, callback) {
      this.each(function(_, dom) {
        dom.addEventListener(event, callback);
      });
      return this;
    },

    css: function(attribute, value) {
      this.each(function(_, dom) {
        dom.style[attribute] = value;
      });
      return this;
    },

    val: function(value) {
      if (undefined != value) {
        this.each(function(_, dom) {
          dom.value = value;
        });
        return this;
      }
      return this[0].value;
    },

    append: function(childNode) {
        this.each(function(_, dom) {
          dom.appendChild(childNode);
        });
      return this;
    },

    html: function(value) {
      if (undefined != value) {
        this.each(function(_, dom) {
          dom.innerHTML = value;
        });
        return this;
      }
      return this[0].innerHTML;
    },

    offset: function() {
      return offset = {
        width: this[0].offsetWidth,
        height: this[0].offsetHeight,
        top: this[0].offsetTop,
        left: this[0].offsetLeft
      };
    },

    trigger: function(event) {
      var evt = document.createEvent('HTMLEvents');
      evt.initEvent(event, ture, ture);
      this[0].dispatchEvent(evt);
      return this;
    }
  };

  function B(selector) {
    return new Barrage(selector);
  }

  window.B = B;

})(window, document);
