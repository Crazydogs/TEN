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
	removeObj: function( obj ){
		var index = this._getObjIndex(obj);
		this.objList.splice(index,1);
	},
	setObj: function( obj ){

	},
	paint: function(){
		for(i in objList){
			var obj = objList[i];
			var ctx = this.ctx;
			switch(obj.type){
				case 'rect':
					ctx.save();
					ctx.fillStyle = '#000000';
					ctx.globalAlpha = obj.alpha;
					ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
					ctx.restore();
					break;
				case 'circle':
					ctx.save();
					ctx.fillStyle = '#FFFFFF';
					ctx.globalAlpha = obj.alpha;
					ctx.beginPath();
					ctx.moveTo(obj.x, obj.y+obj.r);
					ctx.arc(obj.x+r, obj.y+r, obj.r, 0, Math.PI*2, true);
					ctx.fill();
					ctx.closePath();
					ctx.restore();
					break;
				case 'text':
					ctx.save();
					ctx.fillStyle = obj.color;
					ctx.globalAlpha = obj.alpha;
					ctx.fillText(obj.message, obj.x, obj.y);
					ctx.restore();
					break;
				default:
			}
		}
	},

	//private
	_getObjIndex: function( obj ){
		for(n in this.objList){
			if(this.objList[n]===obj){
				return n;
			}
		}
		return -1;
	}
};

render.init();