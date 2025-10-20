import './ImagemProd.css'

export default function ImagemProd({imagem, funcaoExcluir, index}) {
    return <>
        <div className="imgDiv col-6 col-sm-4 p-2">
            <button type='button' className="imgExcluir btn" onClick={() => funcaoExcluir(index)}>-</button>
            <img src={imagem}/>
        </div>
    </>
}