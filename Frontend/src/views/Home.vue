<template>
    <titlecomponent title="YouGame" />
    <SideBar/>
    <div>
        <NavBar/>
        <div class="Home">
            <div class="centerContainer">
                <h1>Your discussions</h1>
                <div class="container">
                    <div class="row" v-for="(row, rowIndex) in dividedGames" :key="'row-' + rowIndex">
                        <div class="col" v-for="item in row" :key="item.name"> 
                            <GameC v-bind:name="item.name" v-bind:discussion="item.discussion" v-bind:idGame="item.id" v-bind:idDiscussion="item.idDiscussion"/>
                        </div>
                    </div>
                </div>
                <div id="divBtn" v-if="nothing == false">
                    <button class="btn btn-primary btnShowMore" v-if="displayedCount < Games.length" @click="showMore">Voir plus</button>
                    <button class="btn btn-primary btnShowMore" v-if="displayedCount >= Games.length" @click="reset">Voir moins</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import NavBar from '../components/navBar.vue';
import GameC from '../components/GameCardComp.vue';
import SideBar from '../components/SideBar.vue';
import AuthService from '../services/auth.service';
import titlecomponent from '../components/titlecomponent.vue';

export default {
    name: 'Home',
    components: {
        GameC,
        NavBar,
        SideBar,
        titlecomponent
    },
    data() {
        return {
            nothing: true,
            displayedCount: 12,
            Games:[],
            GamesTab: [
                { name: 'Game Test 1', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 2', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 3', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 4', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 5', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 6', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 7', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 8', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 9', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 10', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 11', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 12', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 13', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 14', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 15', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 16', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 17', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 18', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 19', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 20', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 21', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 22', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 23', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 24', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 1', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 2', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 3', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 4', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 5', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 6', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 7', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 8', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 9', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 10', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 11', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 12', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 13', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 14', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 15', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 16', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 17', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 18', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 19', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 20', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 21', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 22', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 23', discussionTab: ['discussion 1', 'discussion 2'] },
                { name: 'Game Name Test 24', discussionTab: ['discussion 1', 'discussion 2'] },
            ],
        }
    },
    computed: {
        dividedGames() {
            const size = 3;
            let gamesToShow = this.Games.slice(0, this.displayedCount); 
            console.log(this.Games)
            return gamesToShow.reduce((accumulator, currentValue, currentIndex) => {
                if (currentIndex % size === 0) {
                    accumulator.push([]);
                }
                accumulator[Math.floor(currentIndex / size)].push(currentValue);
                return accumulator;
            }, []);
        },
    },
    methods: {
        showMore() {
            if (this.displayedCount < this.Games.length) {
                this.displayedCount += 12;
            }
        },
        reset() {
            this.displayedCount = 12;
        }
    },
    async mounted(){
        const userId = 3
        let Game
        await fetch(`http://localhost:8080/api/follows/getAllDiscussions`,
        {
              headers: AuthService.authHeader()
        }
        ).then(response=>response.json())
        .then(data=>{
            Game = data
        })
        .catch(error => {
           console.error(error);
        }); 
        console.log(Game)
        for(let i =  0; i< Game.extractedDataGames.length; i++){
            this.Games.push({name:Game.extractedDataGames[i].titleGame, idDiscussion:[], discussion:[], id:Game.extractedDataGames[i].idGame})

            for(let j = 0; j<Game.extractedDataDiscussion.length; j++){
                if(Game.extractedDataGames[i].idGame == Game.extractedDataDiscussion[j].idGame){
                    this.Games[i].idDiscussion.push(Game.extractedDataDiscussion[j].idDiscussion)
                    this.Games[i].discussion.push(Game.extractedDataDiscussion[j].nameDiscussion)
                    
                }
            }
        }
        console.log(this.Games[0].discussion)
        if(this.Games > 12){
            this.nothing = false
        }
    }
}
</script>

<style scoped>



.col{
    text-align: center;
    padding:1%;
}

@media (min-width: 1025px){
    .centerContainer{
        z-index: 0;
        width: 85%;
        margin:auto;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .Home{
        margin-bottom: 5%;
    }
}

@media (min-width: 770px) and (max-width: 1024px){
    .centerContainer{
        z-index: 0;
        width: 85%;
        margin:auto;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .Home{
        margin-bottom: 5%;
    }
}

@media (min-width: 319px) and (max-width: 769px){
    .centerContainer{
        z-index: 0;
        width: 85%;
        margin:auto;
        display: flex;
        flex-direction: column;
        align-items: center;       
    }

    .Home{
        margin-bottom: 18%;
    }
}



.btnShowMore{
    position: relative;
    width:80%;
    top:90%;left:50%;
    transform: translate(-50%, 0%);
}

#divBtn{
    width: 100%;
    
}

</style>