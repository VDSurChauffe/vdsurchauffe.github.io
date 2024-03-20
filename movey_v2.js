function next(){
    return names[(playerId+1)%places.length];
}

function check(tile1,tile2){
    if (tile1 > tile2){[tile1, tile2] = [tile2, tile1];}
    if (Math.floor(tile1/8) != Math.floor(tile2/8) && tile1%8 != tile2%8){
	return false;
    }
    n = 1;
    if (tile1%8 == tile2%8){n = 8;}
    for (let i=tile1; i<tile2; i += n){
	if (echiquier[i].textContent != ' ' && i != tile1){return false;}
    }
    return true;
}
function trymove(){
    place = places[playerId];
    if (echiquier[place].textContent == 'T'){
	offsets = rook_offsets;
    }
    else {
	offsets = knight_offsets;
    }
    for (let i=0; i<offsets.length; i++){
	offset = offsets[i];
        if (place+offset == this.idCase && this.textContent == ' ' && (check(place,place+offset) == true || echiquier[place].textContent == 'K')){
            warning.textContent = `Tour du joueur ${next()}`;
            warning.style.color = 'blue';
            this.textContent = echiquier[place].textContent;
            this.style.color = colors[playerId];
            echiquier[place].textContent = '';
            echiquier[place].style.backgroundColor = 'gray';
            places[playerId] = place + offset;
        }
    }
    if (places[playerId] == place){
        warning.textContent = 'Votre cavalier/tour ne peut pas se déplacer ici.';
        warning.style.color = 'red';
    }
    else {
        playerId = (playerId + 1) % places.length;
        echiquier[places[playerId]].normColor = echiquier[places[playerId]].style.backgroundColor;
        echiquier[places[playerId]].style.backgroundColor = 'yellow';
        this.style.backgroundColor = this.normColor;
    }
}

function resign(){
    echiquier[places[playerId]].textContent = 'R';
    echiquier[places[playerId]].style.backgroundColor = 'black';
    warning.textContent = `Le joueur ${names[playerId]} a abandonné. C'est au tour du joueur ${next()}.`;
    places.splice(playerId,1);
    names.splice(playerId,1);
    colors.splice(playerId,1);
    if (places.length == 1){
        warning.textContent = `Le joueur ${names[0]} a gagné !`
    }
    playerId = playerId%places.length;
}

let places = [12,16,41,63];
let names = ['rouge','bleu','vert','violet'];
let colors = ['red','blue','green','purple'];
let playerId = 0;
let knight_offsets = [-17,-15,-10,-6,6,10,15,17];
let rook_offsets = [-1,-2,-3,-4,-5,-6,-7,-8,-16,-24,-32,-40,-48,-56,1,2,3,4,5,6,7,8,16,24,32,40,48,56];
var warning = document.getElementById('warning');
var echiquier = document.getElementsByClassName('case');
for (let i=0; i<64; i++){
    if ((i+Math.floor(i/8))%2 == 0){
        echiquier[i].style.backgroundColor = 'darkgray';
    }
    echiquier[i].idCase = i;
    echiquier[i].addEventListener('click',trymove);
}
for (let i=0; i<4; i++){
    echiquier[places[i]].normColor = echiquier[places[i]].style.backgroundColor;
}
var button = document.getElementById('lose');
button.addEventListener('click',resign);
