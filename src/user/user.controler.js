import bcrypt from "bcrypt"
import User from "../user/user.model.js"

export const updatePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { contraAntigua, contraNueva } = req.body;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        console.log('Contra antigua proporcionada:', contraAntigua);
        console.log('Contra almacenada (hashed):', user.password); 

        const igual = await bcrypt.compare('contraAntigua', 'hashedPassword');
        const wasa = await bcrypt.compare('contraNueva', 'hashedPassword');
        console.log(igual);
        console.log(wasa);

        if (!igual) {
            return res.status(400).json({
                success: false,
                message: "La contraseña antigua no es correcta"
            });
        }

        if (!contraNueva) {
            return res.status(400).json({
                success: false,
                message: "Se debe proporcionar una nueva contraseña"
            });
        }

        
        const saltos = await bcrypt.genSalt(10);
        const hashedContra = await bcrypt.hash(contraNueva, saltos);

        user.password = hashedContra;

        console.log('Usuario antes de guardar:', user);

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Contraseña actualizada correctamente"
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Error al actualizar la contraseña",
            error: err.message
        });
    }
};

export const updateUser = async (req, res) =>{
    try{
        const {user} = req;
        const data = req.body;
        
        const userUpdated = await User.findOneAndUpdate(
            user, {$set: data}, { new: true }
           );
   
           if (!userUpdated) {
               return res.status(403).json({
                   success: false,
                   message: "El usuario no existe"
               });
           }
           return res.status(200).json({
               success: true,
               message: "Usuario actualizado correctamente",
               userUpdated
           });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al actualizar el usuario",
            error: err.message
        })
    }
}