import { collection, addDoc,getDocs,updateDoc,deleteDoc,doc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import {db} from "./firebase.js"
export const registrarPersona = async(persona)=>{
    console.log(persona);
    // Add a new document with a generated id.
const docRef = await addDoc(collection(db, "personas"),persona);
   
}
export const obtenerPersonas= async()=>{
  //Recupero la referencia
  const ref = collection(db,"personas");
  const querySnapshot = await getDocs(ref);
  //console.log(querySnapshot);
  console.log(querySnapshot);
  let personas = []
  querySnapshot.forEach((doc) => {
    //console.log(doc.id, "=>",doc.data());
    personas.push({...doc.data(),id:doc.id})
  });
  //console.log(personas);
  return personas;
}
export const actualizarPersona = async(persona,id)=>{
    const ref = doc(db, "personas",id);
    await updateDoc(ref, persona);
}
export const eliminarPersona = async(id)=>{
  const ref = doc(db,"personas",id)
  await deleteDoc(ref)

}