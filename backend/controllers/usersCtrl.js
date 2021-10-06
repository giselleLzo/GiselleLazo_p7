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