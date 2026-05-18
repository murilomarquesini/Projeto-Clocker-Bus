import { lerStorage } from "./storageService.js";

export function protegerMotorista(){

    const usuario = lerStorage("usuarioLogado");

    if(!usuario || usuario.tipo !== "motorista"){
        alert("Acesso permitido apenas para motoristas.");
        window.location.href="../../login.html";
    }
}

export function protegerLogin(){

    const usuario = lerStorage("usuarioLogado");

    if(!usuario){
        window.location.href="login.html";
    }
}