<template>
        <nav class="navbar navbar-expand-lg navbarSearchBar">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Find your game :</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Platforms
                        </a>
                        <ul class="dropdown-menu conteneur-item">
                            <div v-for="item in Platforms" :key="item.namePlateform">
                                <li>
                                    <a class="dropdown-item">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" :value="item.namePlateform" v-model="selectedPlatform" id="flexCheckDefault">
                                            <label class="form-check-label" for="flexCheckDefault">
                                                {{ item.namePlateform }}
                                            </label>
                                        </div>
                                    </a>
                                </li>
                            </div>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Type
                        </a>
                        <ul class="dropdown-menu conteneur-item">
                            <div v-for="item in typesGame" :key="item.typeGame">
                                <li>
                                    <a class="dropdown-item">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" :value="item.typeGame" v-model="selectedType" @click="TypeClick" id="flexRadioDefault1">
                                            <label class="form-check-label" for="flexRadioDefault1">
                                                {{ item.typeGame }}
                                            </label>
                                        </div>
                                    </a>
                                </li>
                            </div>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Publisher
                        </a>
                        <ul class="dropdown-menu conteneur-itemPublisher">
                            <div v-for="item in publishersGame" :key="item.publishersGame">
                                <li>
                                    <a class="dropdown-item">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" :value="item.publisherGame" v-model="selectedPublisher" @click="PublisherClick" id="flexRadioDefault2">
                                            <label class="form-check-label" for="flexRadioDefault2">
                                                {{ item.publisherGame }}
                                            </label>
                                        </div>
                                    </a>
                                </li>
                            </div>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Year
                        </a>
                        <ul class="dropdown-menu conteneur-item">
                            <li v-for="item in yearsGame" :key="item.id">
                                <a class="dropdown-item">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" :value="item.yearGame" v-model="selectedYear">
                                        <label class="form-check-label" :for="'flexRadioDefault' + item.id">
                                            {{ item.yearGame }}
                                        </label>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
                    <input class="form-control me-2 searching" type="search" placeholder="Name's game" aria-label="Search" v-model="selectedTitle">
                    <button class="btn btn-outline-success" @click="submit">Search</button>
                </div>
            </div>
        </nav>
</template>

<script>
export default {
    name:"searchBar",
    data(){
        return{
            Platforms:[],
            typesGame:[],
            publishersGame:[],
            yearsGame:[],
            selectedPlatform:[],
            selectedType:[],
            selectedPublisher:[],
            selectedYear: [],
            selectedTitle: [],
            Games:[],
            searchData:[],
            isSubmit:false,
            isLoading:null,
        }
    },
    watch: {
        searchData(newVal) {
            this.$emit('data-changed', newVal);
        },
        isLoading(newVal){
            this.$emit('isLoading-changed', newVal);
        }
    },
    methods:{
        async submit(){
            console.log(this.selectedTitle, this.selectedPlatform[0], String(this.selectedType), this.selectedPublisher, this.selectedYear, String(1))
            const queryParams = [[this.selectedTitle],[this.selectedType],[this.selectedPublisher],[this.selectedYear],this.selectedPlatform]
            //const queryParams = [["Accel"],[""],[""],[""],[]]
            this.isLoading = true;
            await fetch(`http://localhost:8080/api/intern/searchGame/${queryParams}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.Games = data
            })
            console.log(this.Games)
            this.searchData = this.Games
            this.isLoading = false;
            
        },
        updateGames() {
            this.$emit('games-updated', this.Games);
        }
    },
    async created(){
        await fetch("http://localhost:8080/api/intern/allPlatformsGame")
        .then(response => response.json())
        .then(data =>{
            this.Platforms = data;
            console.log(this.Platforms[0].namePlateform)
        })

        await fetch("http://localhost:8080/api/intern/allTypesGame")
        .then(response => response.json())
        .then(data => {
            this.typesGame = data;
            console.log(this.typesGame)
        })

        await fetch("http://localhost:8080/api/intern/allPublishersGame")
        .then(response => response.json())
        .then(data => {
            this.publishersGame = data
        })

        await fetch("http://localhost:8080/api/intern/allYearsGame")
        .then(response => response.json())
        .then(data => {
            this.yearsGame = data
        })
    }

}
</script>

<style scoped>
#searchBar{
    border:2px solid black;
    width:85%;
    height:14vh;
}

.searching{
    width:200px;
}

.navbarSearchBar{
    z-index: 9999;
    border: 2px solid black;
    background-color: burlywood;
    width:80%;
    border-bottom-left-radius:10px;
    border-bottom-right-radius:10px;
}

.conteneur-itemPublisher{
    width: 350px; 
    height: 50vh;
    overflow: auto;
}


.conteneur-item{
    width: 200px; 
    height: 50vh;
    overflow: auto;
}
</style>