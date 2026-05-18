export function lerStorage(chave){
    try{
        const dado = localStorage.getItem(chave);
        return dado ? JSON.parse(dado) : null;
    }catch{
        return null;
    }
}

export function salvarStorage(chave,valor){
    localStorage.setItem(chave,JSON.stringify(valor));
}

export function removerStorage(chave){
    localStorage.removeItem(chave);
}