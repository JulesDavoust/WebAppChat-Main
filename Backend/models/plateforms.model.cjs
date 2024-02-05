module.exports=(sequlize, DataTypes) => {

    const Plateforms = sequlize.define("plateforms", {
        namePlateform:{
            type: DataTypes.STRING,
            primaryKey: true
        },
    }, {
        timestamps: false // Désactive les horodatages createdAt et updatedAt
    });
    return Plateforms
}