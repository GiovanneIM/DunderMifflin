export default function StatusBadge({status}) {
    const CORstatus = {
        "Aguardando aprovação": "bg-secondary",
        "Aprovado": "bg-warning text-dark",
        "Enviado": "bg-primary",
        "Entregue": "bg-info text-dark",
        "Recebido": "bg-success",
        "Cancelado": "bg-danger",
    };

    return <div className={`badge ${CORstatus[status]}`}>{status}</div>
}