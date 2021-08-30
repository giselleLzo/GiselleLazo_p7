const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');

//Création des commentaires

exports.createComment = async (req, res, next) => {
    const headerAuth = await req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);

    const postId = req.params.id;

    if (postId <= 0) {
        return res.status(400).json({ 'error': 'Invalid param' });
    }

    const comment = req.body.comment;

    await models.User.findOne({
        where: { id: userId }
    })
        .then(async function (user) {
            if (user) {
                let newComment = await models.Comment.create({
                    userId: userId,
                    postId: req.params.postId,
                    username: user.username,
                    comment: comment,
                });
                return res.status(201).json({ newComment: newComment });
            } else {
                return res.status(404).json({ 'error': 'User not found' })
            }
        }).catch(function (error) {
            return res.status(500).json({ error });
        });
}

exports.getAllComment = (req, res) => {
    models.Comment.findAll({
        attributes: ['postId'],
    })
        .then(function (comments) {
            if (comments) {
                res.status(200).json({ comments: comments });
            } else {
                res.status(404).json({ 'error': 'Post not found' });
            }
        }).catch(function (err) {
            console.log(err);
            res.status(500).json({ 'error': err });
        });
}

exports.deleteComment = async (req, res) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);
    const isAdmin = jwtUtils.getAdmin(headerAuth);

    await models.User.findOne({
        where: { id: userId }
    }).then(async () => {
        try {
            const comment = await models.Comment.findOne({ where: { id: req.params.id } })
            if (userId == comment.userId || isAdmin === true) {
                await comment.destroy()
                return res.json({ message: 'Comment removed' })
            } else {
                res.status(404).json({ 'error': 'Unable to verify user' });
            }
        } catch (err) {
            return res.status(500).json({ 'error': err })
        }
    })
        .catch(function (err) {
            return res.status(500).json({ 'error': err })
        });
}
