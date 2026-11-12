const inputNombre = document.getElementById("nombreP");
const inputOxigeno = document.getElementById("oxigenoP");
const inputRitmo = document.getElementById("ritmoP");
const btnRegistrar = document.getElementById("btnRegistrar");
const listaPacientes = document.getElementById("listaPacientes");

document.addEventListener("DOMContentLoaded", cargarPacientes);
btnRegistrar.addEventListener("click", agregarPaciente);

function agregarPaciente() {
    const nombre = inputNombre.value.trim();
    const oxigeno = Number(inputOxigeno.value);
    const ritmo = Number(inputRitmo.value);

    let riesgo = "Verde";
    let color = "bg-success";

    if (oxigeno < 90 || ritmo > 130) {
        riesgo = "Rojo";
        color = "bg-danger";
    } else if (oxigeno >= 90 && oxigeno <= 94) {
        riesgo = "Amarillo";
        color = "bg-warning text-dark";
    }

    const paciente = { nombre, oxigeno, ritmo, riesgo, color };

    const pacientes = obtenerPacientes();
    pacientes.push(paciente);
    localStorage.setItem("pacientes", JSON.stringify(pacientes));
    
    mostrarPacientes();

    inputNombre.value = "";
    inputOxigeno.value = "";
    inputRitmo.value = "";
}

function obtenerPacientes() {
    return JSON.parse(localStorage.getItem("pacientes")) || [];
}

function mostrarPacientes() {
    const pacientes = obtenerPacientes();
    listaPacientes.innerHTML = "";

    pacientes.forEach((p) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${p.nombre}</td>
            <td>${p.oxigeno}%</td>
            <td>${p.ritmo} lpm</td>
            <td><span class="badge ${p.color}">${p.riesgo}</span></td>
        `;
        listaPacientes.appendChild(fila);
    });
}

function cargarPacientes() {
    mostrarPacientes();
}