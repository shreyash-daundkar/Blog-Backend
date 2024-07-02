const express = require("express");
const database = require("./utils/database")
const dotenv = require("dotenv");
const addModelsRelations = require("./utils/model-relations");
const errorMiddleware = require("./middlewares/error");
const authRouter = require("./routes/auth");
const { createTags, getAllTags } = require("./services/tag");
const predefinedTags = require("./utils/predefined-tags");
const postRouter = require("./routes/post");
const authMiddleware = require("./middlewares/auth");
const tagRouter = require("./routes/tag");


dotenv.config();

const app = express();

app.use(express.json());



app.use('/', authRouter);

app.use('/post', authMiddleware, postRouter);

app.use('/tag', authMiddleware, tagRouter);

app.use(errorMiddleware);



addModelsRelations();

(async () => {
    await database.sync();

    const tags = await getAllTags();
    if(tags.length === 0) {
        await createTags(predefinedTags);
    }

    app.listen(process.env.PORT || 3000, () => {
        console.log("Running on Port", process.env.PORT);
    });
})();
