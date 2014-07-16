var main = {

	state: 'ready', // states: ready, wait, paint, over
	turn: 'w', // turn: w for white player, b for black
	canvas: null,
	ctx: null,
	winListw: [],
	winListb: [],

	// obj to render
	Shape: function(x, y, r, a, id, state, type){
		this.x = x;
		this.y = y;
		this.alpha = a;
		this.radius = r;
		this.type = type;
		// states: aw for active white point, ab for active black point,
		// w for fixed white point, b for fixed black point,
		// bw for big white point, bb for big black point
		this.state = state;
		this.id = id;
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
				render.removeAll();
				main._addPoints();
				main._addTitle();
				main.state = 'wait';
				render.paint();
				break;
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
		main._addTips();
		main._addTitle();
		render.paint();
		// wait for click event
		this.state = 'ready';
	},

	// creat some message to tell player how to play
	_addTips: function(){
		var message = [
			'This game is a Tic-tac-toe game.',
			'',
			'Get three-in-a-row in any of the nine area,',
			'make you win a this area on the master grid.',
			'',
			'Where you play in the small grid dictates in',
			'which grid your opponent plays next turn',
			'',
			'Playing into a grid that is already won',
			'allows your opponent to pick any grid he wants',
			'',
			'Three-in-a-row on the master grid wins!'
		];
		for(var i in message){
			var newMessage = new main.Text(250, i*30+150, 1, '#FFFFFF', message[i], 24, 'm'+i);
			render.addObj(newMessage);
		}
	},
	// creat 81 points and add to the render list
	_addPoints: function(){
		for (var i = 1; i < 10; i++) {
			for (var j = 1; j < 10; j++) {
				// size of the point is 17, margin of each point is 9
				// size of each sudoku is 120, margin of each sudoku is 20
				var x = 50 + ((i-1)%3)*140 + ((j-1)%3)*43;
				var y = 150 + Math.floor((i-1)/3)*140 + Math.floor((j-1)/3)*43;
				var newShape = new this.Shape(x, y, 17, 1, 's'+i+j, 'aw', 'circle');
				render.addObj(newShape);
			}
		}
	},
	// creat a title obj and add to the render list
	_addTitle: function(){
		var title = new this.Text(250, 100, 1, '#FFFFFF', 'TEN', 80, 't1');
		render.addObj(title);
	},

	// user action, make one move
	_playChess: function(obj, color){
		var position = obj.id.slice(2,3);
		main.state = 'paint';
		// todo: animation of the move
		if(color == 'w'){
			obj.state = 'w';
		}else if(color == 'b'){
			obj.state = 'b';
		}
		render.paint();
		// if this move make the user win in the small area
		if(judge.smallJudge(obj)){
			var area = obj.id.slice(1,2)
			if(color == 'w'){
				main.winListw.push(area);
			}else if(color == 'b'){
				main.winListb.push(area);
			}
			var area = obj.id.slice(1,2);
			var removeList = [];
			render.forEachObj(function(o){
				if(o.id.slice(1,2) === area && o.id.slice(0,1) === 's'){
					removeList.push(o.id);
				}
			});
			for(var j in removeList){
				render.removeObj(removeList[j]);
			}
			if(color == 'w'){
				// arguments: x, y, radius, alpha, id, state, type
				var newCircle = new main.Shape(50+((area-1)%3)*140, 150+Math.floor((area-1)/3)*140, 60, 1, 'b'+area, 'b'+color, 'circle');
				render.addObj(newCircle);
			}else if(color == 'b'){
				// arguments: x, y, radius, alpha, id, state, type
				var newRect = new main.Shape(50+((area-1)%3)*140, 150+Math.floor((area-1)/3)*140, 60, 1, 'b'+area, 'b'+color, 'rect');
				render.addObj(newRect);
			}
			render.paint();
			// todo: if win the whole game
			if(judge.bigJudge(area, main['winList'+color])){
				alert('win!');
			}
			main._nextTurn(color,position);
		}
		main._nextTurn(color, position);
		main.state = 'wait';
	},

	_nextTurn: function(color, position){
		if(color == 'w'){
			main.turn = 'b';
		}else if(color == 'b'){
			main.turn = 'w';
		}
		main._changeShape(color, position);
		render.paint();
	},

	// check if the user click the point, if so, return the point`s id, if not, return false
	_checkClickObj: function(x, y){
		var list = render.objList;
		for(var i in list){
			var obj = list[i];
			if(x >= obj.x && x <= (obj.x+(obj.radius*2)) && y >= obj.y && y <= (obj.y+(obj.radius)*2)){
				return obj.id;
			}
		}
		return false;
	},
	_changeShape: function(color, position){
		if(color == 'w'){
			render.forEachObj(function(o){
				if(o.state == 'aw' || o.state == 'f'){
					o.state = 'ab';
					o.type = 'rect';
				}
			});
		}else if(color == 'b'){
			render.forEachObj(function(o){
				if(o.state == 'ab' || o.state == 'f'){
					o.state = 'aw';
					o.type = 'circle';
				}
			});
		}
		if(!(main._isInArray(position, main.winListw) || main._isInArray(position, main.winListb))){
			render.forEachObj(function(o){
				if(!(o.id.slice(1,2) == position || o.state == 'w' || o.state == 'b' || o.state == 'bw' || o.state == 'bb' || o.type == 'text')){
					o.state = 'f';
					var a =1;
				}
			});	
		}
	},
	_isInArray: function(obj, array){
		for(var i = 0; i<array.length; i++){
			if(obj === array[i]){
				return true;
			}
		}
		return false;
	}
};

main.canvas = document.getElementById('main');
main.canvas.addEventListener('click', main.click, false);
main.ctx = main.canvas.getContext('2d');
main.init();
