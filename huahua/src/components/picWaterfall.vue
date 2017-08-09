<template>
    <div>
        <div v-for="(picItem,i) in picDataC" class="pic-box" :style="{padding: picSpacing/2+'px',width: isMobile?'':picBoxWidth+'px','box-sizing':'border-box'}">
            <div class="act-w" :style="{width: picWidthC+'px',height:picItem.height?picItem.height+'px':''}">
                <a class="img-w" href="javascript:" @click="picView()" @mouseenter="mouseenterImg(picItem.type,picItem.id,i)" @mouseleave="mouseleaveImg(picItem.type,picItem.id,i)">
                    <img :src="picItem.picUrl" />
                    <div class="cover" v-if="picType===picItem.type&&picId===picItem.id"></div>
                </a>
                <a href="javascript:" class="action actionBg" v-if="picType===picItem.type&&picId===picItem.id" @mouseenter="mouseenterHeart(picItem.type,picItem.id,i)" @click.once="toHeart(picItem.type,picItem.id,i)"><i class="fa fa-heart" :class="{isHeart:isHeartList[i],noHeart:!isHeartList[i]}"></i></a>
            </div>
            <p class="text-w">{{picItem.instruction}}</p>
            <p class="rate"><i class="fa fa-heart"></i><span class="like">{{picItem.heartNum}}</span></p>
        </div>
        <div class="loading" v-if="isPreloadingC" :class="{'first-loading':isFirstTime}">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
        </div>
    </div>
</template>
<script>
    let winWidth = document.body.clientWidth;
    export default{
        name: 'pic-waterfall',
        props: {
            picSpacing: {
                type: Number,
                default: 8
            },
            picWidth: {
                type: Number,
                default: 232
            },
            activeType: {
                type: String,
                required: true
            },
            picType: {
                type: String,
                required: true
            },
            picId: {
                required: true
            }
        },
        data(){
            return {
                scroll: 0,
                isLoad: true,
                picData: [],
                picDataC: [],
                picTopData: [],
                isCoverArr: [],
                isHeartArr:[],
                columnCount: NaN,
                beginIndex: NaN,
                page: 1,
                pageSize: 20,
                picBoxEls: null,
                loadedCount: 0,
                isPreloading: true,
                isPreloadingC: true,
                isFirstTime: true,
                isMobile: false
            }
        },
        watch: {
            isPreloading(v){
                if(v){
                    setTimeout(()=>{
                        if(!this.isPreloading) return;
                        this.isPreloadingC = true
                    },500) 
                }else{
                    this.isPreloadingC = false
                }
            },
            scroll(v){
                if((v == (document.body.scrollHeight-window.innerHeight)) && this.isLoad){
                    this.page += 1;
                    this.preload()
                }
            },
            activeType(v){
                this.picData = [];
                this.picTopData = [];
                this.isHeartArr = [];
                this.page = 1;
                this.loadedCount = 0;
                this.isLoad = true;
                this.isPreloading = true;
                this.isFirstTime = true;
                this.initColumnCount();
                this.preload();
            }
        },    
        computed: {
            picBoxWidth(){
                return (this.picWidth + this.picSpacing)
            },
            picNum(){
                return this.picData.length
            },
            picWidthC(){
                return this.isMobile ? window.innerWidth/2 - this.picSpacing : this.picWidth
            },
            isHeartList(){
                return this.isHeartArr
            },
            isCoverList(){
                return this.isCoverArr
            }
        },
        mounted(){
            let vm = this;
            vm.initIsMobile();
            vm.initColumnCount();

            vm.preload();

            window.addEventListener('resize',()=>{
                vm.initColumnCount();
                vm.initPicTopData();
                vm.waterfall();
            });

            window.addEventListener('scroll',()=>{
                if(vm.isPreloading) return;
                vm.scrollLoad();
            })

        },
        methods: {
            waterfall(){
                let vm = this;
                for(let i=vm.beginIndex;i<vm.picNum;i++){
                    let minHeight = Math.min.apply(null,vm.picTopData);
                    let minIndex = vm.picTopData.indexOf(minHeight);
                    let width = vm.picBoxEls[0].offsetWidth;
                    let center = (winWidth-vm.columnCount*width)/2;
                    vm.picBoxEls[i].style.position = 'absolute';
                    vm.picBoxEls[i].style.left = center+minIndex * width + "px";
                    vm.picBoxEls[i].style.top = minHeight + 'px';

                    vm.$set(vm.picTopData,minIndex,minHeight+vm.picBoxEls[i].offsetHeight);
                }
                vm.beginIndex = vm.picData.length;
            },
            // 滚动加载
            scrollLoad(){
                this.scroll = window.scrollY || document.documentElement.scrollTop;
            },
            preload(){
                let vm = this;
                vm.$http.get('/data/pic/getPic/'+vm.activeType+'/'+vm.page+'/'+vm.pageSize).then(response=>{
                    let len = response.body.length+vm.pageSize*(vm.page-1);
                    if(response.body.length > 0){
                        response.body.forEach(function(val,i){
                            vm.picData.push(val);

                            vm.isHeartArr[i] = false;

                            if((vm.pageSize*(vm.page-1)+i)<vm.loadedCount) return;
                            let oImg = new Image();
                            oImg.src = val.picUrl;
                            oImg.addEventListener('load',(e)=>{
                                vm.loadFn(e,oImg,i,len)
                            });
                            if(response.body.length < vm.pageSize){
                                vm.isLoad = false
                            }
                        });
                    }else{
                        vm.isLoad = false
                    }
                });
            },
            loadFn(e,oImg,i,length){
                let vm = this;
                vm.loadedCount++;
                if(e.type == 'load'){
                    vm.$set(vm.picData[i],'height',Math.round(vm.picWidthC / (oImg.width / oImg.height)));
                }
                if(vm.loadedCount == length){
                    vm.picDataC = vm.picData.concat([]);
                    vm.isPreloading = false;
                    vm.isFirstTime = false;
                    this.$nextTick(()=>{
                        this.initPicBoxEls();
                        if(vm.picTopData.length == 0) vm.initPicTopData();
                        vm.waterfall();
                    })
                }
            },
            picView(){
                this.$emit('picView')
            },
            mouseenterImg(type,id,index){
                this.$emit('mouseenterImg',type,id,index)
            },
            mouseleaveImg(type,id,index){
                this.$emit('mouseleaveImg',type,id,index)
            },
            mouseenterHeart(type,id,index){
                this.$emit('mouseenterHeart',type,id,index)
            },
            toHeart(type,id,index){
                this.$emit('toHeart',type,id,index)
            },
            initPicTopData(){
                let vm = this;
                vm.picTopData = [];
                for(let i=0;i<(vm.columnCount>vm.picData.length?vm.picData.length:vm.columnCount);i++){
                    vm.picBoxEls[i].style.position = 'absolute';
                    let height = vm.picBoxEls[i].offsetHeight;
                    let width = vm.picBoxEls[0].offsetWidth;
                    let center = (winWidth-vm.columnCount*width)/2;
                    vm.picBoxEls[i].style.left = center+i * width + "px";
                    vm.picBoxEls[i].style.top = 0;
                    this.picTopData.push(height);
                }
            },
            initColumnCount(){
                winWidth = winWidth < 1200 ? 1200 : winWidth;

                if(winWidth >= this.picBoxWidth * 2){
                    this.columnCount = Math.floor(winWidth/this.picBoxWidth);
                }else{
                    this.columnCount = this.isMobile ? 2 : 1;
                }
                this.beginIndex = this.columnCount;
            },
            initPicBoxEls(){
                this.picBoxEls = document.getElementsByClassName('pic-box');
            },
            initIsMobile(){
                if(navigator.userAgent.match(/(iphone|ipad|Android|ios)/i)) this.isMobile = true;
            },
            picClick(type,id,index){
                let vm = this;
                vm.isCoverArr.forEach(function(val,i){
                    vm.isCoverArr[i] = true;
                });
                vm.isCoverArr[index] = false;
                vm.$emit('picClick',type,id,index)
            }
        }
    }
