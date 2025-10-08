function validarID (reqID, res) {
    const id = parseInt(reqID);

    if (isNaN(id)) {
        console.error('O ID recebido não era um número');
        res.status(400).send('O ID inserido não era um número')
        return;
    }
    else {
        return id;
    }
}


function lerEconveterJSON (err, data, res) {
    // Verifica se houve erro na leitura
    if (err) {
        console.log(`Erro na leitura do arquivo: ` + err);
        res.status(404).send('Erro ao ler o arquivo');
        return
    }

    // Convertendo o conteúdo do arquivo
    let produtos;
    try {
        produtos = JSON.parse(data);
    } catch (error) {
        // Erro ao converter a lista
        console.log(`Erro ao converter conteúdo do arquivo: ` + error);
        res.status(400).send('Erro ao converter conteúdo do arquivo');
        return
    }

    return produtos
}



module.exports = {
    validarID,
    lerEconveterJSON
}