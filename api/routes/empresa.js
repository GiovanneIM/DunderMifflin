const express = require('express');
const router = express.Router();

const fs = require('fs');

// Validações
const v = require('../js/validacoes.js')

// Arquivos
const caminhoEmpresas = './json/empresas.json'
const caminhoGerentes = './json/gerentes.json'

// ROTAS

// Rota para fazer login
router.post('/login', (req, res) => {
    // Recebendo as informações de login
    const { id, senha } = req.body;

    // Validando as informações
    if (isNaN(id) || !senha) {
        res.status(400).json({
            sucesso: false,
            mensagem: 'ID e/ou senha incorretos.'
        });
        return
    }


    // Lendo as empresas
    fs.readFile(caminhoEmpresas, 'utf-8', (err, data) => {
        const empresas = v.lerEconverterJSON(err, data, res);
        if (!empresas) { return }

        // Procurando pela empresa
        const empresa = empresas.find((emp) => { return emp.id === id });

        // Verificando se a empresa foi encontrada e se a senha está certa
        if (!empresa || empresa.senha !== senha) {
            console.log('Encontro');

            res.status(401).json({
                sucesso: false,
                mensagem: 'ID e/ou senha incorretos.'
            });
            return;
        }

        // Login bem sucedido
        console.log(`Empresa (${empresa.id}) - ${empresa.nome} logada.`);
        res.status(200).json({
            sucesso: true,
            usuario: { "id": empresa.id, "tipo": "empresa", "nome": empresa.nomeFantasia }
        });
    })
});

// Rota para obter todas as empresas
router.get('/', (req, res) => {
    // Lendo a lista de empresas
    fs.readFile(caminhoEmpresas, 'utf8', (err, data) => {
        const empresas = v.lerEconverterJSON(err, data, res)
        if (!empresas) { return }

        // Enviando as empresas
        res.status(200).json(empresas)
    });
});

// Rota para obter UMA EMPRESA específica
router.get('/:id', (req, res) => {
    // Recebendo e validando o id
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({
            sucesso: true,
            erro: 'O ID inserido não era um número.'
        });
    }

    // Lendo a lista de empresas
    fs.readFile(caminhoEmpresas, 'utf8', (err, data) => {
        const empresas = v.lerEconverterJSON(err, data, res)
        if (!empresas) {
            return
        }

        // Procurando a empresa na lista de empresas
        const empresa = empresas.find((emp) => emp.id === id)

        // Verificando se a empresa foi encontrada e enviando como resposta
        if (empresa) {
            res.status(200).json({
                sucesso: true,
                empresa: empresa
            });
        } else {
            res.status(404).json({
                sucesso: false,
                erro: 'Empresa não encontrada.'
            });
        }
    });
});

// Rota para atualizar a imagem da logo da empresa
router.patch('/:id/logo', (req, res) => {
    // Recebendo e validando o id
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({
            sucesso: false,
            erro: 'O ID inserido não era um número.'
        });
    }

    const { logo } = req.body

    // Lendo a lista de empresas
    fs.readFile(caminhoEmpresas, 'utf8', (err, data) => {
        const empresas = v.lerEconverterJSON(err, data, res)
        if (!empresas) {
            return
        }

        // Procurando a empresa na lista de empresas
        const empresa = empresas.find((emp) => emp.id === id)
        if (!empresa) {
            return res.status(404).json({
                sucesso: false,
                erro: 'Empresa não encontrada.'
            });
        }

        empresa.logo = logo;

        // Salvando a lista de gerentes
        fs.writeFile(caminhoEmpresas, JSON.stringify(empresas, null, 4), (err) => {
            if (err) {
                console.error('Erro ao salvar empresas:', err);
                return res.status(500).json({
                    sucesso: false,
                    erro: 'Erro ao registrar empresa.'
                });
            }

            res.status(200).json({
                sucesso: true,
                mensagem: 'Logo atualizada com sucesso.'
            });
        });
    });
});