</script>
<style scoped>
    /*picFall*/
    .pic-box{display: inline-block;background: #fff;background-clip:content-box;}
    .img-w{position: relative;display: inline-block;width: 100%;}
    .pic-box img{width: 100%;}
    .text-w{padding: 10px;font-size: 12px;color: #444;overflow: hidden;text-overflow:ellipsis;white-space:nowrap;}
    .rate{padding: 0 10px 10px;}
    .like{padding: 0 6px;color: #8c7e7e;font-size: 12px;}
    .action{position: absolute;z-index: 10;top: 10px;right: 10px;padding: 6px 8px;border: 1px solid rgba(0,0,0,.2);}
    .actionBg{background: linear-gradient(#fafafa,#f2f2f2);}
    .actionHoverBg{background: #fff;}
    .isHeart{color: #f00;}
    .noHeart{color: #A6A6A6;}
    .fa-heart.like-act{color: #f00;}
    .cover{position:absolute;z-index: 2;top: 0;left: 0;width: 100%;height: 100%;background: rgba(255,255,255,.1);}
    .isHeart{color: #f00;}
    .noHeart{color: #A6A6A6;}
    /*viewFall*/
    .cell{position: relative;display: inline-block;background: #fff;}
    .cell img{width: 100%;}
    .cell .cover{position: absolute;z-index: 100;top: 0;left: 0;width: 100%;height: 100%;background-color: rgba(255,255,255,.3);}

    .loading {
        text-align: center;
        width: 100%;
        position: fixed;
        bottom: 10px;
        left: 50%;
        margin-left: -15px;
        width: 30px;
        height: 30px;
    }
    .loading.first-loading {
        top: 50%;
        margin-top: -15px;
    }
    .double-bounce1,.double-bounce2 {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #67CF22;
        opacity: 0.6;
        position: absolute;
        top: 0;
        left: 0;
        animation: bounce 2.0s infinite ease-in-out;
    }
    .double-bounce2{animation-delay: -1.0s;}
    @keyframes bounce {
        0%,100% {
          transform: scale(0.0);
        }
        50% {
          transform: scale(1.0);
        }
    }
</style>