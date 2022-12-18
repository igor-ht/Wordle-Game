import { useContext } from "react";
import { Link } from "react-router-dom";
import WordleContext from "../Context/wordleContext";

export function HomePage() {

  const { createStatePicture, user, setUser } = useContext(WordleContext)

  createStatePicture()

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <span className="navbar-brand fs-1" >Wordle</span>
        <p className="nav fs-4 m-2 text-decoration-underline">Welcome, {user.email}!</p>
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
        {user.email !== 'Guest' && <button type="button" onClick={ () => { let new_user = {email: 'Guest'}; setUser(new_user)} }>log out</button> }
      </div>
    </nav>
  )
}

