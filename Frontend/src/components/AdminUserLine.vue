<script setup>
import AuthService from "../services/auth.service";
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

const props = defineProps(['userData']);
const idUser = props.userData.idUser;
const adminCheckedClass = ref("btn btn-danger");

if (props.userData.isAdmin == 1) {
    adminCheckedClass.value = adminCheckedClass.value + " disabled";
}

function onDelete() {
    const userLineDisplay = document.getElementById("user-" + idUser);
    fetch('http://localhost:8080/api/users', {
        method: 'DELETE',
        headers: Object.assign({ 'Content-Type': 'application/json' }, AuthService.authHeader()),
        body: JSON.stringify({ idUser: idUser })
    })
        .then(response => response.json())
        .then(data => {
            if (data.message.includes("User deleted")) {
                userLineDisplay.remove();
                toast.error("User deleted", {
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
            }
        });
}
</script>

<template>
    <tr :id="'user-' + idUser">
        <th class="align-middle" scope="row">{{ props.userData.username }}</th>
        <td class="align-middle">{{ props.userData.emailUser }}</td>
        <td class="align-middle">
            <button type="button" :class="adminCheckedClass" @click="onDelete()">Delete</button>
        </td>
    </tr>
</template>

<style scoped></style>