
export function SignIn() {
  return (
      <main className="form-signin w-25 ms-5 mt-3 text-center">
        <form className="w-75">
            <h1 className="h1 mb-3 fw-normal">Sign in</h1>

            <div className="form-floating mb-2">
              <input type="email" className="form-control fs-5" placeholder="name@example.com" />
              <label className="text-center fs-6">Email address</label>
            </div>

            <div className="form-floating mb-3">
              <input type="password" className="form-control fs-5" placeholder="Password" />
              <label className="text-center fs-6">Password</label>
            </div>

            <button className="w-50 btn btn-lg btn-primary" type="button">Sign in</button>
        </form>
      </main>
  )
}