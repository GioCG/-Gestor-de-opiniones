'use strict';
 
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import limiter from '../src/middleware/validar-cant-peticiones.js';
import authRoutes from '../src/auth/auth.routs.js';
import categoriRoutes from '../src/categori/categori.routs.js';
import publicacionRoutes from '../src/publicaciones/publicacion.routs.js';
import userRoutes from '../src/user/user.model.js';

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(limiter);
}
 
const routes = (app) => {
    app.use("/GestorOpinionesSystem/v1/auth", authRoutes);
    app.use("/GestorOpinionesSystem/v1/categori", categoriRoutes);
    app.use("/GestorOpinionesSystem/v1/publicacion", publicacionRoutes);
    app.use("/gestionOpiniones/v1/user", userRoutes);

}

const conectarDB = async () => {
    try{
        await dbConnection();
        console.log("Conexión a la base de datos exitosa");
    }catch(error){
        console.error('Error conectando a la base de datos', error);
        process.exit(1);
    }
}
 
export const initServer = async () => {
    const app = express();
    const port = process.env.PORT || 3000;
 
    try {
        middlewares(app);
        conectarDB();
        routes(app);
        app.listen(port);
        console.log(`Server running on port: ${port}`);
    } catch (err) {
        console.log(`Server init failed: ${err}`);
    }
}