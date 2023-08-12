const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const connect_db = require('./db/pg_config');
const routes = require('./routes/route');
const notFound = require('./middleware/notFound');
const { custom500ErrorHandler } = require('./middleware/customErrorHandler');

app.use(express.json());
app.use('/api/v1/records', routes);
app.use(notFound);
app.use(custom500ErrorHandler);

const start = async () => {
    try {
        await connect_db.connect();
        console.log(`PostgreSQL Connection Established Successfully...`);
        app.listen(PORT, () => console.log(`Server is running on port no. ${PORT}`));
    } catch(err) {
        console.log(err.message);
    }
}
start();