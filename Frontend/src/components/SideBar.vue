<template>
    <div class="sideBar">
        <div id="sideBar1" v-if="showSideBar1 == 'true'"> 
            <fa class="iconFA" icon="home" @click="Home"/>
            <fa class="iconFA" icon="user" @click="Profile"/>
            <fa class="iconFA" icon="magnifying-glass" @click="AdvancedSearch"/>
            <div v-if="admin==true">
                <fa class="iconFA" icon="gear" @click="Admin"/>
            </div>
            <fa class="iconFA" icon="right-to-bracket" @click="Loggout"/>
            
        </div>
        <div v-if="showSideBar1 == 'false'">
            <div id="sideBar2" v-show="showSideBar2Hide == 'false'" @mouseenter="checkSideBar2Enter()"> 
                <fa class="iconFA" icon="home"/>
                <fa class="iconFA" icon="user"/>
                <fa class="iconFA" icon="magnifying-glass"/>
                <div v-if="admin==true">
                    <fa class="iconFA" icon="gear"/>
                </div>
                <fa class="iconFA" icon="right-to-bracket"/>
                
            </div>
            <div id="sideBar2Hide" v-show="showSideBar2Hide == 'true'" @mouseleave="checkSideBar2Leave()">
                <div class="buttonIconFA"><button class="btn btn-light buttonSideBar" @click="Home">Home</button><fa class="iconFA" icon="home"/></div>
                <div class="buttonIconFA"><button class="btn btn-light buttonSideBar" @click="Profile">Profile</button><fa class="iconFA" icon="user"/></div>
                <div class="buttonIconFA"><button class="btn btn-light buttonSideBar" @click="AdvancedSearch">Advanced search</button><fa class="iconFA" icon="magnifying-glass"/></div>
                <div v-if="admin==true" class="buttonIconFA"><button class="btn btn-light buttonSideBar" @click="Admin">Admin</button><fa class="iconFA" icon="gear"/></div>
                <div class="buttonIconFA"><button class="btn btn-light buttonSideBar" @click="Loggout">Loggout</button><fa class="iconFA" icon="right-to-bracket"/></div>
            </div>
        </div>
        
    </div>
</template>

<script>
import AuthService from '../services/auth.service'
export default {
    name:"SideBar",
    data(){
        return{
            showSideBar1:'false',
            showSideBar2Hide:'false',
            admin:false,
        }
    },
    methods:{
        Home(){
            this.$router.push('/')
        },
        Profile(){
            this.$router.push({ name: 'profile' })
        },
        AdvancedSearch(){
            this.$router.push('/advanced-search/next')
        },
        Loggout(){
            AuthService.logout()
            this.$router.push({ name: 'login' })
        },
        Admin(){
            // this.$router.push({ name: 'admin' })
            window.location.href = "/admin"
        },
        checkScreenSize() {
            if (window.innerWidth <= 768) {
                this.showSideBar1 = "true"
                localStorage.setItem("showSideBar1", "true")
                this.showSideBar1 = localStorage.getItem("showSideBar1")
            }
            else if(window.innerWidth > 768){
                this.showSideBar1 = "false"
                localStorage.setItem("showSideBar1", "false")
                this.showSideBar1 = localStorage.getItem("showSideBar1")
            }
        },
        checkSideBar2Enter(){
            this.showSideBar2Hide = "true"
        },
        checkSideBar2Leave(){
            this.showSideBar2Hide = "false"
        }
    },
    async mounted(){
        const userId = 1;
        if (window.innerWidth <= 768) {
                this.showSideBar1 = "true"
                localStorage.setItem("showSideBar1", "true")
                this.showSideBar1 = localStorage.getItem("showSideBar1")
            }
            else if(window.innerWidth > 768){
                this.showSideBar1 = "false"
                localStorage.setItem("showSideBar1", "false")
                this.showSideBar1 = localStorage.getItem("showSideBar1")
            }
        await fetch(`http://localhost:8080/api/users/admin`,
        {
              headers: AuthService.authHeader()
        }
        )
        .then(response=>response.json())
        .then(data => {
            console.log('datauser : ',data);
            this.admin = data.isAdmin
        })
        .catch(error => {
           console.error(error);
        }); 
        window.addEventListener('resize', this.checkScreenSize);
        this.showSideBar1 = localStorage.getItem("showSideBar1")
        
    },

    beforeDestroy() {
        window.removeEventListener('resize', this.checkScreenSize);
    }
}
</script>

<style scoped>

.sideBar{
    z-index: 9999;
}

.buttonIconFA{
    z-index: 9999;
    width: 100%;
    display: flex;       
    flex-direction: row;
    align-items: center;
    justify-content: space-around; 
}

#sideBar1{
    background-color:burlywood;
    z-index: 9999;

    border: 2px solid black;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    height: 8vh;
    width:100%;

    position: fixed;
    bottom: 0%;

    display: flex;       
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
}

#sideBar2{
    background-color:burlywood;
    z-index: 9999;
    border: 2px solid black;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    height: 50vh;
    width:50px;

    position: fixed;
    left: 0;
    top: 50%;
    transform: translateY(-50%);

    display: flex;       
    flex-direction: column;
    align-items: center;
    justify-content: space-around; 
}

#sideBar2Hide{
    background-color:burlywood;
    z-index: 9999;
    animation: slideME 0.8s ease-in;
    
    border: 2px solid black;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    height: 50vh;
    width:23%;
    
    position: fixed;
    left: 0;
    top: 50%;
    transform: translateY(-50%);

    display: flex;       
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}

@keyframes slideME {
    0% {
        transform: translateX(-230px) translateY(-50%);
    }
    100% {
        transform: translateX(0px) translateY(-50%);
    }
}

.buttonSideBar{
    z-index: 9999;
    width: 50%;
    margin-left:10%;
}

</style>