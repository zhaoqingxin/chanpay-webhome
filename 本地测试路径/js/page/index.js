/**
 * Created by sks on 2016/2/4.
 */
/**
 * Created by sks on 2016/2/3.
 */
var app = (function(){
    var height;
    var iNow=0;
    var oSwitch = 'on';

    var handleInit = function(){
        if($(window).height()>500){
            height = $(window).height()-100;
            $('.full-height').height(height+'px');
        }else{
            height = 400;
            $('.full-height').height(400+'px');
        }
        setTimeout(function(){
            $('.lucency:eq('+iNow+')').animate({'opacity':'1'},1000);
        },500)
    };

    var handleOnResize = function(){
        $(window).resize(function(){
            if($(window).height()>500){
                height = $(window).height()-100;
                $('.full-height').height(height+'px');
            }else{
                height = 400;
                $('.full-height').height(400+'px');
            }
        });
    };

    var handleWheel = function (fn){
        function fnWheel(ev){
            var oEvent = ev||event;
            var bDown = true;
            //�ж�ʹ��wheelDelta����detail
            if(oEvent.wheelDelta){
                if(oEvent.wheelDelta<0){
                    bDown=true;
                }else{
                    bDown=false;
                }
            }else{
                if(oEvent.detail>0){
                    bDown=true;
                }else{
                    bDown=false;
                }
            }
            fn(bDown);
            oEvent.preventDefault&&oEvent.preventDefault();
            return false;
        }
        if($('#wheel').size()){
            if(window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
                window.document.addEventListener('DOMMouseScroll',fnWheel,false);
            }else{
                window.document.onmousewheel=fnWheel;
            }
        }
    };

    var handleToggle = function(){
        $('.dot').click(function(){
            iNow = $(this).index('.dot');
            present();
        });
    };

    var scrollFn = function(bDown){
        if(oSwitch=='off')return;
        oSwitch='off';
        setTimeout(function(){
            oSwitch='on';
        },1500);
        if(bDown){
            if(iNow<$('.dot').size()-1){
                iNow++;
            }
        }else{
            if(iNow>0){
                iNow--
            }
        }
        present();
    };

    //ͨ����ǰҳ��iNow���û�ҳ��Ч��
    var present = function(){
        $('.dot.active').removeClass('active');
        $('.dot:eq('+iNow+')').addClass('active');
        $('.page-content').animate({'top':-iNow*height+'px'},500,function(){
            $('.lucency:eq('+iNow+')').animate({'opacity':'1','filter':'alpha(opacity=100)'},1000);
        });
    };

    return {
        init:function(){
            handleInit();//���� ����.full-height�߶�
            handleOnResize();//���� ����.full-height�߶�
            handleWheel(scrollFn);//��������ҳ
            handleToggle();//���Բ�㻻ҳ
        }
    };
})();

jQuery(document).ready(function() {
    app.init(); // init core componets
});
