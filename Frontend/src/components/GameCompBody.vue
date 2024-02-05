<template>
    <div id="GameBody">
            <div class="container sousContainerGameB">
                <!-- <div class="messages">
                    <div class="message" v-for="message in messages" v-bind:key="message.index">
                        <div class="username">{{ message.username }}</div>
                        <div class="message-text">{{ message.msg }}</div>
                    </div>
                </div> -->
                <div class="container-message" style="overflow-y: scroll; max-height: 60vh;">
                    <div class="message" v-for="message in messages" :key="message.id">
                    {{ message.pseudo.username }} : {{ message.message }}
                    </div>
                </div>
                <form class="d-flex chat" @submit.prevent="sendMessage">
                    <input class="form-control me-2" type="text" placeholder="enter your message" v-model="newMessage">
                    <button type="submit" class="btn btn-outline-success" :disabled="newMessage === ''">Send</button>
                </form>
            </div>
    </div>
</template>

<script>

export default {
    name:'GameBody',
    props: {
        messages: {
            type: Array,
            required: true
        }
    },
    data(){
        return{
            msg:"",
            newMessage:"",
        }
    },
    methods:{
        sendMessage(){
            console.log(this.newMessage === "")
            if(this.newMessage === ""){
                alert("Please enter a message");
                return
            }
            else{
                this.$emit('sendMessage', this.newMessage);
                this.newMessage="";
            }
            
            

        },
    }
}
</script>

<style scoped>
.sousContainerGameB{
    border: 2px solid black;
    border-radius: 20px;
    bottom:0;
    margin-top:2%;
    position: relative;
    height: 68vh;
    width: 97%;
    z-index:1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
}

@media((min-width: 768px) and (max-width: 1024px)){
    .sousContainerGameB{
        border: 2px solid black;
        border-radius: 20px;
        bottom:0;
        margin-top:2%;
        position: relative;
        height: 68vh;
        width: 88%;
        z-index:1;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
    }
}

.container-message{
    margin-bottom: 3%;
    width:100%;
}
.chat{
    position: absolute;
    bottom:5%;
    position: absolute;
    bottom: 1%;
    width: 95%;
}

</style>