window.onload = function() {

  var ref = new Wilddog("https://barrage3590.wilddogio.com"),
    text, width, left,
    once = true, canOnce = true, paused = false, waiting = true,
    $video = B("video"),
    screenWidth = $video.offset().width,
    screenHeight = $video.offset().height;

    window.onresize = function() {
      screenWidth = $video.offset().width;
      screenHeight = $video.offset().height;
    };

    B("#submit").on("click", submitDataToWilddog);
    B("#text").on("keypress", function(event) {
      if (event.keyCode === 13) {
        submitDataToWilddog();
      }
    });

    B("#clean").on("click", function() {
      ref.remove();
      B(".barrage").html("");
    });

    ref.on("child_removed", function(snapshot) {
      B(".barrage").html("");
    });

    $video.on("play", function() {
            if (once) {
              ref.child("message").on('child_added', function(snapshot) {
                var text = snapshot.val();
                var span = createSpanElement(text);

                readyMove(span);
              });
              once = false;
            } else {
              B(".barrage span").each(function(_, span) {
                if (this.time) {
                  clearInterval(this.time);
                }

                move(span);
              });
            }

            paused = false;
            B(".control").css("display", "block");
          }).on("pause", function() {
            B(".barrage span").each(function() {
              clearInterval(this.time);
            });
            paused = true;
            B(".control").css("display", "none");
          }).on("waiting", function() {
            $video.trigger("pause");
            waiting = false;
          }).on("canplay", function() {
            if (canOnce || (paused && waiting)) {
              canOnce = false;
              return;
            }
            $video.trigger("play");
            waiting = true;
          });

    /**
     * @description 提交数据到野狗
     * @return
     */
    function submitDataToWilddog() {
      text = B("#text").val();

      if ("" === text || undefined === text) {
        return;
      } else {
        ref.child('message').push(text);
        B("#text").val("");
      }
    }

    /**
     * @description 创建span元素
     * @param  {string} text
     * @return {HTMLElement} span
     */
    function createSpanElement(text) {
      var span = document.createElement("span");
      var textNode = document.createTextNode(text);

      span.appendChild(textNode);
      B(".barrage").append(span);

      return span;
    }

    /**
     * @description 弹幕移动准备
     * @param  {HTMLElement} span
     * @return
     */
    function readyMove(span) {
      if (span.time) { // 清除定时器
        clearInterval(span);
      }

      width = span.offsetWidth;
      span.style.left = screenWidth + width + "px";
      span.style.color =
        "rgb(" + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255) + ")";
      span.style.top = Math.round(Math.random() * (screenHeight - 50)) + "px";
      span.style.fontSize = Math.round(Math.random() * 18 + 18) + "px";

      move(span); // 开始发射弹幕
    }

    function move(span) {
      // 将定时器放到对应的span标签下，方便清除定时器
      span.time = setInterval(function() {
        left = span.offsetLeft;

        if (!(left < 0)) {
          span.style.left = left - 0.5 + "px";
        } else {
          span.remove();
          return;
        }
      }, 0.1);
    }
};
