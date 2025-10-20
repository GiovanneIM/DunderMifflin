function lerEconverterJSON (err, data, res) {
    // Verifica se houve erro na leitura
    if (err) {
        console.log(`Erro na leitura do arquivo: ${err}`);
        res.status(404).send('Erro ao ler o arquivo');
        return null;
    }

    // Convertendo o conteúdo do arquivo
    let dados;
    try {
        dados = JSON.parse(data);
    } catch (error) {
        // Erro ao converter a lista
        console.log(`Erro na leitura do arquivo: ${error}`);
        res.status(400).send('Erro ao converter conteúdo do arquivo');
        return null;
    }

    return dados;
}



module.exports = {
    lerEconverterJSON
}