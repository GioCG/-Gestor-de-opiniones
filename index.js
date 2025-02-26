import { config } from "dotenv";
import { initServer } from './configs/server.js'
import {createAdmin} from "./configs/createAdmin.js"
import { createDefaultCategori } from "./configs/createDefaultCategori.js";

config();
initServer();
createAdmin();
createDefaultCategori();