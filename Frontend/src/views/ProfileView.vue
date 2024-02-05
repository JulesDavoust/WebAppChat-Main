<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import AuthService from '../services/auth.service';
import TitleComponent from '../components/titlecomponent.vue';
import NavBar from '../components/navBar.vue';
import SideBar from '../components/SideBar.vue';

const toast = useToast();
const toastData = {
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
};
const API_URL = "http://localhost:8080/api/";

const user = ref({ username: "", emailUser: "", ppUser: "", isAdmin: 0 });
const editUsername = ref(false);
const newUsername = ref("");
const editEmail = ref(false);
const newEmail = ref("");
const oldPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const newPpUser = ref("");

user.value = {
    username: "",
    emailUser: "",
    ppUser: "",
    isAdmin: 1
};

onMounted(() => {
    fetch(API_URL + 'users/@me', {
        headers: AuthService.authHeader()
    })
        .then(response => response.json())
        .then(data => {
            user.value = data;
            newUsername.value = user.value.username;
            newEmail.value = user.value.emailUser;
            if (user.value.ppUser === "" || user.value.ppUser == null) {
                user.value.ppUser = "https://tp.gensdeconfiance.com/images/defaults/man.png?twic=v1/output=jpeg"
            }
        })
        .catch(err => console.log("Error"));
});

function editUsernameClicked() {
    if (editUsername.value == true) {
        newUsername.value = user.value.username;
    }

    if (editUsername.value == false && editEmail.value == true) {
        editEmailClicked();
    }

    editUsername.value = !editUsername.value;
}

function editEmailClicked() {
    if (editEmail.value == true) {
        newEmail.value = user.value.emailUser;
    }

    if (editEmail.value == false && editUsername.value == true) {
        editUsernameClicked();
    }

    editEmail.value = !editEmail.value;
}

function submitUpdateProfile() {
    let updateData;
    if (newUsername.value !== user.value.username) {
        updateData = { username: newUsername.value };
    } else {
        updateData = { emailUser: newEmail.value };
    }
    editEmail.value = false;
    editUsername.value = false;

    fetch(API_URL + 'users/@me', {
        method: 'PUT',
        headers: Object.assign({ 'Content-Type': 'application/json' }, AuthService.authHeader()),
        body: JSON.stringify(updateData)
    })
        .then(result => result.json())
        .then(data => {
            if (data.message === "Value unchanged") {
                toast.warning(data.message, toastData);
            } else if (data.message === "User updated") {
                if (newUsername.value !== user.value.username) {
                    user.value.username = newUsername.value;
                } else {
                    user.value.emailUser = newEmail.value;
                }
                toast.success(data.message, toastData);
            }
        })
        .catch((err) => console.log(err));
}

function submitNewPassword() {
    if (editEmail.value) {
        editEmailClicked()
    }

    if (editUsername.value) {
        editUsernameClicked()
    }

    if (newPassword.value !== confirmPassword.value) {
        toast.error("The confirm password must be the same than the new one", toastData);
    } else {
        const updateData = {
            oldPassword: oldPassword.value,
            passwordUser: newPassword.value,
            confirmPassword: confirmPassword.value,
        }
        fetch(API_URL + 'users/@me/password', {
            method: 'PUT',
            headers: Object.assign({ 'Content-Type': 'application/json' }, AuthService.authHeader()),
            body: JSON.stringify(updateData)
        })
            .then(result => result.json())
            .then(data => {
                if (data.message === "Password updated") {
                    toast.success(data.message, toastData);
                    oldPassword.value = "";
                    newPassword.value = "";
                    confirmPassword.value = "";
                } else if (data.message === "Value unchanged") {
                    toast.warning(data.message, toastData);
                } else if (data.message === "Wrong password") {
                    toast.error(data.message, toastData);
                } else {
                    console.log(data);
                }
            })
            .catch((err) => console.log(err));
    }
}

function submitNewPpUser() {
    const updateData = { ppUser: newPpUser.value };
    fetch(API_URL + 'users/@me', {
        method: 'PUT',
        headers: Object.assign({ 'Content-Type': 'application/json' }, AuthService.authHeader()),
        body: JSON.stringify(updateData)
    })
        .then(result => result.json())
        .then(data => {
            if (data.message === "Value unchanged") {
                toast.warning(data.message, toastData);
            } else if (data.message === "User updated") {
                document.getElementById("closeNewPPModal").click();
                user.value.ppUser = newPpUser.value;
                newPpUser.value = "";
                toast.success(data.message, toastData);
            }
        })
}
</script>

