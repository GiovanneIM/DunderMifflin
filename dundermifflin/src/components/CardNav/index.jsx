import './cardNav.css'

export default function CardNav({
    texto,
    svg,
    link
}) {
    return <>
        <a href={link} style={{all:'unset'}}>
            <div className="cardNav fundoBranco">
                <div className='col-12'>
                    <svg className="bi bi-bag d-block mx-auto mb-1" width={100} height={100} aria-hidden="true" fill="currentColor" viewBox="0 0 16 16" dangerouslySetInnerHTML={{ __html: svg }}></svg>
                </div>
                <div className="cardNav-txt col-12">{texto}</div>
            </div>
        </a>
    </>
}