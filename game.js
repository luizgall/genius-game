$(document).ready(function(){
	var allPads = [{name: "red", colorDefault: "red", colorLight:"#ffa8a8"}, {name: "blue", colorDefault: "blue", colorLight:"#a8c3ff"}, {name: "green", colorDefault: "green", colorLight:"#a8ffad"}, {name: "yellow", colorDefault: "yellow", colorLight:"#ffedce"} ];
	var redPad ={name: "red", colorDefault: "red", colorLight:"#ffa8a8"};
	var bluePad ={name: "blue", colorDefault: "blue", colorLight:"#a8c3ff"};
	var greenPad ={name: "green", colorDefault: "green", colorLight:"#a8ffad"};
	var yellowPad ={name: "yellow", colorDefault: "yellow", colorLight:"#ffedce"};
	var turn = {number: 0, player:false, simon:true, difficult:1};
	var simonChoice = document.getElementById("simonChoices");
	var playerChoice = document.getElementById("playerChoices");
	var displayTurn = document.getElementById("turn");

	var x = turn.difficult;
	var y = turn.difficult;
	var sequenceSimon = [];
	var sequencePlayer =[];
	
	
	$("#btnID").click(function(){
		displayTurn.innerHTML = "Simone's Turn";
		simonTurn();
	});

		$("#red").click(function(){
			if (turn.player){
				sequencePlayer.push(redPad.name);
				flashLight(redPad);

			}
		});

		$("#blue").click(function(){
			if (turn.player){
				sequencePlayer.push(bluePad.name);
				flashLight(bluePad);
			}
			
		});

		$("#yellow").click(function(){
			if (turn.player){
				sequencePlayer.push(yellowPad.name);
				flashLight(yellowPad);
			}
		});

		$("#green").click(function(){
			if (turn.player){
				sequencePlayer.push(greenPad.name);
				flashLight(greenPad);
			}
		});
		

x


		function flashLight(pad){
		 	document.getElementById(pad.name).style.backgroundColor = pad.colorLight;
		 	document.getElementById(pad.name).className = document.getElementById(pad.name).className + " light";

			setTimeout(function(){

				document.getElementById(pad.name).style.backgroundColor = pad.colorDefault;
				document.getElementById(pad.name).className = document.getElementById(pad.name).className.replace(" light", "");
		

				console.log(sequencePlayer);
			
				if (x > 0 && turn.simon){
					setTimeout(function(){
							choice = getRandomPad() ; 
							flashLight(choice);}, 100);
					x = x -1;
				}
				
				else if (y>0 && turn.player){
					y = y -1;
				}
				else if ((x == 0 && turn.simon) || (y==0 && turn.player)){	
					turnChange();
				
				}

		
			},300);
		}



		function getRandomPad (){
				choice = allPads[Math.floor(Math.random()*4)];
				sequenceSimon.push(choice.name);
				console.log(sequenceSimon);
				return choice;
		}

		function turnChange(){

			if(turn.simon){
				
				turn.simon = false;
				turn.player = true;
				displayTurn.innerHTML = "Player's turn";
			}

			else if(turn.player){
	

				if(checkVictory()){
					turn.player = false;
					turn.simon = true;
					sequencePlayer =[];
					sequenceSimon = [];
					turn.difficult =turn.difficult + 1;
					x= turn.difficult;
					y = turn.difficult;	
					simonTurn();
				}
				else{
					alert("You lose");
				}
			}
				

		}
		
		function checkVictory(){

			for (i = 0; i < sequenceSimon.length; i++){
				if(sequenceSimon[i] !== sequencePlayer[i]){
					return false;
				}
		
			}
			
			return true;	
		}

		function simonTurn(){
			
			displayTurn.innerHTML = "Simone's turn";
			setTimeout(function(){
				choice = getRandomPad();
				flashLight(choice);
			}, 300);
		
		}
});