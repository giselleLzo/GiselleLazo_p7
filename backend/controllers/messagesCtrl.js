const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');
const fs = require('fs');

//Création d'un message

exports.createPost = async (req, res) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);

    //Params
    const title = req.body.title;
    const content = req.body.content;
    const attachment = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : "";

    await models.User.findOne({
        where: { id: userId }
    })
    .then(async function(user) {
        if(user){
            let user = await models.User.findOne({ where: {id: userId} })
            let newPost = await models.Message.create({
                title : title,
                content : content,
                attachment: attachment,
                UserId : user.id,
                username: user.username,
            });
            return res.status(201).json({ newPost: newPost });
        }else {
            res.status(404).json({ 'error': 'Cannot find user' });
        }
    }).catch(function(err) {
        return res.status(500).json({ 'error': err });
    });
}

exports.getOnePost = async (req, res) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);

    await models.Message.findOne({
        attributes: ['id', 'title', 'username', 'userId', 'content', 'attachment', 'createdAt'],
        where: { id: req.params.id },
    })
    .then(async function(post) {
        await models.User.findOne({
            attributes: ['username'],
            where: { id: userId }
        }).then(async function(user){
            await models.Comment.findAll({
                attributes: ['comment', 'username', 'id', 'userId', ],
                where: { postId: req.params.id },
            })
            .then(function (comments) {
                const getComment = {post, comments}
                res.status(200).json(getComment)
            }).catch(function(err) {
                console.log(err);
                res.status(500).json({ 'error': err });
            });
        }).catch(function(err) {
            console.log(err);
            res.status(500).json({ 'error': err });
        });
    }).catch(function(err) {
        console.log(err);
        res.status(500).json({ 'error': err});
    });
}

exports.getAllPost = (req, res) => {
    models.Message.findAll()
    .then(function(posts) {
        if (posts) {
            res.status(200).json({ posts: posts });
        }else {
            res.status(404).json({ 'error': 'Cannot find post' });
        }
    }).catch(function(err) {
        console.log(err);
        res.status(500).json({ 'error': err });
    });
}

exports.deletePost = async (req, res) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);
    const isAdmin = jwtUtils.getAdmin(headerAuth);

    await models.User.findOne({
        where: { id: userId }
    }).then( async () => {
        try {
            const post = await models.Message.findOne({ where: { id: req.params.id }})
        
        if(userId == post.UserId || isAdmin === true){
            const filename = post.attachment.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                post.destroy()
                return res.json({ message: 'Post removed'})
            });
        }else {
            res.status(404).json({ 'error': 'Unable to verify user'});
        }
    }catch (err) {
        return res.status(500).json({'error': err })
    }
}).catch(function(err) {
    return res.status(500).json({ 'error': err })
});
}