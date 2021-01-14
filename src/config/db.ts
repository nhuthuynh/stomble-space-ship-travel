
const db = () => {
    const {
        MONGO_USER: dbUser,
        MONGO_PASSWORD: dbPass,
        MONGO_DB_NAME: dbName
    } = process.env;
    if ( !!dbUser && !!dbPass && !!dbName ) {
        const url = `mongodb+srv://${dbUser}:${dbPass}@cluster0.hmf53.mongodb.net/${dbName}?retryWrites=true&w=majority`;

        const connectionParams = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        }

        return { url, connectionParams }
    } else {
        throw Error( 'Invalid database information' );
    }
}

const { url, connectionParams } = db();

export { url, connectionParams };