const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');
const fs = require('fs');

//Création des utilisateurs

exports.findOneUser = (req, res, next) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0){
        res.status(400).json({ 'error': 'invalid token' });
    }
    models.User.findOne({
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        where: {id: userId}
    })
    .then(user => { res.status(201).json(user)})
    .catch(error => res.status(404).json({ error }))

}

exports.findAllUser = (req, res) => {
    models.User.findAll({
        attributes: { exclude: ['email', 'password', 'createdAt', 'updatedAt'] },
    })
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({ error }));
}

exports.updateProfile = async function(req, res) {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0){
        res.status(400).json({ 'error': 'invalid token' });
    }

    //Params
    const username = req.body.username;
    const bio = req.body.bio;

    await models.User.findOne({
        attributes: ['id', 'bio'],
        where: {id: userId}
    }).then(async function (userFound) {
        if(userFound) {
            await userFound.update({
                username: (username ? username : userFound.username),
                bio: (bio ? bio : userFound.bio), 
            }).then(function() {
                res.status(200).json({ message: 'Profile has been updated'})
            }).catch( error => {
                res.status(500).json({ error });
            });
        }else {
            res.status(404).json({ 'error': 'Cannot find user' });
        }
    })
    .catch(error => {
        res.status(500).json({ error });
    });
}

exports.deleteOneUser = async (req, res) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);
    const isAdmin = jwtUtils.getAdmin(headerAuth);

    try{
        const user = await models.User.findOne({ where: {id: req.params.userId}})

        if (userId === user.id || isAdmin === true){
            if (user.profilePhoto !== null){
                const filename = user.profilePhoto.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    user.destroy({
                        where: {id: req.params.userId}
                    })
                    return res.json({ message: 'Profile removed'})
                })
            } else {
                user.destroy({
                    where: {id: req.params.userId}
                })
                return res.json({ message: 'Profile removed'})
            }
        }else {
            res.status(404).json({ 'error': 'Unable to verify user' });
        }
    }catch (err) {
        return res.status(500).json({err})
    }
}