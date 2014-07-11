var main = {

	state: 'ready', // states: ready, wait, paint, over
	canvas: null,
	ctx: null,

	// obj to render
	Shape: function(x, y, a){
		this.x = x;
		this.y = y;
		this.alpha = a;
	},
	Rect: function(x, y, w, h, a){
		main.Shape.call(this, x, y, a);
		this.width = w;
		this.height = h;
		this.type = 'rect';
	},
	Circle: function(x, y, r, a){
		main.Shape.call(this, x, y, a);
		this.radius = r;
		this.type = 'circle';
	},
	Text: function(x, y, a, c, m){
		main.Shape.call(this, x, y, a);
		this.color = c;
		this.type = 'text';
		this.message = m;
	},

	//event
	click: function(e){
		var x = e.clientX - this.offsetLeft + window.scrollX;
		var y = e.clientY - this.offsetTop + window.scrollY;
		console.log(x+" "+y);
	},

	init: function(){
		this.state = 'ready';
		var title = new this.Text();
	}
};

main.canvas = document.getElementById('main');
main.canvas.addEventListener('click', main.click, false);
main.ctx = canvas.getContext('2d');