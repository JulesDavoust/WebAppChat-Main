<script setup>
const props = defineProps(['gameData']);
const plateformData = props.gameData.plateforms;
let plateforms = "";
try {
    for (let i = 0; i < plateformData.length; i++) {
        plateforms += plateformData[i].namePlateform;
        if (i < plateformData.length - 1) {
            plateforms += ", ";
        }
    }
} catch (error) {
    if (error instanceof TypeError) {
        throw "Test";
    } else {
        throw error;
    }
}
</script>

<template>
    <th class="align-middle" scope="row">{{ props.gameData.titleGame }}</th>
    <td class="align-middle d-none d-sm-table-cell">{{ props.gameData.typeGame }}</td>
    <td class="align-middle adminResponsive">{{ props.gameData.publisherGame }}</td>
    <td class="align-middle adminResponsive d-none d-sm-table-cell">{{ props.gameData.yearGame }}</td>
    <td class="align-middle d-none d-sm-table-cell">{{ plateforms }}</td>
</template>