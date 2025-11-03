/* Componente para exibir e atualizar as informações da empresa ao gerente */

export default function InformacoesEmpresa ({ empresa }) {
    return <>
        <div className="col-12 d-flex flex-column justify-content-around row-gap-3">
            <div className="col-12 d-flex flex-wrap overflow-auto p-3 rounded fundoBranco bordaCompleta bordaCinza">
                <div className="col-12 col-md-4 rounded-start bordaCompleta bordaCinza" style={{aspectRatio:'1'}}>
                    <img className="img-completa" src={empresa.logo}/>
                </div>

                <div className='col-12 col-md-8 p-3 rounded-end bordaCompleta bordaCinza'>
                    <div className="info-linha"><strong>Razão Social</strong> {empresa.razaoSocial}</div>
                    <div className="info-linha"><strong>Nome fantasia</strong> {empresa.nomeFantasia}</div>
                    <div className="info-linha"><strong>CNPJ</strong> {empresa.cnpj}</div>
                    <div className="info-linha"><strong>Telefone</strong> {empresa.telefone}</div>
                </div>
            </div>
        </div>
    </>
}