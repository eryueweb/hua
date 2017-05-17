(function($){
    $.fn.extend({'slider':function(options){
        var defaults = {
            width: 1200,
            bannerData: [{target: 'javascript:',picUrl: 'imgs/index/pic_2.jpg'}]
        };
        var setting = $.extend(defaults,options);
        var $this = $(this);
        var $picBox= $this.find('.pics-box');
        var $prev= $this.find('.pre');
        var $next= $this.find('.next');
        var $dots= $this.find('.dots-ul');
        var pages = setting.bannerData.length;
        var current = 0;
        var isAutoFlag = true;
        var methods = {
            render: function(){
                $picBox.css({width: '1200px',height: '270px'});
                for(var i = 0;i < pages;i++){
                    if(i != current){
                        $picBox.append('<a href="'+setting.bannerData[i].target+'" target="_blank"><img src="'+setting.bannerData[i].picUrl+'"></a>');
                        if(pages>1){
                            $dots.append('<li class="dot-li"></li>')
                        }
                    }else{
                        $picBox.append('<a href="'+setting.bannerData[i].target+'" class="current-pic" target="_blank"><img src="'+setting.bannerData[i].picUrl+'"></a>');
                        if(pages>1){
                            $dots.append('<li class="dot-li current-dot"></li>')
                        }
                    }
                }
            },
            show: function(){
                var self = this;
                $prev.on('click',function(){
                    current--;
                    if(current == -1){
                        current = pages-1
                    }
                    self.animation();
                });
                $next.on('click',function(){
                    current++;
                    if(current == pages){
                        current = 0
                    }
                    self.animation();
                });
                $dots.find('li').hover(function(){
                    var index = $(this).index();
                    $(this).addClass('current-dot').siblings().removeClass('current-dot');
                    $picBox.find('a:eq('+index+')').fadeIn().siblings().fadeOut()
                });

                $('.current-pic').siblings().hide();
                $prev.hide();
                $next.hide();
            },
            animation: function(){
                $picBox.find('a:eq('+current+')').fadeIn().siblings().fadeOut();
                $dots.find('li:eq('+current+')').addClass('current-dot').siblings().removeClass('current-dot')
            },
            picHover: function(){
                $this.on('mouseover',function(){
                    isAutoFlag = false;
                    $prev.show();
                    $next.show();
                });
                $this.on('mouseout',function(){
                    isAutoFlag = true;
                    $prev.hide();
                    $next.hide();
                });
            },
            auto: function(){
                var self = this;
                if(pages>1){
                    self.picHover()
                }
                setInterval(function(){
                    if(isAutoFlag){
                        current++;
                        if(current == pages){
                            current = 0
                        }
                        self.animation()
                    }
                },3000)
            },
            init: function(){
                this.render();
                this.show();
                this.auto()
            }
        };
        methods.init();
        return $this
    }})
})(jQuery);