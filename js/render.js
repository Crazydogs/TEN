var render = {

	width: null,
	height: null,
	ctx: null,
	objList: [],

	init: function(){
		var canvas = document.getElementById('main');
		if(!(this.width && this.height)){
			this.width = canvas.width;
			this.height = canvas.height;
		}
		this.ctx = canvas.getContext('2d');
		this.ctx.fillStyle = '#888888';
		this.ctx.fillRect(0, 0, this.width, this.height);
	},
	addObj: function( obj ) {
		this.objList.push(obj);
	},
	removeObj: function( id ){
		var index = this._getObjIndex(id);
		this.objList.splice(index,1);
	},
	paint: function(){
		var ctx = this.ctx;
		ctx.save();
		ctx.fillStyle = '#888888';
		ctx.fillRect(0, 0, this.width, this.height);
		ctx.restore();
		for(var i in render.objList){
			var obj = render.objList[i];
			switch(obj.type){
				case 'rect':
					ctx.save();
					if(obj.state == 'b' || obj.state =='bb'){
						ctx.fillStyle = '#000000';
					}else if(obj.state == 'ab'){
						ctx.fillStyle = '#333333';
					}else if(obj.state == 'f'){
						ctx.fillStyle = '#777777';
					}
					ctx.globalAlpha = obj.alpha;
					ctx.fillRect(obj.x, obj.y, obj.radius*2, obj.radius*2);
					ctx.restore();
					break;
				case 'circle':
					ctx.save();
					if(obj.state == 'w' || obj.state == 'bw'){
						ctx.fillStyle = '#FFFFFF';
					}else if(obj.state == 'aw'){
						ctx.fillStyle = '#DDDDDD';
					}else if(obj.state == 'f'){
						ctx.fillStyle = "#AAAAAA";
					}
					ctx.globalAlpha = obj.alpha;
					ctx.beginPath();
					ctx.moveTo(obj.x, obj.y+obj.radius);
					ctx.arc(obj.x+obj.radius, obj.y+obj.radius, obj.radius, 0, Math.PI*2, true);
					ctx.fill();
					ctx.closePath();
					ctx.restore();
					break;
				case 'text':
					ctx.save();
					ctx.fillStyle = obj.color;
					ctx.globalAlpha = obj.alpha;
					ctx.font = obj.size + 'px Arial';
					ctx.textAlign = 'center';
					ctx.fillText(obj.message, obj.x, obj.y);
					ctx.restore();
					break;
				default:
			}
		}
	},

	//private
	_getObjIndex: function( id ){
		for(var n in render.objList){
			if(render.objList[n].id === id){
				return n;
			}
		}
		return -1;
	},
	// do the same process to each obj in the render`s objList
	forEachObj: function(fn){
		var i;
		var list = render.objList;
		for(i in list){
			var obj = list[i];
			fn(obj);
		}
	}
};

render.init();