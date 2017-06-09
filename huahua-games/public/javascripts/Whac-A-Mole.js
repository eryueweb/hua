'use strict';
function game(){
	this.init()
}
game.prototype = {
	init: function(){
		var _this = this;
		_this.render(_this.options.len)
	},
	boxDiv: document.getElementById('gameBox'),
	options: {
		'len': 4,
		'color': '#444',
		'speed': 5,
		'during': 20,
		'blockHeight': 150,
		'core': 0
	},
	render: function(len){
		var _this = this;
		var boxDiv = _this.boxDiv;
		for(var i = 0;i<len;i++){
			var rowDiv = document.createElement('div');
			var index = Math.floor(Math.random()*len);
			_this.renderRow(rowDiv,len,index,_this.options.color);
			if(i == len-1){
				rowDiv.children[index].innerHTML = 'start';
				rowDiv.children[index].setAttribute('id','start');
			}
			boxDiv.appendChild(rowDiv);
		}
		_this.start();
	},
	renderRow: function(rowDiv,len,index,color){
		rowDiv.className = 'row clear';
		for(var j = 0;j<len;j++){
			var blockDiv = document.createElement('div');
			blockDiv.className="block";
			if(j != index){
				blockDiv.className += " white";
			}else{
				blockDiv.style.backgroundColor = color;
				blockDiv.className += ' hello';
			}
			rowDiv.appendChild(blockDiv);
		}
	},
	addRow: function(){
		var _this = this;
		var rowDiv = document.createElement('div');
		var index = Math.floor(Math.random()*4);
		_this.renderRow(rowDiv,_this.options.len,index,_this.options.color);
		_this.boxDiv.insertBefore(rowDiv,_this.boxDiv.children[0]);
	},
	start: function(){
		var _this = this;
		document.getElementById('start').onclick = function(e){
			e.target.innerHTML = '';
			_this.move(_this.options.speed);
			_this.hello(e)
		}
	},
	end: function(timer){
		clearInterval(timer);
		document.getElementById('current-core').innerHTML = '';
		document.getElementById('dialog').style.display = 'block';
		document.getElementById('core').innerHTML = this.options.core;
	},
	hello: function(e){
		var coreP = document.getElementById('current-core');
		this.options.core++;
		coreP.innerHTML = this.options.core;

		e.target.style.backgroundColor = '#ccc';
		e.target.style.cursor = 'default';
		e.target.onclick = null;
	},
	stepOnWhite: function(timer){
		var _this = this;
		var whiteBlocks = document.getElementsByClassName('white');
		for(var i = 0;i<whiteBlocks.length;i++){
			whiteBlocks[i].onclick = function(){
				_this.end(timer)
			}
		}
	},
	stepOnHello: function(){
		var _this = this;
		var helloBlocks = document.getElementsByClassName('hello');
		for(var i = 0;i<helloBlocks.length;i++){
			helloBlocks[i].onclick = function(e){
				_this.hello(e)
			}
		}
	},
	move: function(speed){
		var _this = this;
		_this.addRow();
		_this.boxDiv.style.top = '-'+_this.options.blockHeight+'px';
		var timer = setInterval(function(){
			var top = window.getComputedStyle(_this.boxDiv,null).top;
			var step = parseInt(top) + speed;
			// 踩到白块
			_this.stepOnWhite(timer);
			// 踩到hello
			_this.stepOnHello();
			// 新增一行&移除第一行
			if(step >= 0){
				_this.addRow();
				_this.boxDiv.removeChild(_this.boxDiv.children[_this.boxDiv.children.length-1]);
				step = -_this.options.blockHeight;
			}
			_this.boxDiv.style.top = step + 'px';
		},_this.options.during);

	}
};
new game();