import { cleanEnv, str, port } from 'envalid';

const validateEnv = () => {
    cleanEnv( process.env, {
        MONGO_USER: str(),
        MONGO_PASSWORD: str(),
        MONGO_DB_NAME: str(),
        PORT: port()
    } );
}

export default validateEnv;