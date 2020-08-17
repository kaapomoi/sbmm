let PLAYER_ID_COUNTER = 1
let MATCH_ID_COUNTER = 1

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
    constructor(player_a, player_b, id){
        this.player_a = player_a;
        this.player_b = player_b;
        this.id = id;
        this.rating = (player_a.rating + player_b.rating) / 2;
        this.winner = 0;
    }

    simulate_game = function(){
        // True if player_a wins
        this.winner = this.player_a.real_skill > this.player_b.real_skill ? true : false;
        UpdateWinsLosses(this.player_a, this.player_b, this.winner);
        CalculateNewRating(this.player_a, this.player_b, this.winner);
        this.player_a.ingame = false;
        this.player_b.ingame = false;
        return [this.player_a, this.player_b];
    }

}

function MakeMatch(){
    let epsilon = 100
    if (player_q_list.length >= 2){
        for (let i = 0; i < player_q_list.length; i++) {
            let player_a = player_q_list[i];
            if (!player_a.ingame) {
                for (let j = 0; j < player_q_list.length; j++) {
                    if (player_a !== player_q_list[j] && !player_q_list[j].ingame) {
                        if (Math.abs(player_a.rating - player_q_list[j].rating) < epsilon) {
                            ongoing_matches.push(new Match(player_a, player_q_list[j], MATCH_ID_COUNTER++));
                            player_a.ingame = true;
                            player_q_list[j].ingame = true;
                            break;
                        }
                    }
                }
            }
        }
    }
}

function UpdateWinsLosses(player_a, player_b, winner){
    if(!!winner){
        player_a.wins++;
        player_b.losses++;
    }else{
        player_a.losses++;
        player_b.wins++;
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
    player_b.rating = b_prev + rating_change * -1;
}

function CreateNewPlayer(name, real_skill, starting_rating, wins, losses, id){
    let p = new Player(name, real_skill, starting_rating, wins, losses, id);
    console.log("New player: ", p);
    player_q_list.push(p);
}

function CreateRandomName(){
    return p_prefixes[Math.floor(Math.random() * p_prefixes.length)].toString() +
    p_postfixes[Math.floor(Math.random() * p_postfixes.length)].toString() +
    Math.floor(Math.random() * 99).toString();
}

/*setInterval(function(){
    if(player_q_list.length < 30){
        CreateNewPlayer(CreateRandomName(), randomG(3), 1000, 0, 0, PLAYER_ID_COUNTER++);
    } else{
        console.log("Max amount of players reached, no longer creating players");
    }
}, 1000);
*/

for (let index = 0; index < 30; index++) {
    CreateNewPlayer(CreateRandomName(), randomG(3), 1000, 0, 0, PLAYER_ID_COUNTER++);
}

/// Update the player-list table
setInterval(function(){
    var tbody = document.getElementById('player-table');
    tbody.innerHTML = "";

    if (player_q_list.length >= 1){

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
    }

}, 16);

/// Update the matches-list table
setInterval(function(){
    var tbody = document.getElementById('matches-table');
    tbody.innerHTML = "";

    for (var i = 0; i < ongoing_matches.length; i++) {
        var tr = "<tr>";

        tr += "<td>" + ongoing_matches[i].id.toString()
        + "</td>" + "<td>" + ongoing_matches[i].player_a.name.toString()
        + "</td>" + "<td>" + ongoing_matches[i].player_b.name.toString()
        + "</td>" + "<td>" + ongoing_matches[i].rating.toString();
        + "</td></tr>";
        tbody.innerHTML += tr;
    }

}, 16);

setInterval(function(){
    MakeMatch();
}, 2000);

setInterval(function(){
    if(ongoing_matches.length >= 1){
        for (let index = 0; index < ongoing_matches.length; index++) {
            ongoing_matches[index].simulate_game();
            ongoing_matches.splice(index, 1);
        }
    }
}, 1549);

// v is the number of times random is summed and should be over >= 1
// return a random number between 0-1 exclusive
function randomG(v){
    var r = 0;
    for(var i = v; i > 0; i --){
        r += Math.random();
    }
    return r / v;
}