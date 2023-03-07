import { Link } from 'react-router-dom';

export default function Quiz(){

    return(
    <>
        <div className="list-element"><Link to="/quiz/kfz_stla">Kennzeichen -{'>'} Stadt/Landkreis</Link></div>
        <div className="list-element"><Link to="/quiz/kfz_bl">Kennzeichen -{'>'} Bundesland</Link></div>
    </>
    );
}

