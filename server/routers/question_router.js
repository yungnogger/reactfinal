module.exports = (dal) => {
    let express = require('express');
    let router = express.Router();

    router.get('/', (req, res) => {
        dal.getQuestions().then(questions => res.json(questions));
    });

    router.get('/:id', (req, res) => {
        let id = req.params.id;
        dal.getQuestion(id).then(question => res.json(question));
    });

    router.post('/', (req, res) => {
        let newQuestion = {
            text : req.body.text,
            category : req.body.category
        };
        dal.createQuestion(newQuestion).then(newQuestion => res.json(newQuestion));
    });

    return router;
};