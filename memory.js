window.onload = function(){mixcards();};

var cards = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];

var randomcards = [];

var cardsAmount = cards.length;

function mixcards()
{
	
	for (var i =0; i < cardsAmount; i++) 
	{
		var liczba = rand(0,cards.length-1);
		var karta = cards[liczba];
		randomcards.push(karta);
		cards.splice(liczba,1);
	}


}

function createCallback( i )
{
  
  {
    alert('you clicked' + i);
  }
}

/*  for(var i = 0; i < 20; i++) {
    $('#question' + i).click( createCallback( i ) );
  }
});*/



$(document).ready(function(){
	for (var i = 0; i < 16; i++) 
	{
		$('#c' + i).click(revealCard(i));
	}
});

var oneVisible = false;
var moves = 0;
var firstMove;
var lock = false;

function revealCard(nr)
{
	return function()
	{
		if(lock==false)
		{
		
			lock = true;
		
			var image ="url(img/img" + randomcards[nr] + ".png)";

			$('.ca'+nr).css('background-image', image);

			$('.ca'+nr).addClass('cardActive');

			$('.ca'+nr).removeClass('card');
		
			if (oneVisible==false)
			{
				oneVisible = true; 
				firstMove = nr;
				lock = false;
			}


			else 
			{

				if(randomcards[firstMove]==randomcards[nr] && firstMove!=nr)
				{
					setTimeout(function(){ remove2randomcards(nr,firstMove)}, 750);
				}

				else
				{
					setTimeout(function(){hide2randomcards (nr, firstMove)},750);
				}

				oneVisible=false;

				moves ++;
				$('.score').html('Moves: ' + moves);
			}
		}
	}
}
	





function remove2randomcards (card1, card2)
{


	$('.ca'+card1).css('display', 'none');
	$('.ca'+card2).css('display', 'none');
	lock = false;	


	if($('.card').css('display')==undefined)
	{

		$('.score').html('<h2>You win! <br> Done in: '+ moves+ ' turns.</h2><br/><span class="reload" onclick="location.reload()">One again?</span>');

	
	}


}

function hide2randomcards (card1, card2)
{

	$('.ca'+card1).css('background-image', 'url(img/img9.png)');
	$('.ca'+card1).addClass('card');
	$('.ca'+card2).css('background-image', 'url(img/img9.png)');
	$('.ca'+card2).addClass('card');
	lock = false;
	
}


function rand(min, max) {
var argc = arguments.length;
    if (argc === 0) {
        min = 0;
        max = 2147483647;    } else if (argc === 1) {
        throw new Error('Funkcja wymaga podania obu argumentów min i max');
    }
return Math.floor(Math.random() * (max - min + 1)) + min;
}