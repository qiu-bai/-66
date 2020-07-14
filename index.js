/*旋转分散*/
window.onload = function() {
    var album = document.getElementById('album'),
        aImg = document.querySelectorAll('img');
    for (var i = 0; i < aImg.length; i++) {
        // 图片旋转分散 36°
        aImg[i].style.transform = 'rotateY(' + i * 360 / aImg.length + 'deg) translateZ(300px)';
        aImg[i].style.transition = 'transform 1s ' + (aImg.length - i) * 0.1 + 's';
    }
    var lastX = 0, // 前一次的坐标X
        lastY = 0,
        nowX = 0, // 当前的坐标X
        nowY = 0,
        desX = 0,
        desY = 0,
        rotX = -30,
        rotY = 0,
        timer; // 时间间隔
    document.onmousedown = function(e) {
        var e = e || event;
        lastX = e.clientX;
        lastY = e.clientY;
        this.onmousemove = function(e) {
            var e = e || event;
            nowX = e.clientX;
            nowY = e.clientY;
            desX = nowX - lastX;
            desY = nowY - lastY;
            // 更新album的旋转角度，拖拽越快-> des变化大 -> roY变化大 -> 旋转快
            rotX -= desY * 0.1;
            rotY += desX * 0.2;
            album.style.transform = 'rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg)';
            lastX = nowX;
            lastY = nowY;
        }
        document.onmouseup = function() {
            this.onmousemove = this.onmouseup = null;
            timer = setInterval(function() {
                desX *= 0.95;
                desY *= 0.95;
                rotX -= desY * 0.1;
                rotY += desX * 0.2;
                album.style.transform = 'rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg)';

                if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
                    clearInterval(timer);
                }
            }, 13)
        }
        // 阻止默认行为
        return false;
    }
}