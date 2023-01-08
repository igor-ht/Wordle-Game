import { FormEvent, useContext } from "react";
import { Link } from "react-router-dom";
import WordleContext from "../Context/wordleContext";


export function SignUp() {

  const {navigate} = useContext(WordleContext);

  const handleRegistration = (event: FormEvent<HTMLFormElement>) => {
    event.stopPropagation();
    
  }




  return (
    <section className="vh-100 bg-image overflow-auto">
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card">
                <div className="card-body p-5 mb-4 h-75">
                  <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                  <form className="form-control-sm" method="post" action="http://localhost:5000/users" target="blank" onSubmit={handleRegistration}>

                    <div className="form-outline mb-4">
                      <input type="text" name="name" id="form3Example1cg" className="form-control form-control-lg" required />
                      <label className="form-label" htmlFor="form3Example1cg">Your Name</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input type="email" name="email" id="form3Example3cg" className="form-control form-control-lg" required />
                      <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input type="password" name="password" id="form3Example4cg" className="form-control form-control-lg" required />
                      <label className="form-label" htmlFor="form3Example4cg">Password</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input type="password" name="confirmpassword" id="form3Example4cdg" className="form-control form-control-lg" required />
                      <label className="form-label" htmlFor="form3Example4cdg">Repeat your password</label>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button type="submit"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">Have already an account? <a href="#!"
                        className="fw-bold text-body"><u><Link to={'/sign-in'}>Login Here</Link></u></a></p>

                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
