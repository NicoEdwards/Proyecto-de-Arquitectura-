// Estructura de guardado en la base de datos de MongoDB
import { model, Schema } from "mongoose";

// Schema de la base de datos
const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true, // Evita duplicados en la base de datos
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Agrega timestamps a los documentos
  }
);

export const UserModel = model("User", UserSchema);
