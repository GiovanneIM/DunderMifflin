export default function FilialItem ({ nome, cep, funcaoExibir }) {

    return <>
        <div className="col-12 border-bottom py-2 d-flex justify-content-between align-items-center">
            <div>
                <strong>{nome}</strong>
                {cep && <small className="text-muted d-block">{cep}</small>}
            </div>

            <div className="d-flex gap-2">
                <button className="btn btn-sm btn-2" onClick={funcaoExibir}>Ver filial</button>
            </div>
        </div>
    </>
}