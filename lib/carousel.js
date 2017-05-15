$(function() {
    //设置每张图片的宽度为当前浏览器的宽度
    var width = $(window).width();
    $('#carousel ul li').width(width);

    //为下方的ol添加点击事件 点击后当前li高亮显示
    $('#carousel ol li').click(function() {
        $(this).addClass('current')
            .siblings().removeClass('current');

        var i = $(this).index(); //获取当前ol的li的索引
        // console.log(i);
        $('#carousel ul').animate({ left: -i * width }, 500); //根据点击的li动态改变显示的图片
    })

    /*假设当前应是第三张图片
    $('#carousel ul').css('left',-2*width);*/

    //播放下一张
    var timer = null;
    var num = 0;
    var autoPlay = function() {
        num++;
        if (num > 3) { //如果当前是最后一张
            num = 0;
            $('#carousel ul').css('left', 0); //直接跳到第一张
            // num = 1;
            $('#carousel ol li').eq(0).addClass('current').siblings().removeClass('current');
        } else {
            $('#carousel ul').animate({ left: -num * width }, 500);
            $('#carousel ol li').eq(num).addClass('current').siblings().removeClass('current');
        }
        if (num == 3) {
            $('#current ol li').eq(0).addClass('current').siblings().removeClass('current');
        }
    }

    //播放上一张
    var prevPlay = function() {
        num--;
        if (num < 0) { //如果当期是第一张
            num = 3;
            $('#carousel ul').css('left', -3 * width);
            // num = 2;
            $('#carousel ol li').eq(3).addClass('current').siblings().removeClass('current');
        } else {
            $('#carousel ul').animate({ left: -num * width }, 500);
            $('#carousel ol li').eq(num).addClass('current').siblings().removeClass('current');
        }
        // console.log(num);
        // if(num == 0){
        // 	$('#carousel ol li').eq(0).addClass('current').siblings().removeClass('current');
        // }
    }
    timer = setInterval(autoPlay, 2000);

    //当鼠标放置到大图上是停止播放 清楚定时器
    $('#carousel').mouseenter(function() {
        clearInterval(timer);
    }).mouseleave(function() {
        timer = setInterval(autoPlay, 2000);
    });

    //向右播放  即播放下一张
    $('#carousel .right').click(function() {
        autoPlay();
    });
    //向左播放  即播放上一张
    $('#carousel .left').click(function() {
        prevPlay();
    });
})
