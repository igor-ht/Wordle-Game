import { useContext } from "react";
import { Link } from "react-router-dom";
import WordleContext from "../Context/wordleContext";

export function HomePage() {

  const { createStatePicture } = useContext(WordleContext)

  createStatePicture()

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <span className="navbar-brand fs-1" >Wordle</span>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link fs-4" aria-current="page" to={'/home'}>Home</Link>
            <Link className="nav-link fs-4" to={'/sign-in'}>Sign In</Link>
            <Link className="nav-link fs-4" to={'/play'}>Play</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

