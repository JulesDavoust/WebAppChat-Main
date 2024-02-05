<script setup>
import { onMounted, ref, createApp } from 'vue';
import { useToast } from 'vue-toastification';
import TitleComponent from '../components/titlecomponent.vue';
import AdminGameLine from '../components/AdminGameLine.vue';
import AdminUserLine from '../components/AdminUserLine.vue';
import AdminPlateformLine from '../components/AdminPlateformLine.vue';
import AuthService from '../services/auth.service';
import router from '../router';
import SideBar from '../components/SideBar.vue';

const toast = useToast();
const API_URL = "http://localhost:8080/api/";

const GAME_DATA_SLICE = 5;
var lastGameRetrived = 0;

const games = ref([]);
const plateforms = ref([]);
const users = ref([]);

const newGameTile = ref("");
const newGameType = ref("");
const newGamePublisher = ref("");
const newGameYear = ref(2023);
const newGamePlateforms = ref([]);

const newPlateformName = ref("");

onMounted(async () => {
    if ((await AuthService.isAdmin()).isAdmin == 0) {
        router.push({ name: 'home' })
    } else {
        fetch(API_URL + 'games', {
            headers: {
                limit: GAME_DATA_SLICE.toString(),
                last_game_retrived: lastGameRetrived.toString()
            }
        })
            .then(response => response.json())
            .then(data => {
                games.value = data;
                lastGameRetrived = data[data.length - 1].idGame;
            })
            .catch(err => console.log("Error"));

        fetch(API_URL + 'plateforms')
            .then(response => response.json())
            .then(data => plateforms.value = data)
            .catch(err => console.log("Error"));

        fetch(API_URL + 'users', {
            headers: AuthService.authHeader()
        })
            .then(response => response.json())
            .then(data => users.value = data)
            .catch(err => console.log("Error"));
    }
})

function onLoadMore() {
    fetch(API_URL + 'games', {
        headers: {
            limit: GAME_DATA_SLICE.toString(),
            last_game_retrived: lastGameRetrived.toString()
        }
    })
        .then(response => response.json())
        .then(data => {
            games.value.push(data);
            data.forEach(game => createNewGameLine(game));
            lastGameRetrived = data[data.length - 1].idGame;
        })
        .catch(err => console.log("Error"));
}

function createNewGameLine(gameData) {
    const gameTable = document.getElementById("gameTable");
    const row = document.createElement("tr");
    row.id = "game-" + gameData.idGame;

    gameTable.appendChild(row);
    createApp(AdminGameLine, { gameData: gameData }).mount("#game-" + gameData.idGame);
}

function OnSubmitNewGame() {
    fetch(API_URL + 'games', {
        method: 'POST',
        headers: Object.assign({ 'Content-Type': 'application/json' }, AuthService.authHeader()),
        body: JSON.stringify({
            titleGame: newGameTile.value,
            typeGame: newGameType.value,
            publisherGame: newGamePublisher.value,
            yearGame: newGameYear.value,
            plateforms: newGamePlateforms.value
        })
    })
        .then(result => result.json())
        .then(data => {
            console.log(data.message);
            toast.success("New game created !", {
                position: "bottom-right",
                timeout: 5000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: false,
                icon: true,
                rtl: false
            });
            document.getElementById("closeNewGameModal").click();
            newGameTile.value = "";
            newGameType.value = "";
            newGamePublisher.value = "";
            newGameYear.value = 2023;
            newGamePlateforms.value = [];
        })
        .catch(err => console.log(err));
}

function OnSubmitNewPlateform() {
    console.log(newPlateformName.value);
    fetch(API_URL + 'plateforms', {
        method: 'POST',
        headers: Object.assign({ 'Content-Type': 'application/json' }, AuthService.authHeader()),
        body: JSON.stringify({ namePlateform: newPlateformName.value })
    })
        .then(result => result.json())
        .then(data => {
            console.log(data.message);
            toast.success("New plateform created !", {
                position: "bottom-right",
                timeout: 5000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: false,
                icon: true,
                rtl: false
            });
            document.getElementById("closeNewPlateformModal").click();
            plateforms.value.push({ namePlateform: newPlateformName.value });
            newPlateformName.value = "";
        })
        .catch(err => console.log(err))
}
</script>

