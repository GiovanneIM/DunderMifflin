import './carrinho.css'
import ProdCarrinho from '@/components/ProdCarrinho'

export default function Carrinho () {
    return <>
        <div className="container d-flex flex-column gap-3">
            <div className="titulo carrinho-titulo">Lista de Compras</div>
            <div className="carrinho-quadro col-12 fundoCinza bordaCinza">
                <ProdCarrinho id_prod={0} qtd={3}/>
            </div>
        </div>
    </>
}