// Rota para atualizar nomes, CNPJ e telefone da empresa
router.patch('/:id/dados', (req, res) => {
    // Recebendo e validando o id
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({
            sucesso: false,
            erro: 'O ID inserido não era um número.'
        });
    }

    const { razaoSocial, nomeFantasia, cnpj, telefone } = req.body

    // Lendo a lista de empresas
    fs.readFile(caminhoEmpresas, 'utf8', (err, data) => {
        const empresas = v.lerEconverterJSON(err, data, res)
        if (!empresas) {
            return
        }

        // Procurando a empresa na lista de empresas
        const empresa = empresas.find((emp) => emp.id === id)
        if (!empresa) {
            return res.status(404).json({
                sucesso: false,
                erro: 'Empresa não encontrada.'
            });
        }

        empresa.razaoSocial = razaoSocial;
        empresa.nomeFantasia = nomeFantasia;
        empresa.telefone = telefone;
        empresa.cnpj = cnpj;

        // Salvando a lista de gerentes
        fs.writeFile(caminhoEmpresas, JSON.stringify(empresas, null, 4), (err) => {
            if (err) {
                console.error('Erro ao salvar empresas:', err);
                return res.status(500).json({
                    sucesso: false,
                    erro: 'Erro ao registrar empresa.'
                });
            }

            res.status(200).json({
                sucesso: true,
                mensagem: 'Dados atualizada com sucesso.'
            });
        });
    });
});

// Rota para atualizar CEP, num e complemento do endereço principal da empresa
router.patch('/:id/endereco', (req, res) => {
    // Recebendo e validando o id
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({
            sucesso: false,
            erro: 'O ID inserido não era um número.'
        });
    }

    const { cep, estado, cidade, numero, complemento } = req.body

    // Lendo a lista de empresas
    fs.readFile(caminhoEmpresas, 'utf8', (err, data) => {
        const empresas = v.lerEconverterJSON(err, data, res)
        if (!empresas) {
            return
        }

        // Procurando a empresa na lista de empresas
        const empresa = empresas.find((emp) => emp.id === id)
        if (!empresa) {
            return res.status(404).json({
                sucesso: false,
                erro: 'Empresa não encontrada.'
            });
        }

        empresa.enderecos[0].cep = cep;
        empresa.enderecos[0].estado = estado;
        empresa.enderecos[0].cidade = cidade;
        empresa.enderecos[0].numero = numero;
        empresa.enderecos[0].complemento = complemento;

        // Salvando a lista de gerentes
        fs.writeFile(caminhoEmpresas, JSON.stringify(empresas, null, 4), (err) => {
            if (err) {
                console.error('Erro ao salvar empresas:', err);
                return res.status(500).json({
                    sucesso: false,
                    erro: 'Erro ao registrar empresa.'
                });
            }

            res.status(200).json({
                sucesso: true,
                mensagem: 'Logo atualizada com sucesso.'
            });
        });
    });
});


// ENDEREÇOS

// Rota para adicionar um endereço à empresa
router.post('/:id/endereco', (req, res) => {
    // Recebendo e validando o id
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({
            sucesso: false,
            erro: 'O ID da empresa inserido não era um número.'
        });
    }

    const { nome, cep, numero, complemento } = req.body

    // Lendo a lista de empresas
    fs.readFile(caminhoEmpresas, 'utf8', (err, data) => {
        const empresas = v.lerEconverterJSON(err, data, res)
        if (!empresas) {
            return
        }

        // Procurando a empresa na lista de empresas
        const empresa = empresas.find((emp) => emp.id === id)
        if (!empresa) {
            return res.status(404).json({
                sucesso: false,
                erro: 'Empresa não encontrada.'
            });
        }

        // Criando o objeto do novo endereco
        let idNovoEndereco;
        try {
            idNovoEndereco = empresa.enderecos[empresa.enderecos.length - 1].id + 1;
        } catch (error) {
            idNovoEndereco = 0;
        }

        const novoEndereco = {
            id: idNovoEndereco,
            nome,
            cep, 
            numero, 
            complemento
        }

        empresa.enderecos.push(novoEndereco)

        // Salvando a lista de gerentes
        fs.writeFile(caminhoEmpresas, JSON.stringify(empresas, null, 4), (err) => {
            if (err) {
                console.error('Erro ao salvar empresas:', err);
                return res.status(500).json({
                    sucesso: false,
                    erro: 'Erro ao atualiazar o endereço empresa.'
                });
            }

            res.status(200).json({
                sucesso: true,
                mensagem: 'Endereço adicionado com sucesso.',
                novoEndereco: novoEndereco
            });
        });
    });
});

