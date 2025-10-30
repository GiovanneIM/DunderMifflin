const express = require('express');
const router = express.Router();

const fs = require('fs');

// Validações
const v = require('../js/validacoes.js')

// Arquivos
const caminhoEmpresas = './json/empresas.json'
const caminhoGerentes = './json/gerentes.json'
const caminhoListas = './json/listas.json'

// =========================================================================
// LOGIN

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



// OBTER EMPRESAS

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



// ATUALIZAR EMPRESA

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

// Rota para adicionar um endereço adicional à empresa
router.post('/:id/endereco', (req, res) => {
    // Recebendo e validando o id
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({
            sucesso: false,
            erro: 'O ID da empresa inserido não era um número.'
        });
    }

    // Recebendo as informações do endereço
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

        // Descobrindo o ID do novo endereço
        let idNovoEndereco = 0;
        if (empresa.enderecos && empresa.enderecos.length > 0) {
            idNovoEndereco = empresa.enderecos[empresa.enderecos.length - 1].id + 1;
        }

        // Criando o objeto do novo endereco
        const novoEndereco = {
            id: idNovoEndereco,
            nome,
            cep,
            numero,
            complemento
        }

        // Adicionando o endereço à lista de endereços da empresa
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
    // Recebendo e validando o id da empresa
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({
            sucesso: false,
            erro: 'O ID da empresa inserido não era um número.'
        });
    }

    // Recebendo e validando o id do endereço
    const idEndereco = parseInt(req.params.idEndereco);
    if (isNaN(idEndereco)) {
        return res.status(400).json({
            sucesso: false,
            erro: 'O ID do endereço inserido não era um número.'
        });
    }

    // Recebendo os dados do endereço
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

        // Procurando o endereço na lista de endereços da empresa
        const endereco = empresa.enderecos.find(e => e.id === idEndereco);
        if (!endereco) {
            return res.status(404).json({
                sucesso: false,
                erro: 'Endereço não encontrado.'
            });
        }

        // Atualizando os dados
        endereco.nome = nome ?? endereco.nome;
        endereco.cep = cep ?? endereco.cep;
        endereco.numero = numero ?? endereco.numero;
        endereco.complemento = complemento ?? endereco.complemento;


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
                mensagem: 'Endereço atualizado com sucesso.',
                enderecoAtualizado: endereco
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

        // Verificando se o endereço existe
        const enderecoEncontrado = empresa.enderecos.find(e => e.id === idEndereco);
        if (!enderecoEncontrado) {
            return res.status(404).json({
                sucesso: false,
                erro: 'Endereço não encontrado.'
            });
        }


        const enderecosSALVAR = empresa.enderecos.filter((e) => e.id !== idEndereco)
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
                mensagem: 'Endereço excluído com sucesso.',
                enderecos: empresa.enderecos
            });
        });
    });
});



// GERENTES DE COMPRAS

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

        const gerentesEmpresa = gerentes.filter((g) => g.idEmpresa === id);

        res.status(200).json({
            sucesso: true,
            mensagem: 'Gerentes da empresa encontrado com sucesso',
            gerentes: gerentesEmpresa
        })
    })
})

// Rota para adicionar um novo gerente de compras
router.post('/gerente', (req, res) => {
    // Recebendo as informações do novo gerente
    const { nomeCompleto, nomeUsuario, telefone, email, idEmpresa } = req.body;

    // Validação básica dos campos obrigatórios
    if (!nomeCompleto || !nomeUsuario || !telefone || !email) {
        return res.status(400).json({
            sucesso: false,
            erro: 'Preencha os campos obrigatórios (*).'
        });
    }

    // Lendo a lista de gerentes
    fs.readFile(caminhoGerentes, 'utf8', (err, data) => {
        // Validando e convertendo o conteúdo do arquivo
        const gerentes = v.lerEconverterJSON(err, data, res);
        if (!gerentes) { return; }

        // Descobrindo o id do gerente
        let idNovoGerente = gerentes.length > 0 ? gerentes[gerentes.length - 1].id + 1 : 0;


        // Criando o objeto do novo gerente
        const novoGerente = {
            id: idNovoGerente,
            nomeCompleto,
            nomeUsuario,
            telefone,
            email,
            idEmpresa,
            senha: `Gerente${idNovoGerente}`
        };

        // Adicionando o novo gerente à lista
        gerentes.push(novoGerente);

        // Atualizando a lista de gerentes
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
                mensagem: 'Gerente cadastrado com sucesso.',
                novoGerente
            });
        });
    })
})

