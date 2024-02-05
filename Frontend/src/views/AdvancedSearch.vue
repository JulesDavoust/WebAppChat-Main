<template>
    <titlecomponent title="YouGame - Advanced Search" />
    <SideBar/>
    <div>
        <div id="AdvancedSearch">
            <searchBar @data-changed="handleDataChange" @isLoading-changed="handleLoadingChange"/>
            <div class="centerContainer">
                <h1>Result :</h1>
                <div v-if="isLoading">Loading...</div>
                <div v-if="Games.length > 0 && !isLoading" class="container">
                    <div class="row" v-for="(row, rowIndex) in dividedGames" :key="'row-' + rowIndex">
                        
                        <div class="col" v-for="item in row" :key="item.name"> 
                            <GameC v-bind:name="item.titleGame" v-bind:discussion="item.discussion" v-bind:idGame="item.idGame"/>
                        </div>
                    </div>
                </div>
                <div v-if="Games.length <= 0 && !isLoading">
                    Nothing found
                </div>
                <button class="btn btn-primary btnShowMore" v-if="displayedCount < Games.length" @click="showMore">Voir plus</button>
                <button class="btn btn-primary btnShowMore" v-if="displayedCount >= Games.length && Games.length > 0" @click="reset">Voir moins</button>    
            </div>
        </div>
    </div>
</template>

<script>
import searchBar from '../components/searchBar.vue'
import GameC from '../components/GameCardComp.vue';
//import AuthService from '../services/auth.service'
import SideBar from '../components/SideBar.vue';
import titlecomponent from '../components/titlecomponent.vue';

export default {
    name:'AdvancedSearch',
    components: {
        GameC,
        searchBar,
        SideBar,
        titlecomponent
    },
    data() {
        return {
            nothing: true,
            isLoading:false,
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
        },
        updateGames(newGames) {
            this.Games = newGames;
        },
        handleDataChange(newData) {
            this.Games = newData
            console.log(newData);
        },
        handleLoadingChange(newData){
            this.isLoading = newData;
        }
    },
    async mounted(){
        if(this.$route.params.title != 'next'){
            console.log(this.$route.params.title)
            const queryParams = [[this.$route.params.title],[''],[''],[''],['']]
            //const queryParams = [["Accel"],[""],[""],[""],[]]
            this.isLoading = true;
            await fetch(`http://localhost:8080/api/intern/searchGame/${queryParams}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.Games = data
            })
            console.log(this.Games)
            this.$router.replace({name:'advancedSearch', params:{title:'next'}})
            this.searchData = this.Games
            this.isLoading = false;
        }
    }
}
</script>

<style>
#AdvancedSearch{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.col{
    text-align: center;
    padding:1%;
}

@media (min-width: 1025px){
    .centerContainer{
        z-index: 0;
        width: 85%;
        display: flex;
        flex-direction: column;
        align-items: center;
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
}

</style>