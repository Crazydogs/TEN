var judge = {
	// check if the player make a three, or even win the game
	smallJudge: function(obj){
		var color = obj.state;
		// obj.id likes 's35', means the point is at the 5th positon in the 3rd area.
		var area = obj.id.slice(1,2);
		var objPosition = obj.id.slice(2,3);
		// a list of points`s position in same area as the argument
		var pointsInArea = [];
		var list = render.objList;
		// find out all points that in the same area and have the same color,
		// then put there position number into the array.
		for(var i in list){
			var obj = list[i];
			var position = obj.id.slice(2,3);
			if(obj.color === color && obj.id.slice(1,2) === area){
				pointsInArea.push(position);
			}
		}
		return judge._judge(objPosition, pointsInArea);
	},
	//
	_judge: function(position, array){
		var row = Math.floor((position-1)/3);
		var rank = (position-1)%3;
		var rowCount = 0;
		var rankCount = 0;
		for(var i = 1; i < 10; i++){
			if(Math.floor((i-1)/3) == row){
				if(judge._isInArray(i, array)){
					rowCount++;
				}
			}
			if((i-1)%3 == rank){
				if(judge._isInArray(i, array)){
					rankCount++;
				}
			}
		}
		var leftSlash = (judge._isInArray(1,array) && judge._isInArray(5,array) && judge._isInArray(9,array));
		var rightSlash = (judge._isInArray(3,array) && judge._isInArray(5,array) && judge._isInArray(7,array));
		if(rowCount == 3 || rankCount == 3 || leftSlash || rightSlash){
			return true;
		}else{
			return false;
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
}