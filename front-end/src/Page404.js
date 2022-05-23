import notFoundAnimation from './assets/SVG-Animation-404-Page.gif'

function Page404() {
    return (
        <div className="col-sm-6 offset-sm-3">
            <br />
            <h1>404</h1>
            <h2>Page not found.</h2>
            <img style={{width: '500px'}} src={notFoundAnimation} alt="Not found page" />
            <br />
        </div>
    );
}

export default Page404;