<script setup>
import { ref, onMounted } from "vue";
import AuthService from "../services/auth.service.js";
import titlecomponent from "../components/titlecomponent.vue";

const loginEmail = ref("");
const loginPassword = ref("");

const registerUsername = ref("");
const registerPP = ref("");
const registerEmail = ref("");
const registerPassword = ref("");

function onSubmittingLogin() {
    AuthService.login({ email: loginEmail.value, password: loginPassword.value });
}

function onSubmittingRegister() {
    AuthService.register({ username: registerUsername.value, emailUser: registerEmail.value, passwordUser: registerPassword.value, ppUser: registerPP.value })
}
</script>

<template>
    <titlecomponent title="YouGame - Login" />
    <div class="container-fluid">
        <div class="accordion position-absolute top-50 start-50 translate-middle w-50" id="loginRegisterDisplay">
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#loginCollapse"
                        aria-expanded="true" aria-controls="loginCollapse">
                        Login
                    </button>
                </h2>
                <div id="loginCollapse" class="accordion-collapse collapse show p-2" data-bs-parent="#loginRegisterDisplay">
                    <form @submit.prevent="onSubmittingLogin()">
                        <div class="form-floating mb-3">
                            <input type="email" class="form-control" id="emailLoginInput" v-model="loginEmail"
                                placeholder="name@example.com">
                            <label for="emailLoginInput">Email address</label>
                        </div>
                        <div class="form-floating mb-2">
                            <input type="password" class="form-control" id="passwordLoginInput" v-model="loginPassword"
                                placeholder="Don't use 123 ;)">
                            <label for="passwordLoginInput">Password</label>
                        </div>
                        <p class="errorMessage hide ps-2 mb-1">Error !</p>
                        <div class="text-end">
                            <button id="loginButton" type="submit" class="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#registerCollapse" aria-expanded="false" aria-controls="registerCollapse">
                        Register
                    </button>
                </h2>
                <div id="registerCollapse" class="accordion-collapse collapse p-2" data-bs-parent="#loginRegisterDisplay">
                    <form @submit.prevent="onSubmittingRegister()">
                        <div class="row">
                            <div class="col">
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="usernameRegister" v-model="registerUsername"
                                        placeholder="Jacky963">
                                    <label for="usernameRegister">Username</label>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="ppRegister" v-model="registerPP"
                                        placeholder="*.png" pattern="^(https?://.+\.(jpg|jpeg|png|gif|bmp)|)$"
                                        title="Please enter a valid image URL (e.g., http://example.com/image.jpg)">
                                    <label for="ppRegister">Profile Picture link</label>
                                </div>
                            </div>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="email" class="form-control" id="emailLoginInput" v-model="registerEmail"
                                placeholder="name@example.com">
                            <label for="emailLoginInput">Email address</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="password" class="form-control" id="passwordLoginInput" v-model="registerPassword"
                                placeholder="Don't use 123 ;)">
                            <label for="passwordLoginInput">Password</label>
                        </div>
                        <p class="errorMessage hide ps-2 mb-1">Error !</p>
                        <div class="text-end">
                            <button id="registerButton" type="submit" class="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.errorMessage {
    color: crimson;
}

.hide {
    display: none;
}
</style>