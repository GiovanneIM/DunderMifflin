'use client'

/*
    Página para registrar um empresa
        • Preecher os dados da empresa
        • Usar a API dos correios para buscar o endereço pelo CEP

*/

export default function RegistrarEmpresa() {
    let id;

    /* Função para formater o CNPJ */
    async function CNPJ(e) {
        let cnpj = e.target.value.replace(/\D/g, '');  // Remove todos os digitos que não forem números

        if (cnpj.length > 14) cnpj = cnpj.slice(0, 14);  // Limita o tamanho a 14 caracteres

        // Formatação do CNPJ
        if (cnpj.length > 12) {
            cnpj = cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{1,2})$/, '$1.$2.$3/$4-$5');
        } else if (cnpj.length > 8) {
            cnpj = cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{1,4})$/, '$1.$2.$3/$4');
        } else if (cnpj.length > 5) {
            cnpj = cnpj.replace(/^(\d{2})(\d{3})(\d{1,3})$/, '$1.$2.$3');
        } else if (cnpj.length > 2) {
            cnpj = cnpj.replace(/^(\d{2})(\d{1,3})$/, '$1.$2');
        }

        e.target.value = cnpj; // Atualiza o texto no input
    }

    /* Função para formatar o telefone */
    async function Telefone(e) {
        let tel = e.target.value.replace(/\D/g, '');  // Remove todos os digitos que não forem números

        if (tel.length > 11) tel = tel.slice(0, 11);  // Limita o tamanho a 11 caracteres

        // Formatação do Telefone
        if (tel.length > 7) {
            tel = tel.replace(/^(\d{2})(\d{5})(\d{1,4})$/, '($1) $2-$3');
        } else if (tel.length > 2) {
            tel = tel.replace(/^(\d{2})(\d{1,5})$/, '($1) $2');
        }

        e.target.value = tel; // Atualiza o texto no input
    }

    /* Função para completar o endereço pelo CEP */
    async function CEP(e) {
        let cep = e.target.value.replace(/\D/g, '');  // Remove todos os digitos que não forem números

        if (cep.length > 8) cep = cep.slice(0, 8);  // Limita o tamanho a 8 caracteres

        cep = cep.replace(/(\d{5})(\d)/, '$1-$2');  // Formatação do CEP

        e.target.value = cep; // Atualiza o texto no input

        // Se o usuário terminou de inserir o CEP, consulta a API dos correios
        // e preenche os outros campos de endereço
        if (cep.length === 9) {
            const res = await fetch(`https://viacep.com.br/ws/${cep.replace('-', '')}/json`);
            const data = await res.json();

            if (data.erro == true) {
                alert('CEP ínvalido');
            }
            else {
                // Preenche os dados que dependem do CEP
                document.getElementById('pais').value = 'Brasil';
                document.getElementById('estado').value = data.uf;
                document.getElementById('cidade').value = data.localidade;
                document.getElementById('bairro').value = data.bairro;
                document.getElementById('rua').value = data.logradouro;
            }
        }
    }

    // Função para registrar a empresa
    function registrarEmpresa(e) {
        e.preventDefault();

        // Obtendo os dados do formulário
        const formData = new FormData(e.target);
        const empresa = Object.fromEntries(formData.entries());

        console.log(empresa);

        fetch('http://localhost:4000/admin/registrarEmpresa', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ empresa })
        })
        .then(res => res.json())
        .then(data => {
            document.getElementById('emp-id').value = data.id;
            id = data.id;
            document.getElementById('emp-senha').value = data.senha;
            document.getElementById('emp-nome').innerHTML = empresa.nomeFantasia;

            const modal = new bootstrap.Modal(document.getElementById('modalEmpRegistrada'))
            modal.show()
        })
    }

    // Função para registrar a empresa
    function redirecionar (e) {
        window.location.href = `/admin/empresas/empresa/${id}`;
    }

    return <>
        {/* Registro */}
        <div className="container corpo py-4">
            <h2 className="titulo fs-2 text-center mb-4">Registrar empresa</h2>

            <form className="d-flex flex-column align-items-center gap-4" onSubmit={registrarEmpresa}>

                {/* Dados da Empresa */}
                <div className="col-12 col-lg-10 p-4 rounded fundoCinza border bordaCinza">
                    <h4 className="mb-3">Dados da Empresa</h4>

                    <div className="row col-12 g-3">
                        <div className="col-md-6">
                            <label htmlFor="razaoSocial" className="form-label">Razão Social <span className="text-body-secondary">*</span></label>
                            <input type="text" className="form-control" id="razaoSocial" name="razaoSocial" placeholder="Razão Social" required />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="nomeFantasia" className="form-label">Nome Fantasia <span className="text-body-secondary">*</span></label>
                            <input type="text" className="form-control" id="nomeFantasia" name="nomeFantasia" placeholder="Nome Fantasia" required />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="cnpj" className="form-label">CNPJ <span className="text-body-secondary">*</span></label>
                            <input type="text" className="form-control" id="cnpj" name="cnpj" placeholder="00.000.000/0000-00" onChange={CNPJ} required />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="telefone" className="form-label">Telefone Comercial</label>
                            <input type="tel" className="form-control" id="telefone" name="telefone" placeholder="(00) 0000-0000" onChange={Telefone} />
                        </div>
                    </div>
                </div>

                {/* Endereço */}
                <div className="col-12 col-lg-10 p-4 rounded fundoCinza border bordaCinza">
                    <h4 className="mb-3">Endereço</h4>

                    <div className="row g-3">
                        <div className="col-md-6">
                            <label htmlFor="cep" className="form-label">CEP <span className="text-body-secondary">*</span></label>
                            <input type="text" className="form-control" id="cep" name="cep" placeholder="00000-000" onChange={CEP} required />
                        </div>

                        <div className="col-sm-6">
                            <label htmlFor="pais" className="form-label">País</label>
                            <input type="text" className="form-control fundoCinza" id="pais" placeholder="País" disabled />
                        </div>

                        <div className="col-sm-6">
                            <label htmlFor="estado" className="form-label">Estado</label>
                            <input type="text" className="form-control fundoCinza" id="estado" placeholder="Estado" disabled />
                        </div>

                        <div className="col-sm-6">
                            <label htmlFor="cidade" className="form-label">Cidade</label>
                            <input type="text" className="form-control fundoCinza" id="cidade" placeholder="Cidade" disabled />
                        </div>

                        <div className="col-sm-6">
                            <label htmlFor="bairro" className="form-label">Bairro</label>
                            <input type="text" className="form-control fundoCinza" id="bairro" placeholder="Bairro" disabled />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="rua" className="form-label">Rua</label>
                            <input type="text" className="form-control fundoCinza" id="rua" placeholder="Rua" disabled />
                        </div>

                        <div className="col-sm-6">
                            <label htmlFor="numero" className="form-label">Número <span className="text-body-secondary">*</span></label>
                            <input type="text" className="form-control" id="numero" name="numero" placeholder="Número" required />
                        </div>

                        <div className="col-sm-6">
                            <label htmlFor="complemento" className="form-label">Complemento</label>
                            <input type="text" className="form-control" id="complemento" name="complemento" placeholder="Complemento" />
                        </div>
                    </div>
                </div>

                {/* Botão Registrar */}
                <div className="col-12 col-lg-10 d-flex justify-content-end">
                    <button type="submit" className="btn btn-1">Registrar Empresa</button>
                </div>
            </form>
        </div>

        {/* MODAL */}
        <div className="modal fade" id="modalEmpRegistrada" tabIndex="-1" aria-labelledby="modalEmpRegistradaLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">

                    {/* CABEÇALHO */}
                    <div className="modal-header fundoPreto">
                        <h5 className="modal-title" id="modalEmpRegistradaLabel">Empresa registrada</h5>
                    </div>

                    {/* INPUT */}
                    <div className="modal-body">
                        <div className="pb-3">A empresa <b id="emp-nome"></b> foi registrada com as informações abaixo:</div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">ID:</label>
                            <input type="text" className="form-control" id="emp-id" readOnly />
                        </div>
                        <div>
                            <label className="form-label fw-bold">Senha:</label>
                            <input type="text" className="form-control" id="emp-senha" readOnly />
                        </div>
                    </div>

                    {/* BOTÕES */}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-1" data-bs-dismiss="modal" onClick={redirecionar}>Concluir</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}