import { Link } from "react-router-dom";

export function Welcome() {


  return (
    <div className="row m-5 w-50">
      <div className="col-sm-6 w-50">
        <div className="card border-warning">
          <div className="card-header fs-2 border-warning">
            Game Rules &#129513;
          </div>
          <ul className="list-group list-group-flush m-1">
            <li className="list-group-item fs-4 border-warning">Guess a random five-letters word. ❓</li>
            <li className="list-group-item fs-4 border-warning">You have six chances. 🎯</li>
            <li className="list-group-item fs-4 border-warning">&#9989; - right letter at right place.<br/>&#129000; - right letter at wrong place.</li>
          </ul>
        </div>
      </div>

      <div className="col-sm-6 w-50">
        <div className="card border-success">
          <div className="card-header fs-2 border-success">
            Sign Up &#128077;
          </div>
          <div className="card-body">
            <h5 className="card-title fs-4">Create a free account and enjoy more!</h5>
            <p className="card-text fs-5">Play with other players, challenge your friends and be the King of Word Guessing.</p>
            <Link to={'/sign-in'} className="btn btn-success">Sign up now</Link>
          </div>
        </div>
      </div>
    </div>
  )
}