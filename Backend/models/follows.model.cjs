module.exports=(sequlize, DataTypes) => {

    const Follows = sequlize.define("follows", {
        idUser:{
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        idDiscussion:{
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        isAdmin:{
            type: DataTypes.TINYINT
        }
    }, {
        timestamps: false // Désactive les horodatages createdAt et updatedAt
    });
    return Follows
}