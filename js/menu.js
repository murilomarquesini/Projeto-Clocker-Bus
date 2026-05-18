import { lerStorage } from "./storageService.js";

const usuario = lerStorage("usuarioLogado");

const linkMotorista = document.querySelector("#linkMotorista");

if(linkMotorista){

    if(!usuario || usuario.tipo !== "motorista"){
        linkMotorista.style.display = "none";
    }
}