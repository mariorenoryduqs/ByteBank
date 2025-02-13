import chalk from "chalk";

function extraiLinks (arrLinks) {
  return arrLinks.map((objetoLink) => Object.values(objetoLink).join())
}

const cache = new Map();

async function checaStatus(listaURLs) {
  const statusArray = await Promise.all(
    listaURLs.map(async (url) => {
      if (cache.has(url)) {
        console.log('Achei no cache:'+ url);
        return cache.get(url);
      }
      try {
        const response = await fetch(url);
        cache.set(url, response.status); 
        return response.status;
      } catch (erro) {
        const status = manejaErros(erro);
        cache.set(url, status); 
        return status;
      }
    })
  );

  return statusArray;
}


function manejaErros (erro) {
  if (erro.cause.code === 'ENOTFOUND') {
    return 'O Link não foi encontrado';
  }else if (erro.cause.code === 'ECONNREFUSED') {
    return 'A Conexão com o servidor falhou';
  }else if (erro.cause.code === 'ETIMEDOUT') {
    return 'A tentativa de contato com o servidor excedeu o tempo limite';
  }
   else {
    return 'Erro Desconhecido';
  }
}

export default async function listaValidada (listaDeLinks) {
  const links = extraiLinks(listaDeLinks);
  const status = await checaStatus(links);

  return listaDeLinks.map((objeto, indice) => ({
    ...objeto,
    status: status[indice]
  }))
}
