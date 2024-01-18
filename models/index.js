const User = require('./User');
const Post = require('./Post')
const Comment = require('./Comment')

User.belongsToMany(Comment, {
    through: {
        model: Post,
        unique: false,
    },
    as: 'user_comments'
});

Comment.belongsToMany(User, {
    through: {
        model: Post,
        unique: false,
    },
    as: 'comments_users'
});

module.exports = {
    User,
    Post,
    Comment,
};