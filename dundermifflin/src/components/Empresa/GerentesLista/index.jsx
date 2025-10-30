export default function GerentesLista({ empresa }) {
    return <>
        <div className="col-12 p-0 col-lg-6 ps-lg-2 d-flex flex-wrap">
            <div className='col-12 p-3 rounded bordaCompleta bordaCinza'>
                <div className="d-flex flex-wrap align-items-center border-bottom mb-3 pb-2">
                    <h5 className="col-12 col-sm-4 m-0"><strong>Gerentes</strong></h5>
                    <button className="btn btn-1 ms-auto">Adicionar gerente</button>
                </div>

                <div className='col-12 bordaCompleta bordaCinza rounded d-flex flex-wrap' style={{ height: '250px', overflowY: 'scroll' }}>
                    {/* Listando os gerentes */}
                    <div className='col-12 p-3'>
                    </div>
                </div>
            </div>
        </div>
    </>
}