// Rota para atualizar um gerente de compras
router.patch('/gerente/:idGerente', (req, res) => {
    // Recebendo e validando o ID do gerente
    const idGerente = parseInt(req.params.idGerente);
    if (isNaN(idGerente)) {
        return res.status(400).json({
            sucesso: false,
            erro: 'O ID do gerente inserido não era um número.'
        });
    }

    // Recebendo as informações do novo gerente
    const { nomeCompleto, nomeUsuario, telefone, email, senha } = req.body;

    // Lendo a lista de gerentes
    fs.readFile(caminhoGerentes, 'utf8', (err, data) => {
        // Validando e convertendo o conteúdo do arquivo
        const gerentes = v.lerEconverterJSON(err, data, res);
        if (!gerentes) { return; }

        // Verificando se o gerente existe
        const gerenteEncontrado = gerentes.find(g => g.id === idGerente);
        if (!gerenteEncontrado) {
            return res.status(404).json({
                sucesso: false,
                erro: 'Gerente não encontrado.'
            });
        }


        // Atualizando as informações do gerente
        if (nomeCompleto !== undefined) gerenteEncontrado.nomeCompleto = nomeCompleto;
        if (nomeUsuario !== undefined) gerenteEncontrado.nomeUsuario = nomeUsuario;
        if (telefone !== undefined) gerenteEncontrado.telefone = telefone;
        if (email !== undefined) gerenteEncontrado.email = email;
        if (senha !== undefined) gerenteEncontrado.senha = senha;


        // Salvando a lista de gerentes
        fs.writeFile(caminhoGerentes, JSON.stringify(gerentes, null, 4), (err) => {
            if (err) {
                console.error('Erro ao salvar gerentes:', err);
                return res.status(500).json({
                    sucesso: false,
                    erro: 'Erro ao atualizar gerente.'
                });
            }

            res.status(200).json({
                sucesso: true,
                mensagem: 'Gerente atualizado com sucesso',
                gerenteAtualizado: gerenteEncontrado
            });
        });
    })
})

// Rota para excluir um gerente de compras
router.delete('/gerente/:idGerente', (req, res) => {
    // Recebendo e validando o ID do gerente
    const idGerente = parseInt(req.params.idGerente);
    if (isNaN(idGerente)) {
        return res.status(400).json({
            sucesso: false,
            erro: 'O ID do gerente inserido não era um número.'
        });
    }

    // Lendo a lista de gerentes
    fs.readFile(caminhoGerentes, 'utf8', (err, data) => {
        // Validando e convertendo o conteúdo do arquivo
        const gerentes = v.lerEconverterJSON(err, data, res);
        if (!gerentes) { return; }

        // Verificando se o gerente existe
        const gerenteEncontrado = gerentes.find(g => g.id === idGerente);
        if (!gerenteEncontrado) {
            return res.status(404).json({
                sucesso: false,
                erro: 'Gerente não encontrado.'
            });
        }

        // Removendo o gerente da lista
        const gerentesSALVAR = gerentes.filter((g) => g.id !== idGerente)


        // Salvando a lista de gerentes
        fs.writeFile(caminhoGerentes, JSON.stringify(gerentesSALVAR, null, 4), (err) => {
            if (err) {
                console.error('Erro ao salvar gerentes:', err);
                return res.status(500).json({
                    sucesso: false,
                    erro: 'Erro ao excluir gerente.'
                });
            }

            res.status(200).json({
                sucesso: true,
                mensagem: 'Gerente excluído com sucesso'
            });
        });
    })
})



// LISTAS

// Rota para obter as listas da empresa
router.get('/:id/listas', (req, res) => {
    // Recebendo o ID da empresa
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({
            sucesso: false,
            erro: 'O ID inserido não era um número.'
        });
    }

    // Lendo o arquivo das listas
    fs.readFile(caminhoListas, 'utf8', (err, data) => {
        const listas = v.lerEconverterJSON(err, data, res)
        if (!listas) { return }

        // Filtrando as listas da empresa
        const listasDaEmpresa = listas.filter((l) => l.idEmpresa === id)

        // Enviando as empresas
        res.status(200).json({
            sucesso: true,
            mensagem: 'Listas encontradas com sucesso',
            listas: listasDaEmpresa
        })
    });
})



module.exports = router;