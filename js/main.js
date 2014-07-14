var main = {

	state: 'ready', // states: ready, wait, paint, over
	turn: 'w', // turn: w for white player, b for black
	canvas: null,
	ctx: null,

	// obj to render
	Shape: function(x, y, a, id, state){
		this.x = x;
		this.y = y;
		this.alpha = a;
		// states: aw for active white point, ab for active black point,
		// w for fixed white point, b for fixed black point,
		// bw for big white point, bb for big black point
		this.state = state;
		this.id = id;
	},
	Rect: function(x, y, w, h, a, id, state){
		main.Shape.call(this, x, y, a, id, state);
		this.width = w;
		this.height = h;
		this.type = 'rect';
	},
	Circle: function(x, y, r, a, id, state){
		main.Shape.call(this, x, y, a, id, state);
		this.radius = r;
		this.type = 'circle';
	},
	Text: function(x, y, a, c, m, s, id){
		main.Shape.call(this, x, y, a);
		this.color = c;
		this.type = 'text';
		this.message = m;
		this.size = s;
		this.id = id;
	},

	// event
	click: function(e){
		var x = e.clientX - this.offsetLeft + window.scrollX;
		var y = e.clientY - this.offsetTop + window.scrollY;
		switch(main.state){
			case 'ready':
			case 'paint':
			case 'over':
				break;
			case 'wait':
				var objId = main._checkClickObj(x, y);
				// user click the point
				if(objId){
					var obj  = render.objList[render._getObjIndex(objId)];
					// make one move
					if(main.turn == 'w'){
						if(obj.state == 'aw'){
							main._playChess(obj, 'w'); // argument: location, color
						}
					}else if(main.turn == 'b'){
						if(obj.state == 'ab'){
							main._playChess(obj, 'b');
						}
					}
				}
				break;
		}
	},

	// process
	init: function(){
		var width = (render.width ? render.width : document.getElementById('main').width);
		var height = (render.height ? render.height : document.getElementById('main').height);
		// argument: x, y, alpha, color, message, size, id
		var title = new this.Text(width/2, 100, 1, '#ffffff', 'TEN', 80, 't1');
		render.addObj(title);
		// create the board
		for (var i = 1; i < 10; i++) {
			for (var j = 1; j < 10; j++) {
				// size of the point is 17, margin of each point is 9
				// size of each sudoku is 120, margin of each sudoku is 20
				var x = 50 + ((i-1)%3)*140 + ((j-1)%3)*43;
				var y = 150 + Math.floor((i-1)/3)*140 + Math.floor((j-1)/3)*43;
				var newShape = new this.Circle(x, y, 17, 1, 's'+i+j, 'aw');
				render.addObj(newShape);
			}
		}
		render.paint();
		// wait for click event
		this.state = 'wait';
	},

	// private
	// check if the user click the point, if so, return the point`s id, if not, return false
	_checkClickObj: function(x, y){
		var list = render.objList;
		var i;
		for(var i in list){
			var obj = list[i];
			if(obj.type === 'rect' || obj.type === 'circle'){
				if(x >= obj.x && x <= (obj.x+(obj.radius*2)) && y >= obj.y && y <= (obj.y+(obj.radius)*2)){
					return obj.id;
				}
			}
		}
		return false;
	},
	// user action, make one move
	_playChess: function(obj, color){
		main.state = 'paint';
		// todo: animation of the move
		if(color == 'w'){
			obj.state = 'w';
		}else if(color == 'b'){
			obj.state = 'b';
		}
		render.paint();
		if(judge.smallJudge(obj)){
			// todo: if this move make a win in the area
		}
		main.state = 'wait';
	}
};

main.canvas = document.getElementById('main');
main.canvas.addEventListener('click', main.click, false);
main.ctx = main.canvas.getContext('2d');
main.init();