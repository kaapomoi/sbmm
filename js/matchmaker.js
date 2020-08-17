let ID_COUNTER = 1

let player_list = []
let player_q_list = []

let ongoing_matches = []

let matches_played = []

const p_prefixes = [
    "Dynamite",
    "Nasty",
    "Astro",
    "Space",
    "Vinegar",
    "Coffee",
    "Water",
    "Cookie",
    "Burger",
    "Coke",
    "TeaSip",
    "Pringle",
    "Secret",
    "Bass",
    "Random",
    "Apple",
    "Lemon",
    "Grape",
    "Potato",
    "Melon",
    "Fungus",
    "Bread",
    "Cheese",
    "Wine",
    "Egg",
    "Sausage",
    "Rice",
    "Lobster",
    "Corn", 
    "Sauce",
    "Pasta",
    "Spaghetti",
    "Hotdog",
    "Salad",
    "Stew"
]

const p_postfixes = [
    "Larry",
    "Tom",
    "James",
    "Bobby",
    "John",
    "William",
    "Richard",
    "David",
    "Charles",
    "Thomas",
    "Michael",
    "Ronald",
    "Donald",
    "Gary",
    "Joseph",
    "George",
    "Kenneth",
    "Paul",
    "Edward",
    "Dennis",
    "Jerry",
    "Frank",
    "Henry",
    "Arthur",
    "Fred",
    "Clarence",
    "Harold",
    "Walter",
    "Albert",
    "Willie",
    "Scott",
    "Daniel",
    "Eric",
    "Tim",
    "Kevin",
    "Jason",
    "Jeffrey"
]


/*Player class
 - name, eg. DynamiteLarry37, FunnyWord29
 - real_skill, 0 - 1 this determines the games outcome
 - starting rating for the ranking system, 1000?
 - wins, losses

 */
class Player{
    constructor(name, real_skill, starting_rating, wins, losses, id){
        this.name = name;
        this.real_skill = real_skill;
        this.rating = starting_rating;
        this.wins = wins;
        this.losses = losses;
        this.id = id;
        this.ingame = false;
    }

    get games_played(){
        return this.wins + this.losses;
    }

}

class Match{
    constructor(player_a, player_b){
        this.player_a = player_a;
        this.player_b = player_b;
        this.winner = 0;
    }

    simulate_game = function(){
        this.winner = this.player_a.real_skill > this.player_b.real_skill ? 1 : 2;
        CalculateNewRating(this.player_a, this.player_b, this.winner);        
        return true;
    }

}

function MakeMatch(){
    for (let index = 0; index < player_q_list.length; index++) {
        const element = player_q_list[index];
        
    }
}

function CalculateNewRating(player_a, player_b, winner){
    let a_prev = player_a.rating;
    let b_prev = player_b.rating;
    let rating_diff = Math.max(Math.min(a_prev - b_prev, 400), -400);

    let expected = 1 / (1 + Math.pow(10, rating_diff / 400));

    let k = 35;
    let rating_change = parseInt(k * (!!winner - expected), 10);
    
    player_a.rating = a_prev + rating_change;
    player_b.rating = b_preb + rating_change * -1;
}

function CreateNewPlayer(name, real_skill, starting_rating, wins, losses, id){
    let p = new Player(name, real_skill, starting_rating, wins, losses, id);
    console.log("New player: ", p);
    player_list.push(p);
}

function CreateRandomName(){
    return p_prefixes[Math.floor(Math.random() * p_prefixes.length)].toString() +
    p_postfixes[Math.floor(Math.random() * p_postfixes.length)].toString() +
    Math.floor(Math.random() * 99).toString(); 
}

setInterval(function(){
    CreateNewPlayer(CreateRandomName(), randomG(3), 1000, 0, 0, ID_COUNTER++);
}, 1000);

setInterval(function(){
    var tbody = document.getElementById('player-table');
    tbody.innerHTML = "";
    player_q_list = [];

    for (let index = 0; index < player_list.length; index++) {
        const element = player_list[index];
        if(element.ingame = false){
            player_q_list.push(element);
        }
    }

    for (var i = 0; i < player_q_list.length; i++) {
        var tr = "<tr>";
       
        tr += "<td>" + player_q_list[i].id.toString() 
        + "</td>" + "<td>" + player_q_list[i].name.toString()
        + "</td>" + "<td>" + player_q_list[i].rating.toString()
        + "</td>" + "<td>" + parseFloat(player_q_list[i].real_skill).toPrecision(3)
        + "</td>" + "<td>" + player_q_list[i].wins.toString()
        + "</td>" + "<td>" + player_q_list[i].losses.toString()
        + "</td></tr>";
        tbody.innerHTML += tr;
    }

}, 1000);

// v is the number of times random is summed and should be over >= 1
// return a random number between 0-1 exclusive
function randomG(v){ 
    var r = 0;
    for(var i = v; i > 0; i --){
        r += Math.random();
    }
    return r / v;
}