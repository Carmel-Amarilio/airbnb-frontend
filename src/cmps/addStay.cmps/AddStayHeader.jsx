import { useNavigate } from 'react-router';
import imgUrl from '../../assets/img/logo.png'

export function AddStayHeader() {
    const navigate = useNavigate();
    return (
        <section className="add-stay-header main-container full">
            <section className='logo flex align-center' onClick={() => navigate("/stay")}>
                <img src={imgUrl} />
                <span>aircnc</span>
            </section>
        </section>
    )
}