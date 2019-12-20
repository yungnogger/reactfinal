module.exports = (dal) => {
    let express = require('express');
    let router = express.Router();

    router.get('/', (req, res) => {
        dal.getCategories().then(categories => res.json(categories));
    });

    router.get('/:id', (req, res) => {
        let id = req.params.id;
        dal.getCategory(id).then(category => res.json(category));
    });

    router.post('/', (req, res) => {
        let newCategory = {
            category : req.body.text
        };
        dal.createCategory(newCategory).then(newCategory => res.json(newCategory));
    });

    return router;
};