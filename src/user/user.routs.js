import { Router } from "express";
import { validarCampos} from "../middleware/validar-campos.js";
import { updatePassword,updateUser } from "../user/user.controler.js";
import {deleteFileOnError} from "../middleware/delete-file-on-error.js"
import {check} from "express-validator";
import { existeUsuarioById } from "../helpers/db-validator.js";

const router = Router();

router.put(
    "/updatePassword/:id",
    [
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos,
        deleteFileOnError
    ],
    updatePassword
)
router.put(
    "/:id",
    [
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos,
        deleteFileOnError
    ],
    updateUser
)

export default router;