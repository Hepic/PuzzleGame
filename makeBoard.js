var tag;
var Height = $('div#container').height(), Width = $('div#container').width();
var img_id,img_src;
var hor_line_id, hor_line_px;
var vert_line_id, vert_line_px;
var shuffle_images = [], image_location = []



for(var i=1; i<=16; ++i)
{
	shuffle_images.push(i);
	image_location.push( {x:0, y:0} ); //keep location of each image.
}
	
for(var i=0; i<16; ++i)//shuffle
{
	var pos = Math.floor( Math.random()*10 );
	
	if(pos>=0 && pos<16)
	{
		var temp = shuffle_images[i];
		shuffle_images[i] = shuffle_images[pos];
		shuffle_images[pos] = temp;
	}
}


//add images in the imageContainer.
for(var i=1; i<=16; ++i)
{
	img_id = "img" + shuffle_images[i-1];
	img_src = "beach" + shuffle_images[i-1] + ".jpeg";
	
	tag = "<div class='images' id='" + img_id + "'></div>";
	$("div#imageContainer").append(tag);
	
	$("#" + img_id).css("background", "url('" + img_src + "')");
	
	
	$("div#imageContainer").append(" ");
	
	if(i == 4)
		$("div#imageContainer").append("<br/>");
}


//add horizontal lines.
for(var i=1; i<=4; ++i)
{	
	hor_line_id = 'hor_line' + i;
	tag = "<div class='hor_line' id='" + hor_line_id + "'></div>";
				
	$("div#container").append(tag);	
	
	hor_line_px = i * (Height/4);
	$("#" + hor_line_id).css('top', hor_line_px + 'px');
}


//add vertical lines.
for(var i=1; i<=4; ++i)
{	
	vert_line_id = 'vert_line' + i;
	tag = "<div class='vert_line' id='" + vert_line_id + "'></div>";
				
	$("div#container").append(tag);	
	
	vert_line_px = i * (Width/4);
	$("#" + vert_line_id).css('left', vert_line_px + 'px');
}
