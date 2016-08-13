function showNumberWithAnimation(i,j,randNumber){

	var numberCell = $('#number-cell-'+i+'-'+j);

	numberCell.css('background-color',getNumberBackgroundColor(randNumber));
	numberCell.css('color',getNumberColor(randNumber));
	numberCell.text(getNumberNote(randNumber));
	$('#grid-container').css('background','#bbada0');
	$('.grid-cell').css('background','#ccc0b3');	
	if(window.style=="Tou"){
		numberCell.css('background','none');
		$('#grid-container').css('background','none');
		$('.grid-cell').css('background','none');
	}
	numberCell.animate({
		width:cellSideLength,
		height:cellSideLength,
		top:getPosTop(i,j),
		left:getPosLeft(i,j)
	},50);
}


function showMoveAnimation(fromx,fromy,tox,toy){

	var numberCell= $("#number-cell-"+fromx+"-"+fromy);
	numberCell.animate({
		top:getPosTop(tox,toy),
		left:getPosLeft(tox,toy)
	},200);
}

function updateScore(score){
	$('#score').text(score);
}