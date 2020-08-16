/*Player class
 - name, eg. DynamiteLarry37, FunnyWord29
 - real_skill, 0 - 1 this determines the games outcome
 - starting rating for the ranking system, 1000?
 - wins, losses

 */
class Player{
    constructor(name, real_skill, starting_rating, wins, losses){
        this.name = name;
        this.real_skill = real_skill;
        this.rating = starting_rating;
        this.wins = wins;
        this.losses = losses;
    }

    get games_played(){
        return this.wins + this.losses;
    }
}

var p = new Player("larry", Math.random(), 1000, 0, 0);

console.log(p.real_skill);