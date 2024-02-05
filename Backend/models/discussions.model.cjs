module.exports=(sequlize, DataTypes) => {

    const Discussions = sequlize.define("discussions", {
        idDiscussion:{
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        isPrivate:{
            type: DataTypes.TINYINT
        },
        nameDiscussion:{
            type: DataTypes.STRING
        },
        idGame:{
            type: DataTypes.INTEGER
        }
    }, {
        timestamps: false // Désactive les horodatages createdAt et updatedAt
    });
    return Discussions
}