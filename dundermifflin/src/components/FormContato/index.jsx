'use client'

export default function FormContato() {

    function abrirModal(e) {
        e.preventDefault()

        // Bootstrap é carregado no cliente, então agora dá pra acessar o DOM
        const modal = new bootstrap.Modal(document.getElementById('modalContato'))
        modal.show()
    }

    return (
        <>
            <form onSubmit={abrirModal}>
                <div className="gap-4 d-flex flex-column justify-content-center align-items-center">

                    <div className="row col-12 col-md-10">
                        <div className="mb-3 col-12 col-sm-6">
                            <label htmlFor="nome" className="form-label">Nome</label>
                            <input type="text" id="nome" className="form-control bordaCinza" placeholder="Digite seu nome completo" required />
                        </div>

                        <div className="mb-3 col-12 col-sm-6">
                            <label htmlFor="empresa" className="form-label">Empresa</label>
                            <input type="text" id="empresa" className="form-control bordaCinza" placeholder="Nome da sua empresa" required />
                        </div>

                        <div className="mb-3 col-12">
                            <label htmlFor="email" className="form-label">E-mail</label>
                            <input type="email" id="email" className="form-control bordaCinza" placeholder="E-mail para contato" required />
                        </div>

                        <div className="mb-3 col-12">
                            <label htmlFor="mensagem" className="form-label">Mensagem</label>
                            <textarea
                                id="mensagem"
                                className="form-control bordaCinza"
                                rows="4"
                                placeholder="Digite sua mensagem..."
                            ></textarea>
                        </div>

                        <div className="d-flex justify-content-end align-items-end col-12">
                            <button className="btn btn-1">Entrar em contato</button>
                        </div>
                    </div>
                </div>
            </form>

            {/* MODAL */}
            <div className="modal fade" id="modalContato" tabIndex="-1" aria-labelledby="modalcontato" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header fundoPreto">
                            <h5 className="modal-title" id="modalcontato">Mensagem enviada</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Fechar"></button>
                        </div>
                        <div className="modal-body">
                            <div className="pb-3 text-center">
                                <div className="pb-2">Obrigado por entrar em contato com a</div>
                                <div className="titulo fs-4 pb-2">Dunder Mifflin Inc, Paper Company!</div>
                                <div>Nossa equipe respoderá sua mensagem o mais breve possível.</div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-1" data-bs-dismiss="modal">Continuar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
