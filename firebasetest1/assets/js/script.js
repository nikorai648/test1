import { actualizarPersona, obtenerPersonas, registrarPersona, eliminarPersona } from "./promesas.js";

window.addEventListener("load", () => {
    document.getElementById("btnRegistrar").addEventListener("click", registrar);
    traerDatos();
    document.getElementById("btnActualizar").addEventListener("click", actualizar);
    document.getElementById("btnEliminar").addEventListener("click", eliminar); // Evento del botón de eliminar
});

const registrar = () => {
    let eNombre = document.getElementById("nombre");
    let eApellido = document.getElementById("apellido");
    let eRut = document.getElementById("rut");
    let eCorreo = document.getElementById("correo");
    let eEdad = document.getElementById("edad");
    let eFechaNacimiento = document.getElementById("fechaNacimiento");
    let vNombre = eNombre.value;
    let vApellido = eApellido.value;
    let vRut = eRut.value;
    let vCorreo = eCorreo.value;
    let vEdad = eEdad.value;
    let vFechaNacimiento = eFechaNacimiento.value;
    let objeto = {
        nombre: vNombre,
        apellido: vApellido,
        rut: vRut,
        correo: vCorreo,
        edad: vEdad,
        fechaNacimiento: vFechaNacimiento
    };
    registrarPersona(objeto).then(() => {
        alert("Se registró con éxito");
        traerDatos(); // Actualizar la tabla después de registrar
    }).catch((r) => {
        console.log(r);
    });
};

const traerDatos = () => {
    obtenerPersonas().then((personas) => {
        let estructura = "";
        personas.forEach((p) => {
            estructura += "<tr><td>" + p.nombre + "</td>";
            estructura += "<td>" + p.apellido + "</td>";
            estructura += "<td>" + p.rut + "</td>";
            estructura += "<td>" + p.correo + "</td>";
            estructura += "<td>" + p.edad + "</td>";
            estructura += "<td>" + p.fechaNacimiento + "</td>";
            estructura += "<td><button id='UPD" + p.id + "'>Actualizar</button></td>";
            estructura += "<td><button id='DEL" + p.id + "'>Eliminar</button></td>";
            estructura += "</tr>";
        });
        document.getElementById("tbPersonas").innerHTML = estructura;
        personas.forEach((p) => {
            let elemento = document.getElementById("UPD" + p.id);
            elemento.addEventListener("click", () => {
                document.getElementById("UPDnombre").value = p.nombre;
                document.getElementById("UPDapellido").value = p.apellido;
                document.getElementById("UPDrut").value = p.rut;
                document.getElementById("UPDcorreo").value = p.correo;
                document.getElementById("UPDedad").value = p.edad;
                document.getElementById("UPDfechaNacimiento").value = p.fechaNacimiento;
                document.getElementById("btnActualizar").value = p.id;
            });
            let elemento1 = document.getElementById("DEL" + p.id);
            elemento1.addEventListener("click", () => {
                if (confirm("Vas a eliminar a:\n" + p.nombre + " " + p.apellido)) {
                    eliminarPersona(p.id).then(() => {
                        alert("Se eliminó con éxito");
                        traerDatos();
                    }).catch((e) => {
                        console.log(e);
                    });
                }
            });
        });
    }).catch((e) => {
        console.log(e);
    });
};

const actualizar = () => {
    let eNombre = document.getElementById("UPDnombre");
    let eApellido = document.getElementById("UPDapellido");
    let eRut = document.getElementById("UPDrut");
    let eCorreo = document.getElementById("UPDcorreo");
    let eEdad = document.getElementById("UPDedad");
    let eFechaNacimiento = document.getElementById("UPDfechaNacimiento");
    let vNombre = eNombre.value;
    let vApellido = eApellido.value;
    let vRut = eRut.value;
    let vCorreo = eCorreo.value;
    let vEdad = eEdad.value;
    let vFechaNacimiento = eFechaNacimiento.value;
    let objeto = {
        nombre: vNombre,
        apellido: vApellido,
        rut: vRut,
        correo: vCorreo,
        edad: vEdad,
        fechaNacimiento: vFechaNacimiento
    };
    let id = document.getElementById("btnActualizar").value;
    actualizarPersona(objeto, id).then(() => {
        alert("Se actualizó con éxito");
        traerDatos(); // Actualizar la tabla después de actualizar
    }).catch((e) => {
        console.log(e);
    });
};

const eliminar = () => {
    let id = document.getElementById("btnEliminar").value;
    eliminarPersona(id).then(() => {
        alert("Se ha eliminado con éxito");
        traerDatos();
        limpiarFormulario("DEL");
    }).catch((e) => {
        console.log(e);
    });
};

const limpiarFormulario = (txt) => {
    let eNombre = document.getElementById(txt + "nombre");
    let eApellido = document.getElementById(txt + "apellido");
    let eRut = document.getElementById(txt + "rut");
    let eEmail = document.getElementById(txt + "correo");
    let eEdad = document.getElementById(txt + "edad");
    let eFechaNacimiento = document.getElementById(txt + "fechaNacimiento");
    eNombre.value = "";
    eApellido.value = "";
    eRut.value = "";
    eEmail.value = "";
    eEdad.value = "";
    eFechaNacimiento.value = "";
};