<template>
    <NavBar />
    <SideBar />
    <TitleComponent title="YouGame - Profile" />
    <div class="container" style="margin-top: 10px;">
        <div class="row">
            <div class="col-auto">
                <div class="profile-container">
                    <div class="editIcon-container btn">
                        <button type="button" class="btn btn-link" style="padding: 0%;" data-bs-toggle="modal"
                            data-bs-target="#exampleModal">
                            <img class="editIcon" src="https://cdn-icons-png.flaticon.com/512/1860/1860115.png" alt="...">
                        </button>
                    </div>
                    <img :src=user.ppUser class="rounded resized-image" alt="Profile Picture">
                </div>
            </div>
            <div class="col align-self-center">
                <div class="row align-self-center">
                    <div class="col-auto">
                        <h1 v-show="!editUsername" class="text-break">{{ user.username }}</h1>
                        <form @submit.prevent="submitUpdateProfile()">
                            <input v-show="editUsername" type="text" class="form-control" placeholder="Username"
                                aria-label="Username" aria-describedby="basic-addon1" v-model="newUsername"
                                style="font-size: 32px;">
                        </form>
                    </div>
                    <div class="col-auto" style="padding-left: 0%;">
                        <button type="button" class="btn btn-link" style="padding: 0%;" @click="editUsernameClicked()">
                            <img class="editIcon" src="https://cdn-icons-png.flaticon.com/512/1860/1860115.png" alt="...">
                        </button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-auto">
                        <h4 v-show="!editEmail" class="text-break">{{ user.emailUser }}</h4>

                        <form @submit.prevent="submitUpdateProfile()">
                            <input v-show="editEmail" type="text" class="form-control" placeholder="E-Mail"
                                aria-label="E-Mail" aria-describedby="basic-addon1" v-model="newEmail">
                        </form>
                    </div>
                    <div class="col-auto" style="padding-left: 0%;">
                        <button type="button" class="btn btn-link" style="padding: 0%;" @click="editEmailClicked()">
                            <img class="editIcon" src="https://cdn-icons-png.flaticon.com/512/1860/1860115.png" alt="...">
                        </button>
                    </div>
                </div>
                <div class="row" v-if="user.isAdmin == 1">
                    <h5>You are an administrator !</h5>
                </div>
            </div>
        </div>
        <div class="row mt-4">
            <form @submit.prevent="submitNewPassword()">
                <div class="form-floating mb-3">
                    <input type="password" class="form-control" id="oldPasswordInput" placeholder="Password"
                        v-model="oldPassword">
                    <label for="oldPasswordInput">Old password</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="password" class="form-control" id="newPasswordInput" placeholder="Password"
                        v-model="newPassword">
                    <label for="newPasswordInput">New password</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="password" class="form-control" id="confirmPasswordInput" placeholder="Password"
                        v-model="confirmPassword">
                    <label for="confirmPasswordInput">Confirm password</label>
                </div>
                <div class="align-item-center text-center">
                    <button type="submit" class="btn btn-success" style="width: auto;">Submit</button>
                </div>
            </form>
        </div>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
            style="margin-top: 20vh;">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col">
                                <form @submit.prevent="submitNewPpUser()">
                                    <div class="form-floating mb-3">
                                        <input type="url" class="form-control" id="ppRegister" placeholder="*.png"
                                            pattern="https?://.+\.(jpg|jpeg|png|gif|bmp)"
                                            title="Please enter a valid image URL (e.g., http://example.com/image.jpg)"
                                            v-model="newPpUser">
                                        <label for="ppRegister">Profile Picture link</label>
                                    </div>
                                </form>
                            </div>
                            <div class="col-auto">
                                <button id="closeNewPPModal" type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.resized-image {
    width: 200px;
    height: 200px;
    object-fit: cover;
    object-position: 0% 0%;
}

.editIcon {
    width: 20px;
    /* height: 200px; */
}

.profile-container {
    position: relative;
    display: inline-block;
}

.editIcon-container {
    position: absolute;
    top: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.5);
    padding: 0.2px 5px 5px 5px;
    border-radius: 0 0 0 .375rem;
}

@media screen and (min-width: 768px) {
    .editIcon-container {
        display: none;
    }

    .profile-container:hover .editIcon-container {
        display: block;
    }
}
</style>