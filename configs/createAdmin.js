import bcrypt from "bcrypt"
import User from "../src/user/user.model.js"

export const createAdmin = async() =>{
    try{
        const adminExistente = await User.findOne({ role: "ADMIN_ROLE" });

        if (adminExistente) {
            console.log("Ya existe un administrador en la base de datos.");
            return;
        }

        const adminData = {
            name: "Admin",
            username: "admin",
            email: "admin@example.com",
            password: "admin12345",
            role: "ADMIN_ROLE"
        };

        const saltos = await bcrypt.genSalt(10);
        adminData.password = await bcrypt.hash(adminData.password, saltos);

        const newAdmin = new User(adminData);
        await newAdmin.save();

        console.log("Administrador por defecto creado exitosamente.");
    }catch(err){
        console.error("Error al crear el administrador por defecto:", err.message);
    }
}