class QuestionDAL {
    constructor(mongoose) {
        this.mongoose = mongoose;
        const questionSchema = new mongoose.Schema({
            text: String,
            category: String
        });
        this.questionModel = mongoose.model('question', questionSchema);
    }

    async getQuestions() {
        try {
            return await this.questionModel.find({});
        } catch (error) {
            console.error("getQuestion:", error.message);
            return {};
        }
    }

    async getQuestion(id) {
        try {
            return await this.questionModel.findById(id);
        } catch (error) {
            console.error("getQuestion:", error.message);
            return {};
        }
    }

    async createQuestion(newQuestion) {
        let question = new this.questionModel(newQuestion);
        return question.save();
    }


    async bootstrap(count = 10) {
        let l = (await this.getQuestions()).length;
        console.log("Book collection size:", l);

        if (l === 0) {
            let promises = [];

            for (let i = 0; i < count; i++) {
                let rng = Math.floor(Math.random() * 3);
                let question = new this.questionModel({
                    text: '9th grade english book for sale',
                    category: 'english number: ' + rng
                });
                promises.push(question.save());
            }

            return Promise.all(promises);
        }
    }
}

module.exports = (mongoose) => new QuestionDAL(mongoose);