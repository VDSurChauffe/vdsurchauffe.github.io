function next(){
    return capnames[(playerId+1)%places.length];
}

function trymove(){
    if (won == true){
        return 0;
    }
    place = places[playerId];
    for (let i=0; i<8; i++){
        if (place+legal_offsets[i] == this.idCase && this.textContent == ' '){
            warning.textContent = `${next()}'s turn`;
            warning.style.color = 'blue';
            this.textContent = 'K';
            this.style.color = colors[playerId];
            echiquier[place].textContent = '';
            echiquier[place].style.backgroundColor = 'gray';
            places[playerId] = place + legal_offsets[i];
        }
    }
    if (places[playerId] == place){
        warning.textContent = 'Your knight cannot move here.';
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
    warning.textContent = `${capnames[playerId]} has quit. ${next()} is up next.`;
    places.splice(playerId, 1);
    colors.splice(playerId, 1);
    capnames.splice(playerId, 1);
    if (places.length == 1){
        warning.textContent = `${capnames[0]} wins!`;
        won = true;
    }
    playerId = playerId%places.length;
}

let places = [12, 16, 41, 63];
let colors = ['red', 'blue', 'green', 'purple'];
let capnames = ['Red', 'Blue', 'Green', 'Purple']
let playerId = 0;
let won = false;
let legal_offsets = [-17, -15, -10, -6, 6, 10, 15, 17];
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
