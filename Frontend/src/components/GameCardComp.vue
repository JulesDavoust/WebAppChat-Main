<template>
    <div id="Game">
        <div id="GameDescribe">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title cardGame" @click="checkGameEnter()">{{name}}</h5>
                    <button class="btn btn-outline-primary" @click="submit">
                        <div v-if="follow==true" @click="unfollowGame">Unfollow</div>
                        <div v-if="follow==false" @click="followGame">Follow</div>
                    </button>
                    <div id="GameDiscussion" v-if="showGameHide == 'true'">
                        <p class="card-text" v-for="item in discussion" :key="item" @click="GoToDiscussion(discussion.indexOf(item))">{{ item }}</p>
                    </div> 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AuthService from '../services/auth.service'
export default {
    name:'GameDiscussion',
    props:{
        name: String, 
        discussion: Object,
        idGame:Int32Array,
        idDiscussion:Array,
    },
    data(){
        return{
            showGameHide:'false',
            follow:false,
            idGame_:0,
        }
    },
    methods:{
        checkGameEnter(){
            if (this.showGameHide == "false") this.showGameHide = "true"
            else if (this.showGameHide == "true") this.showGameHide = "false"
        },
        checkGameLeave(){
            this.showGameHide = "false"
        },
        GoToDiscussion(item){
            console.log(item)
            this.$router.push({ name: 'discussion', params:{id:this.idGame, idDiscussion:this.idDiscussion[item]} })
        },
        async followGame(){
            const userId = 3
            const idGame = this.idGame
            console.log(idGame)
            await fetch(`http://localhost:8080/api/follows/follow`,
            {
                method: 'POST',
                headers: Object.assign({ 'Content-Type': 'application/json' }, AuthService.authHeader()),
                body: JSON.stringify({idGame}) 
            }
            )
            .then(res => {
                console.log('Suivi ajouté avec succès:', res);
            })
            .catch(error => {
                console.error('Erreur lors de l\'ajout du suivi:', error);
            });
            alert("Succes followed\nThe page will be reload itself");
            location.reload();
        },
        async unfollowGame(){
            const userId = 3
            const idGame = this.idGame
            console.log(idGame)
            await fetch(`http://localhost:8080/api/follows/unfollow`,
            {
                method: 'DELETE',
                headers: Object.assign({ 'Content-Type': 'application/json' }, AuthService.authHeader()),
                body: JSON.stringify({idGame}) 
            }
            )
            .then(res => {
                console.log('Suivi ajouté avec succès:', res);
            })
            .catch(error => {
                console.error('Erreur lors de l\'ajout du suivi:', error);
            });
            alert("Succes unfollowed\nThe page will be reload itself");
            location.reload();
        }
    },
    async created(){
        const userId = 3
        this.idGame_ = this.idGame 
        let Game
        await fetch(`http://localhost:8080/api/follows/verifFollow`,
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
        console.log(this.idGame);
        for(let i = 0; i<Game.length; i++){
            if(this.idGame == Game[i]){
                this.follow = true;
            }
        }
        console.log(this.idGame)
    }
}
</script>

<style scoped>

#GameDiscussion{
    z-index: 1000;
}

.cardGame{
    z-index: 999;
}

</style>