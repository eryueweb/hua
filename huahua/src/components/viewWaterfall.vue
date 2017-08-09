<template>
    <div>
        <div class="scrollbar" id="scrollBox">
            <div class="side-waterfall">
                <a href="javascript:" class="cell" v-for="(picItem,index) in picDataC" :style="{margin: picSpacing/2+'px',width: picWidth+'px',height:picItem.height?picItem.height+'px':''}" @click="picClick(picItem.type,picItem.id,index)">
                    <img :src="picItem.picUrl" />
                </a>
                <div class="loading" v-if="isPreloadingC" :class="{'first-loading':isFirstTime}">
                    <div class="double-bounce1"></div>
                    <div class="double-bounce2"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    const Ps = require('perfect-scrollbar');
    const winWidth = 277;
    export default{
        name: 'view-waterfall',
        props: {
            picSpacing: {
                type: Number,
                default: 8
            },
            picWidth: {
                type: Number,
                default: 240
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
                columnCount: NaN,
                beginIndex: NaN,
                page: 1,
                pageSize: 16,
                picBoxEls: null,
                loadedCount: 0,
                isPreloading: true,
                isPreloadingC: true,
                isFirstTime: true
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
                let scrollBox = document.getElementById('scrollBox');
                if((v == (scrollBox.scrollHeight-scrollBox.offsetHeight)) && this.isLoad){
                    this.page += 1;
                    this.preload()
                }
            },
            activeType(v){
                this.picData = [];
                this.picTopData = [];
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
                return this.picWidth
            }
        },
        mounted(){
            let vm = this;
            let scrollBox = document.getElementById('scrollBox');
            vm.initColumnCount();

            vm.preload();

            vm.scrollBar();

            scrollBox.addEventListener('scroll',()=>{
                if(vm.isPreloading) return;
                vm.scrollLoad();
            });

        },
        methods: {
            waterfall(){
                let vm = this;
                for(let i=vm.beginIndex;i<vm.picNum;i++){
                    let minHeight = Math.min.apply(null,vm.picTopData);
                    let minIndex = vm.picTopData.indexOf(minHeight);
                    let width = vm.picBoxEls[0].offsetWidth+vm.picSpacing;
                    let center = (winWidth-vm.columnCount*width)/2;
                    vm.picBoxEls[i].style.position = 'absolute';
                    vm.picBoxEls[i].style.left = center+minIndex * width + "px";
                    vm.picBoxEls[i].style.top = minHeight + 'px';

                    vm.$set(vm.picTopData,minIndex,minHeight+vm.picBoxEls[i].offsetHeight+vm.picSpacing);
                }
                vm.beginIndex = vm.picData.length;
            },
            // 滚动加载
            scrollLoad(){
                let scrollBox = document.getElementById('scrollBox');

                this.scroll = scrollBox.scrollTop;
            },
            preload(){
                let vm = this;
                vm.$http.get('/data/pic/getPic/'+vm.activeType+'/'+vm.page+'/'+vm.pageSize).then(response=>{
                    let len = response.body.length+vm.pageSize*(vm.page-1);
                    if(response.body.length > 0){
                        response.body.forEach(function(val,i){
                            vm.picData.push(val);
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
            scrollBar(){
                let scrollBox = document.getElementById('scrollBox');
                Ps.initialize(scrollBox);
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
                    vm.$nextTick(()=>{
                        vm.initPicBoxEls();
                        console.log(vm.picTopData);
                        if(vm.picTopData.length == 0) vm.initPicTopData();
                        vm.waterfall();
                    })
                }
            },
            initPicTopData(){
                let vm = this;
                vm.picTopData = [];
                for(let i=0;i<(vm.columnCount>vm.picData.length?vm.picData.length:vm.columnCount);i++){
                    vm.picBoxEls[i].style.position = 'absolute';
                    let height = vm.picBoxEls[i].offsetHeight+vm.picSpacing;
                    let width = vm.picBoxEls[0].offsetWidth+vm.picSpacing;
                    let center = (winWidth-vm.columnCount*width)/2;
                    vm.picBoxEls[i].style.left = center+i * width + "px";
                    vm.picBoxEls[i].style.top = 0;
                    this.picTopData.push(height);
                }
                console.log(vm.picTopData);
            },
            initColumnCount(){
                this.columnCount = 3;
                this.beginIndex = this.columnCount;
            },
            initPicBoxEls(){
                this.picBoxEls = document.getElementsByClassName('cell');
            },
            picClick(type,id,index){
                let vm = this;
                vm.$emit('picClick',type,id,index)
            }
        }
    }
</script>
<style scoped>
    @import '/static/css/perfect-scrollbar.min.css';
    /*viewFall*/
    .scrollbar{position: relative;width: 277px;height: 480px;padding-right: 10px;overflow: auto;}
    .side-waterfall{position: relative;min-height: 480px;}
    .cell{position: relative;display: inline-block;background: #fff;}
    .cell img{width: 100%;}    
    
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