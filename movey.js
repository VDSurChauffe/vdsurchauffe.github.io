function next(){
    return names[(playerId+1)%places.length];
}

function trymove(){
    place = places[playerId];
    for (let i=0; i<8; i++){
        if (place+legal_offsets[i] == this.idCase && this.textContent == ' '){
            warning.textContent = `Tour du joueur ${next()}`;
            warning.style.color = 'blue';
            this.textContent = 'K';
            this.style.color = colors[playerId];
            echiquier[place].textContent = '';
            echiquier[place].style.backgroundColor = 'gray';
            places[playerId] = place + legal_offsets[i];
        }
    }
    if (places[playerId] == place){
        warning.textContent = 'Votre cavalier ne peut pas se déplacer ici.';
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
let legal_offsets = [-17,-15,-10,-6,6,10,15,17];
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
