import { Link } from 'react-router-dom';

export default function Quiz(){

    return(
    <div id="quiz">
        <div className="list-element"><Link className="list-link" to="/quiz/kfz_stla">KENNZEICHEN -{'>'} STADT/ORT</Link></div>
        <div className="list-element"><Link className="list-link" to="/quiz/kfz_bl">KENNZEICHEN -{'>'} BUNDESLAND</Link></div>
    </div>
    );
}

