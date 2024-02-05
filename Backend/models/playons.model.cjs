module.exports=(sequlize, DataTypes) => {

    const Playons = sequlize.define("playons", {
        idGame:{
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        namePlateform:{
            type: DataTypes.STRING,
            primaryKey: true
        }
    }, {
        timestamps: false // Désactive les horodatages createdAt et updatedAt
    });
    return Playons
}