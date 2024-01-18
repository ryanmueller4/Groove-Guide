const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        mbid: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        recommended: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        caption: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len : [1,50],
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            refernces: {
                model: 'user',
                key: 'id',
                unique: false
            }
        },
        comment_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'comment',
                key: 'id',
                unique: false
            }
        }
    },
    {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: 'post',
    },
);

module.exports = Post;