<template>
    <SideBar/>
    <TitleComponent title="YouGame - Admin" />

    <div class="container-fluid">
        <div class="row my-3">
            <div class="col-2 d-none d-sm-block">
                <nav id="navbar-example3" class="h-100 flex-column align-items-stretch pe-4 border-end">
                    <nav class="nav nav-pills flex-column">
                        <a class="nav-link" href="#games">Games</a>
                        <a class="nav-link" href="#users">Users</a>
                        <a class="nav-link" href="#plateforms">Plateforms</a>
                    </nav>
                </nav>
            </div>

            <div class="col-sm-10">
                <div data-bs-spy="scroll" data-bs-target="#navbar-example3" data-bs-smooth-scroll="true"
                    class="scrollspy-example-2" tabindex="0">
                    <div id="games">
                        <h4>Games</h4>
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th class="col-6 col-sm-4" scope="col">Title</th>
                                    <th class="col-sm-2 d-none d-sm-table-cell" scope="col">Type</th>
                                    <th class="col-6 col-sm-2" scope="col">Publisher</th>
                                    <th class="col-sm-1 d-none d-sm-table-cell" scope="col">Year</th>
                                    <th class="col-sm-3 d-none d-sm-table-cell" scope="col">Platform</th>
                                </tr>
                            </thead>
                            <tbody id="gameTable">
                                <!-- <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>@mdo</td>
                                </tr> -->
                                <tr v-for="game in games" :id="'game-' + game.idGame">
                                    <AdminGameLine :gameData="game" />
                                </tr>
                            </tbody>
                        </table>
                        <div class="text-center">
                            <button type="button" class="btn btn-secondary" @click="onLoadMore()">Load
                                More</button>
                            <button type="button" class="btn btn-success ms-5" data-bs-toggle="modal"
                                data-bs-target="#newGameModal">Add new game</button>
                        </div>
                    </div>
                    <div id="users">
                        <h4 class="titleAdminPart">Users</h4>
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th class="col-5" scope="col">Username</th>
                                    <th class="col-6" scope="col">Email</th>
                                    <th class="col-1" scope="col"></th>
                                </tr>
                            </thead>
                            <tbody id="usersTable">
                                <!-- <tr>
                                    <th scope="row">Test</th>
                                    <td>test.test@test.tst</td>
                                    <td>
                                        <button type="button" class="btn btn-danger">Delete</button>
                                    </td>
                                </tr> -->
                                <AdminUserLine v-for="user in users" :userData="user" />
                            </tbody>
                        </table>
                    </div>
                    <div id="plateforms">
                        <h4 class="titleAdminPart">Plateform</h4>
                        <div id="plateformTable" class="row row-cols-auto" style="margin-right: 0%;">
                            <div v-for="plateform in plateforms" :id="'plateform-' + plateform.namePlateform"
                                class="col plateformCards">
                                <AdminPlateformLine :plateformData="plateform" />
                            </div>
                        </div>
                        <div class="text-center">
                            <button type="button" class="btn btn-success ms-5" data-bs-toggle="modal"
                                data-bs-target="#newPlateformModal">Add new plateform</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="modal fade" id="newGameModal" tabindex="-1" aria-labelledby="newGameModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="newGameModalLabel">Add new game</h1>
                        <button id="closeNewGameModal" type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <form @submit.prevent='OnSubmitNewGame()'>
                        <div class="modal-body">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="titleGameInput" placeholder="Title"
                                    maxlength="200" v-model="newGameTile">
                                <label for="titleGameInput">Title Game</label>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="form-floating mb-3">
                                        <input type="text" class="form-control" id="typeGameInput" placeholder="Type"
                                            maxlength="100" v-model="newGameType">
                                        <label for="typeGameInput">Type</label>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-floating mb-3">
                                        <input type="text" class="form-control" id="publisherGameInput"
                                            placeholder="Publisher" maxlength="100" v-model="newGamePublisher">
                                        <label for="publisherGameInput">Publisher</label>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-floating mb-3">
                                        <input type="number" pattern="\d{4}" min="1900" max="2099" class="form-control"
                                            id="yearGameInput" placeholder="XXXX" maxlength="100" v-model="newGameYear">
                                        <label for="yearGameInput">Year</label>
                                    </div>
                                </div>
                            </div>
                            <select class="form-select" multiple aria-label="Multiple select example"
                                v-model="newGamePlateforms">
                                <option v-for="plateform in plateforms">{{ plateform.namePlateform }}</option>
                            </select>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-success">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="modal fade" id="newPlateformModal" tabindex="-1" aria-labelledby="newPlateformModal" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="newPlateformModalLabel">Add new plateform</h1>
                        <button id="closeNewPlateformModal" type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <form @submit.prevent='OnSubmitNewPlateform()'>
                        <div class="modal-body">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="namePlateformInput" placeholder="Plateform"
                                    maxlength="200" v-model="newPlateformName">
                                <label for="namePlateformInput">Name Plateform</label>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-success">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.scrollspy-example-2 {
    height: calc(100vh - 1rem * 2);
    max-height: calc(100vh - 1rem * 2);
    overflow: auto;
}

.plateformCards {
    margin-bottom: 10px;
    margin-top: 10px;
    /* margin: 10px auto; */
}

.titleAdminPart {
    margin-top: 3rem;
}
</style>