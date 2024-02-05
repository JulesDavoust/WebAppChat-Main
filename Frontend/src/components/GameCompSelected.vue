<template>
    <div id="GameSelected">
        <h4 class="titleDiscussionGameSelected">Discussion : {{ name }}</h4>
    </div>
</template>

<script>
export default {
    name:'GameCompSelected',
    props:{
        name:String
    }
}
</script>

<style scoped>
.titleDiscussionGameSelected{
    font-size: 100%;
}

#GameSelected{
    display: inline-block;
    align-items: center;
    justify-content: center;
    padding:0.5%;
    border:2px solid black;
    background-color: burlywood;
}
</style>