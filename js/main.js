var timerId = null;
const soundIndex = PIXI.sound.Sound.from('sons/audio-index.ogg');
const soundGame = PIXI.sound.Sound.from('sons/musica-jogo.ogg');
const soundGameOver = PIXI.sound.Sound.from('sons/gameover.ogg');
 
/**
 * Sounds Game
 */
function musicIndex() {
	soundIndex.play();
}

function musicGame() {
	soundGame.play();
}
/** End Sounds Game */


function iniciarJogo(){
	let nivel_jogo = document.getElementById('nivel_jogo').value;

	switch(nivel_jogo){
		case '1':
		nivel_jogo = 'facil';
			break;
		case '2':
		nivel_jogo = 'normal';
			break;
		case '3':
		nivel_jogo = 'dificil';
			break;		
	}

	window.location.href = 'jogo.html?'+nivel_jogo;
}

function iniciaJogo(){
	var url = window.location.search;

	var nivel_jogo = url.replace("?", "");

	var tempo_segundos = 0;
	var qnt_baloes = 0;

	if (nivel_jogo == 'facil'){
		tempo_segundos = 60;
		qnt_baloes = 120;
	}

	if (nivel_jogo == 'normal'){
		tempo_segundos = 80;
		qnt_baloes = 240;
	}

	if (nivel_jogo == 'dificil'){
		tempo_segundos = 90;
		qnt_baloes = 360;
	}

	//inserindo baloes
	criaBaloes(qnt_baloes);

	document.getElementById('total_baloes_cheios').innerHTML = qnt_baloes;
	document.getElementById('total_baloes_estourados').innerHTML = 0;

	//Inserindo segundos no span
	document.getElementById('tempo').innerHTML = tempo_segundos;

	contagemTempo(tempo_segundos + 1)
}

function contagemTempo(segundos){
	segundos = segundos - 1;

	if (segundos == -1) {
		clearTimeout(timerId);
		gameOver();
		return false;
	}

	document.getElementById('tempo').innerHTML = segundos;

	timerId = setTimeout("contagemTempo("+segundos+")", 1000);
}

function remove_eventos_baloes() {
    var i = 1;
    
    while( document.getElementById('b'+i)) {
        document.getElementById('b'+i).onclick = '';
        i++;
    }
}

function gameOver(){
	remove_eventos_baloes();
	soundGame.stop();
	soundGameOver.play();
}

function criaBaloes(qnt_baloes){

	for(var i = 1; i <= qnt_baloes; i++){

		var balao = document.createElement("img");
		balao.src = 'imagens/copa.png';
		balao.width = '50';
		balao.style.margin = '10px';
		balao.id = 'b'+i;
		balao.onclick = function(){
			estourar(this)
		};

		document.getElementById('stage').appendChild(balao);
	}

}

function estourar(e){

	let id_balao = e.id;

	document.getElementById(id_balao).setAttribute("onclick", "");
	document.getElementById(id_balao).src = 'imagens/copa_pow.png';

	pontuacao(-1);
}

function pontuacao(acao){

	var baloes_cheios = document.getElementById('total_baloes_cheios').innerHTML;
	var baloes_estourados = document.getElementById('total_baloes_estourados').innerHTML;

	baloes_cheios = parseInt(baloes_cheios);
	baloes_estourados = parseInt(baloes_estourados);

	baloes_cheios = baloes_cheios + acao;
	baloes_estourados = baloes_estourados - acao;

	document.getElementById('total_baloes_cheios').innerHTML = baloes_cheios;
	document.getElementById('total_baloes_estourados').innerHTML = baloes_estourados;

	vencedor(baloes_cheios);

}

function vencedor(baloes_cheios){
	if (baloes_cheios == 0) {
		alert('Parabéns! Você conseguiu acertar todos os Copas a Tempo.');
		parar_tempo();
	}
}

function parar_tempo(){
	clearTimeout(timerId);
}

