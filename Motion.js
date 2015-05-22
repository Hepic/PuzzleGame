var id, focus_tag = null;


function mouseMove(e)
{
	var img_height = $('div.images').height(), img_width=$('div.images').width();
	
	$(focus_tag).css(
	{
		top: e.pageY - img_height/2 + 'px',
		left: e.pageX - img_width/2 + 'px'
	});
}


function mouseDown()
{
	id = $(this).attr('id');
	RemoveImage(id); 
	
	$(this).css(
	{
		zIndex: 1,
		position: 'fixed',
		width: '7.1%',
		height: '9.3%'
	});
	
	focus_tag = this;
	$('html').mousemove( mouseMove );
}


function mouseUp(e)
{
	$(focus_tag).unbind('mousemove', mouseMove );
	
	id = $(focus_tag).attr('id');
	InsertImage(focus_tag, id, e.pageX, e.pageY);
	focus_tag = null;
	
	if(win())
		alert('You won!');
}


$('div.images').mousedown( mouseDown );
$('html').mouseup( mouseUp );
