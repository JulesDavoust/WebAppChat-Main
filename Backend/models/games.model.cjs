module.exports=(sequlize, DataTypes) => {
    const Games = sequlize.define("games", {
        idGame:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titleGame:{
            type: DataTypes.STRING
        },
        typeGame:{
            type: DataTypes.STRING
        },
        publisherGame:{
            type: DataTypes.STRING
        },
        yearGame:{
            type: DataTypes.INTEGER
        }
    }, {
        timestamps: false // Désactive les horodatages createdAt et updatedAt
    });
    return Games
}