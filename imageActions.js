var cell = [], keep_cell = [], visited = [], keep_vis = [];
var coX,coY;


function infoCell(X, Y, ID)
{
	this.x = X;
	this.y = Y;
	this.id = ID;
}


(function()
{
	var coY,coX;
	
	
	//it is '/8',because we want the center of the cell.
	for(var i=1; i<=4; ++i)
	{
		coY = $('#hor_line' + i).offset().top - Height/8;
		
		for(var j=1; j<=4; ++j)
		{
			coX = $('#vert_line' + j).offset().left - Width/8;
			
			obj = new infoCell(coX, coY, -1);
			keep_cell.push(obj);
			
			keep_vis.push(false);
		}
		
		cell.push(keep_cell);
		keep_cell = []
		
		visited.push(keep_vis);
		keep_vis = [];
	}
	
})();


function euclidian_dist(x1, y1, x2, y2)
{
	return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
}


function InsertImage(Ttag, id, mouseX, mouseY)
{
	var minim_dist = -1, dist, val;
	var final_y,final_x, final_cellY, final_cellX, final_i,final_j;
	
	
	id = id.slice(3,id.length); //takes only the number of the 'id'.
	
	for(var i=0; i<4; ++i)
		for(var j=0; j<4; ++j)
		{
			dist = euclidian_dist(cell[i][j].y, cell[i][j].x, mouseY, mouseX);
			
			if(!visited[i][j] && (minim_dist == -1 || minim_dist > dist))
			{
				//we substract '/8',so with the prev '/8' we have now '/4',that means the 'up-left' angle of the cell.
				//with that we locate the image correctly into the cell.
				final_y = cell[i][j].y - Height/8;
				final_x = cell[i][j].x - Width/8;
				
				final_cellY = cell[i][j].y;
				final_cellX = cell[i][j].x;
				
				final_i = i;
				final_j = j;
				
				minim_dist = dist;
			}
		}
	
	
	image_location[id-1].y = final_cellY; //image locations is equal with cell's location.
	image_location[id-1].x = final_cellX;
	
	cell[final_i][final_j].id = id; //cell's id takes is equal with the id of image.
	visited[final_i][final_j] = true; //cell is visited.
	
	
	$(Ttag).css(
	{
		position: 'fixed',
		zIndex: 1,
		top: final_y + 'px',
		left: final_x + 'px'
	});
}


function RemoveImage(id)
{
	id = id.slice(3,id.length); //takes only the number of the 'id'.
	
	
	for(var i=0; i<4; ++i)// checks if an image removed from a cell,so to make the cell unvisited again.
		for(var j=0; j<4; ++j)
		{
			if(image_location[id-1].y == cell[i][j].y  &&  image_location[id-1].x == cell[i][j].x)
			{
				cell[i][j].id = -1;	
				visited[i][j] = false;
				break;
			}
		}
}


function convert2DTo1D(n1, n2)
{
	return 4*n1 + n2 + 1;
}


function win()
{
	var val;
	
	
	for(var i=0; i<4; ++i)
		for(var j=0; j<4; ++j)
		{
			val = convert2DTo1D(i, j);
			
			if(val != cell[i][j].id)  //check if cell's id is equal with the correct id.
				return false;
		}
	
	
	return true;
}