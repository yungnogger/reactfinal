class CategoryDAL {
    constructor(mongoose) {
        this.mongoose = mongoose;
        const categorySchema = new mongoose.Schema({
            category: String
        });
        this.categoryModel = mongoose.model('category', categorySchema);
    }

    async getCategories() {
        try {
            return await this.categoryModel.find({});
        } catch (error) {
            console.error("getCategories:", error.message);
            return {};
        }
    }

    async getCategory(id) {
        try {
            return await this.categoryModel.findById(id);
        } catch (error) {
            console.error("getCategory:", error.message);
            return {};
        }
    }


    async createCategory(newCategory) {
        let question = new this.categoryModel(newCategory);
        return question.save();
    }


    async bootstrapCategory(count = 3) {
        let l = (await this.getCategories()).length;
        console.log("Book categories in amount:", l);

        if (l === 0) {
            let promises = [];

            for (let i = 0; i < count; i++) {
                let question = new this.categoryModel({
                    category: 'english number: ' + i
                });
                promises.push(question.save());
            }

            return Promise.all(promises);
        }
    }
}

module.exports = (mongoose) => new CategoryDAL(mongoose);