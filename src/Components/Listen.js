import { Link } from 'react-router-dom';

export default function Listen(){




    return(
    <>
        <div className="list-element"><Link to="/listen/a-z">A-Z</Link></div>
        <div className="list-element"><Link to="/listen/nabu">Nach Bundesland</Link></div>
        {/*<div className="list-element"><Link to="">Schon gesehen</Link></div>*/}
        {/*<div className="list-element"><Link to="">Ungesehen</Link></div>*/}
    </>
    );
}



