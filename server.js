import express from "express";
import { Sequelize } from "sequelize";
import {handleError} from './src/common/helpers/error.helper.js';
import rootRouter from './src/routes/root.router.js';

const app = express();
// const sequelize = new Sequelize('mysql://root:1234@localhost:3307/AppFood');

// sequelize.authenticate()
//     .then(() => {
//         console.log(`Kết nối db thành công`);
//     }).catch(() => {
//         console.log(`Kết nối db thất bại`);
//     });

// npx sequelize-auto -h localhost -d AppFood -u root -x 1234 -p 3307  --dialect mysql -o src/models -a src/models/additional.json -l esm

app.use(express.json())

app.use(handleError)

app.use(rootRouter)


app.listen(3069, () => {
    console.log(`Server Online At Port 3069`)
});