<template>
    <div id="GameCompHeader">
        <div class="container containerGameH">
            <div class="row">
                <div class="rowTitleGame">
                    <h1 class="titleGame">{{GameName.titleGame}}</h1>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'GameCompHeader',
    props:{
        GameName:Object
    }

}
</script>

<style scoped>
.rowTitleGame{
    border:2px solid black;
    border-radius: 20px;
    width:90%;
    display: flex;
    justify-content: center;
    background-color: white;
    box-shadow: 0px 0px 8px 5px black;
}

.rowTitleGame:hover{
    transform: scale(1.03);
    transition: 0.3s ease-in-out;
}

.titleGame{
    color:black;
    font-size:300%;
}

#GameCompHeader{
    border:2px solid black;
    width:100%;
    padding:5vh;
    background-color:burlywood;
    border-bottom-right-radius: 50px;
    box-shadow: 0px 0px 8px 5px black;
}

@media(max-width: 1024px){
    .rowTitleGame{
        border:2px solid black;
        border-radius: 20px;
        width:90%;
        display: flex;
        justify-content: center;
        background-color: white;
        box-shadow: 0px 0px 8px 5px black;
    }

    .rowTitleGame:hover{
        transform: scale(1.03);
        transition: 0.3s ease-in-out
    }

    .titleGame{
        color:black;
        font-size:190%;
    }

    #GameCompHeader{
        border:2px solid black;
        width:100%;
        padding:2vh;
        background-color:burlywood;
        border-bottom-right-radius: 50px;
        box-shadow: 0px 0px 8px 5px black;
    }
}

@media(max-width: 425px){
    .titleGame{
        color:black;
        font-size:140%;
    }

    .rowTitleGame{
        border:2px solid black;
        border-radius: 20px;
        width:90%;
        display: flex;
        justify-content: center;
        background-color: white;
        box-shadow: 0px 0px 8px 5px black;
    }
}
</style>