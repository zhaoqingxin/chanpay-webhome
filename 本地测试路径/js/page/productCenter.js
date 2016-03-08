/**
 * Created by sks on 2016/2/3.
 */
var app = (function(){
    var height,old;
    var iNow=0;
    var oSwitch = 'on';
    var timer = null;

    var handleInit = function(){
        if($(window).height()>700){
            height = $(window).height()-100;
            $('.full-height').height(height+'px');
            $('.fill-height').height(height+100+'px');
        }else{
            height = 600;
            $('.full-height').height(600+'px');
            $('.fill-height').height(700+'px');
        }
        if($(window).width()<1200){
            $('.side-bar').hide();
        }
    };

    var handleOnResize = function(){
        $(window).resize(function(){
            if($(window).height()>700){
                height = $(window).height()-100;
                $('.full-height').height(height+'px');
                $('.fill-height').height(height+100+'px');
            }else{
                height = 600;
                $('.full-height').height(600+'px');
                $('.fill-height').height(700+'px');
            }
            if($(window).width()<1200){
                $('.side-bar').hide();
            }else{
                $('.side-bar').show();
            }
        });
    };

    var handleScroll = function(){
        $(window).scroll(function(){
            if(oSwitch == 'off'){
                return;
            }
            iNow = Math.floor(($(window).scrollTop()+300)/(height+100));
            if($('.active').index('.dot')!=iNow){
                $('.dot.active').removeClass('active');
                $('.dot:eq('+iNow+')').addClass('active');
            }
        });
    };

    var handleToggle = function(){
        $('.dot').click(function(){
            oSwitch = 'off';
            iNow = $(this).index('.dot');
            $('.active').removeClass('active');
            $('.dot:eq('+iNow+')').addClass('active');
            var start = document.documentElement.scrollTop||document.body.scrollTop;
            var dis = iNow*(height+100)-start;
            var count = Math.floor(500/30);
            var n = 0;
            clearInterval(timer);
            timer = setInterval(function(){
                n++;
                var a = 1-n/count;
                var cur = start+dis*n/count;
                document.documentElement.scrollTop=document.body.scrollTop=cur;
                if(n==count){
                    clearInterval(timer);
                    oSwitch='on';
                }
            },30);
        });

    };


    return {
        init:function(){
            handleInit();
            handleOnResize();
            handleToggle();
            handleScroll();
        }
    };
})();

jQuery(document).ready(function() {
    app.init(); // init core components
});
