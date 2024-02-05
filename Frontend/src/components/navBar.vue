<template>
    <nav class="navbar navbarcenter">
        <div class="container-fluid container-fluid-custom">
            <a class="navbar-brand navbar-brand-custom">YouGame</a>
            <div v-if="dontshowSearch == 'false'">
                <form class="d-flex formSearch" role="search" >
                <input class="form-control me-2 searching" type="search" placeholder="Search" aria-label="Search" v-model="searchTitle">
                <button class="btn btn-outline-success" type="submit" @click="search">Search</button>
                </form>
            </div>
        </div>
    </nav>  
  </template>

<script>
export default {
    name:"NavBar",
    data(){
        return{
            dontshowSearch:'false',
            searchTitle:'',
        }
    },
    methods:{
        search(){
            this.$router.push({ name: 'advancedSearch', params: { title: this.searchTitle } })
        },
        checkScreenSize() {
            if (window.innerWidth < 740) {
                this.dontshowSearch = "true"
                localStorage.setItem("dontshowSearch", "true")
                this.dontshowSearch = localStorage.getItem("dontshowSearch")
            }
            else if(window.innerWidth > 700){
                this.dontshowSearch = "false"
                localStorage.setItem("dontshowSearch", "false")
                this.dontshowSearch = localStorage.getItem("dontshowSearch")
            }
        },
        checkSideBar2Enter(){
            this.dontshowSearch = "true"
        },
        checkSideBar2Leave(){
            this.dontshowSearch = "false"
        }
    },
    mounted(){
        this.showMenuRoom = localStorage.getItem("dontshowSearch")
        window.addEventListener('resize', this.checkScreenSize);
    },

    beforeDestroy() {
        window.removeEventListener('resize', this.checkScreenSize);
    }
    
}
</script>

<style scoped>

.navbarcenter{
    z-index: 9999;
    border: 2px solid black;
    background-color: burlywood;
    width:100%;
    top:0%;
    margin-bottom: 2%;
    height:10vh;
    border-bottom-left-radius:10px;
    border-bottom-right-radius:10px;
}

.formSearch {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.navbarcenter .container-fluid-custom {
  position: relative;
}

.navbar-brand-custom {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

</style>