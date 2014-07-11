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
	setObj: function( obj ){

	},
	paint: function(){
		var ctx = this.ctx;
		ctx.save();
		ctx.fillStyle = '#888888';
		ctx.fillRect(0, 0, this.width, this.height);
		ctx.restore();
		for(i in render.objList){
			var obj = render.objList[i];
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
		for(n in render.objList){
			if(render.objList[n].id === id){
				return n;
			}
		}
		return -1;
	}
};

render.init();