import connectToDatabase from "../lib/mongodb";
import { User } from "../models/User.model";
import { AccountType } from "../models/AccountType.model";
import bcrypt from "bcryptjs";
import { createInitUserData } from "./users";

const accountTypes = [
  {
    key: "primigenius",
    name: "Raíz de Yggdrasil",
    description:
      "El pilar inmutable que sostiene los mundos. Aquí yace la esencia primordial, el origen sin forma pero con peso.",
    icon: "tree-icon.svg",
    color: "#4A7729",
  },
  {
    key: "silent_river",
    name: "Corriente de Urðr",
    description:
      "El hilo de vida del viajero, tejido por las Nornas y marcado con cada decisión. Su flujo es constante, pero frágil; si se quiebra, el camino desaparece.",
    icon: "river-icon.svg",
    color: "#98C1D9",
  },
  {
    key: "mimir_well",
    name: "Pozo de las Verdades Veladas",
    description:
      "Las aguas que susurran lo que aún no ha sido. Aquí, el tiempo es el único guardián, y solo quienes comprenden su naturaleza pueden descifrar sus secretos.",
    icon: "well-icon.svg",
    color: "#3D2B56",
  },
  {
    key: "inclement_reflection",
    name: "Reflejo Inclemente",
    description:
      "El espejo que jamás miente, donde las sombras de cada decisión se graban en cristal. No hay máscaras ni artificios, solo verdad desnuda.",
    icon: "mirror-icon.svg",
    color: "#B0B0B0",
  },
  {
    key: "sealed_runes",
    name: "Runas Encadenadas",
    description:
      "Símbolos sellados en el flujo del tiempo, preservando lo decretado por el viajero. Lo que aquí yace no es solo esencia, sino el pacto con el porvenir.",
    icon: "runes-icon.svg",
    color: "#C09F80",
  },
  {
    key: "wandering_shadow",
    name: "Eco de Skuld",
    description:
      "Sombras atrapadas entre lo que fue y lo que será, resonando en el umbral del destino. No permanecen, solo murmuran en el vacío.",
    icon: "shadow-icon.svg",
    color: "#1B1B1E",
  }
];




export async function initializeSystem() {
  await connectToDatabase();

  const existingUsers = await User.find();
  if (existingUsers.length > 0) {
    console.log("Users already exist. Skipping initialization.");
    return;
  }

  const existingAccountTypes = await AccountType.find();
  if (existingAccountTypes.length > 0) {
    console.log("Account types already exist. Skipping initialization.");
    return;
  }

  for (const type of accountTypes) {
    await AccountType.create({
      name: type.name,
      description: type.description,
      key: type.key,
      icon: type.icon,
      color: type.color,
    });
  }
  console.log("Account types initialized successfully.");

  const hashedPassword = await bcrypt.hash("admin123", 10);
  const initUser = await User.create({
    name: "Admin",
    email: "admin@example.com",
    passwordHash: hashedPassword,
    role: "admin",
  });
  console.log("Admin user created successfully.");

  await createInitUserData(initUser._id);


}
