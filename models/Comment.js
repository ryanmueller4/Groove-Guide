const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        comment_body: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            refernces: {
                model: 'user',
                key: 'id',
                unique: false
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            refernces: {
                model: 'post',
                key: 'id',
                unique: false
            }
        },

    },
    {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: 'comment',
    },
);

module.exports = Comment;