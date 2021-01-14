import 'dotenv/config';

import validateEnv from './utils/validateEnv';
import App from './App';
import { SpaceShipController } from './controllers/SpaceShipController';
import { LocationController } from './controllers/LocationController';

validateEnv();

const app = new App( [new SpaceShipController(), new LocationController()], process.env.PORT );
app.listen();