// Rota para atualizar um endereço da empresa
router.patch('/:id/endereco/:idEndereco', (req, res) => {
    // Recebendo e validando o id
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({
            sucesso: false,
            erro: 'O ID da empresa inserido não era um número.'
        });
    }

    const idEndereco = parseInt(req.params.idEndereco);
    if (isNaN(idEndereco)) {
        return res.status(400).json({
            sucesso: false,
            erro: 'O ID do endereço inserido não era um número.'
        });
    }

    const { nome, cep, numero, complemento } = req.body

    // Lendo a lista de empresas
    fs.readFile(caminhoEmpresas, 'utf8', (err, data) => {
        const empresas = v.lerEconverterJSON(err, data, res)
        if (!empresas) {
            return
        }

        // Procurando a empresa na lista de empresas
        const empresa = empresas.find((emp) => emp.id === id)
        if (!empresa) {
            return res.status(404).json({
                sucesso: false,
                erro: 'Empresa não encontrada.'
            });
        }

        empresa.enderecos[idEndereco].nome = nome;
        empresa.enderecos[idEndereco].cep = cep;
        empresa.enderecos[idEndereco].numero = numero;
        empresa.enderecos[idEndereco].complemento = complemento;

        // Salvando a lista de gerentes
        fs.writeFile(caminhoEmpresas, JSON.stringify(empresas, null, 4), (err) => {
            if (err) {
                console.error('Erro ao salvar empresas:', err);
                return res.status(500).json({
                    sucesso: false,
                    erro: 'Erro ao atualiazar o endereço empresa.'
                });
            }

            res.status(200).json({
                sucesso: true,
                mensagem: 'Logo atualizada com sucesso.'
            });
        });
    });
});

// Rota para excluir um endereço da empresa
router.delete('/:id/endereco/:idEndereco', (req, res) => {
    // Recebendo e validando o id
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({
            sucesso: false,
            erro: 'O ID da empresa inserido não era um número.'
        });
    }

    const idEndereco = parseInt(req.params.idEndereco);
    if (isNaN(idEndereco)) {
        return res.status(400).json({
            sucesso: false,
            erro: 'O ID do endereço inserido não era um número.'
        });
    }

    const { nome, cep, numero, complemento } = req.body

    // Lendo a lista de empresas
    fs.readFile(caminhoEmpresas, 'utf8', (err, data) => {
        const empresas = v.lerEconverterJSON(err, data, res)
        if (!empresas) {
            return
        }

        // Procurando a empresa na lista de empresas
        const empresa = empresas.find((emp) => emp.id === id)
        if (!empresa) {
            return res.status(404).json({
                sucesso: false,
                erro: 'Empresa não encontrada.'
            });
        }

        const enderecosSALVAR = empresa.enderecos.filter((end) => end.id > 0 && end.id !== idEndereco)
        empresa.enderecos = enderecosSALVAR;

        // Salvando a lista de gerentes
        fs.writeFile(caminhoEmpresas, JSON.stringify(empresas, null, 4), (err) => {
            if (err) {
                console.error('Erro ao salvar empresas:', err);
                return res.status(500).json({
                    sucesso: false,
                    erro: 'Erro ao excluir o endereço empresa.'
                });
            }

            res.status(200).json({
                sucesso: true,
                mensagem: 'Endereço excluído com sucesso.'
            });
        });
    });
});



// Rota para obter os gerente de compras da empresa
router.get('/:id/gerentes', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({
            sucesso: false,
            erro: 'O ID inserido não era um número.'
        });
    }

    fs.readFile(caminhoGerentes, 'utf-8', (err, data) => {
        const gerentes = v.lerEconverterJSON(err, data, res);
        if (!gerentes) { return }

        const gerentesEmpresa = gerentes.filter((ger) => { return ger.idEmpresa === id });

        res.status(200).json({
            sucesso: true,
            gerentes: gerentesEmpresa
        })
    })
})

// Rota para adicionar um novo gerente de compras
router.post('/gerente', (req, res) => {
    const { gerente } = req.body;

    // Lendo a lista de gerentes
    fs.readFile(caminhoGerentes, 'utf8', (err, data) => {
        // Validando e convertendo o conteúdo do arquivo
        const gerentes = v.lerEconverterJSON(err, data, res);
        if (!gerentes) { return; }

        // Descobrindo o id do gerente
        let idNovoGerente;
        try {
            idNovoGerente = gerentes[gerentes.length - 1].id + 1;
        } catch (error) {
            idNovoGerente = 0;
        }

        // Criando o objeto do novo gerente
        const ger = {
            ...gerente,
            "id": idNovoGerente,
            "senha": `Gerente${idNovoGerente}`
        }

        // Adicionando produto à lista
        gerentes.push(ger);

        // Salvando a lista de gerentes
        fs.writeFile(caminhoGerentes, JSON.stringify(gerentes, null, 4), (err) => {
            if (err) {
                console.error('Erro ao salvar gerentes:', err);
                return res.status(500).json({
                    sucesso: false,
                    erro: 'Erro ao registrar gerente.'
                });
            }

            res.status(201).json({
                sucesso: true,
                gerente: { "id": ger.id, "senha": ger.senha }
            });
        });
    })
})

// Rota para excluir um gerente de compras
router.delete('/gerente', (req, res) => {
})



module.exports = router;
