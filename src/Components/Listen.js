import { Link } from 'react-router-dom';

export default function Listen(){

    return(
    <div id="listen">
        <div className="list-element"><Link className="list-link" to="/listen/a-z">A-Z</Link></div>
        <div className="list-element"><Link className="list-link" to="/listen/nabu">NACH BUNDESLAND</Link></div>
        <div className="list-element"><Link className="list-link" to="/listen/schoge">SCHON GESEHEN</Link></div>
    </div>
    );
}



