<template>
    <titlecomponent title="YouGame - Discussion" />
    <SideBar/>
    <div id="Game">
        <GameCompHeader v-bind:GameName="InfoGame"/>
        <GameCompSelected class="GameSelectedInGame" :name="InfoDiscussion.nameDiscussion"/>
        <GameCompBody :messages="this.messages" v-on:sendMessage="this.sendMessage"/>
    </div>
</template>

<script>
import io from 'socket.io-client';
import GameCompHeader from '../components/GameCompHeader.vue';
import GameCompBody from '../components/GameCompBody.vue';
import AuthService from '../services/auth.service'
import GameCompSelected from '../components/GameCompSelected.vue';
import SideBar from '../components/SideBar.vue';
import titlecomponent from '../components/titlecomponent.vue';

export default {
    name:'Game',
    components:{
        GameCompHeader,
        GameCompBody,
        GameCompSelected,
        SideBar,
        titlecomponent
    },
    data(){
        return{
            InfoGame:{},
            InfoDiscussion:{},
            messages:[],
            pseudo:'',
            socket : io('http://localhost:8080')
        }
    },
    methods:{
        joinServer(){

            this.socket.emit('joinDiscussion', this.$route.params.idDiscussion);

            //this.listen()
        },
        // listen(){
        //     this.socket.on('userOnline', user=>{
        //         this.users.push(user)
        //     })
        //     this.socket.on('userLeft',user=>{
        //         this.users.splice(this.users.indexOf(user), 1)
        //     })
        //     this.socket.on('msg', message=>{
        //         this.messages.push(message);
        //     })
        // },
        sendMessage(message){
            console.log(message)
            const data = {
                pseudo:this.pseudo, 
                discussionName: this.$route.params.idDiscussion,
                message: message
            };
            this.socket.emit('sendMessage', data);
            
        }
    },
    async mounted(){
        this.socket.on('newMessage', (message) => {
            console.log(message);
            this.messages.push(message);
        });
        // this.$nextTick(() => {
        //     const messageContainer = this.$refs.messages;
        //     messageContainer.scrollTop = messageContainer.scrollHeight;
        // });
        const userId = 3;
        fetch(`http://localhost:8080/api/users/getPseudoById`,
        {
              headers: AuthService.authHeader()
        }
        )
        .then(response=>response.json())
        .then(data => {
            console.log('my pseudo : ',data);
            this.pseudo = data
        })
        .catch(error => {
           console.error(error);
        }); 
        const paramsId = this.$route.params.id;
        fetch(`http://localhost:8080/api/intern/getOneGame/${paramsId}`)
        .then(response=>response.json())
        .then(data => {
            console.log('my data : ',data);
            this.InfoGame = data
        })
        .catch(error => {
           console.error(error);
        }); 
        const paramsIdDiscussion = this.$route.params.idDiscussion;
        fetch(`http://localhost:8080/api/intern/getDiscussion/${paramsIdDiscussion}`)
        .then(response=>response.json())
        .then(data => {
            console.log('my data : ',data);
            this.InfoDiscussion = data
        })
        .catch(error => {
           console.error(error);
        });
        // this.username = prompt("What is your username ?", "Anonymous")
        // if(!this.username){
        //     this.username = "Anonymous"
        // }
        console.log("server")
        this.joinServer()
        console.log(this.messages);
    }

}
</script>

<style scoped>
.GameSelectedInGame{
    position:absolute;
    left:10%;
    z-index: 9000;
}
</style>