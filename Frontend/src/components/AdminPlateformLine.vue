<script setup>
const props = defineProps(['plateformData']);
</script>

<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title text-center m-0">{{ plateformData.namePlateform }}</h5>
        </div>
    </div>
</template>