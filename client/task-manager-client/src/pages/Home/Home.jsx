import { Link } from "react-router-dom";

const Home = () => {

    return (
        <div className="min-h-screen flex items-center justify-center flex-col">
            <h1 className="text-4xl text-center">Welcome to Task Manager</h1>
            <div className="flex items-center gap-3">
                <Link to={'/login'}><button className="btn btn-outline">Login</button></Link>
                <Link to={'/register'}><button className="btn btn-outline">Register</button></Link>
            </div>
        </div>
    );
};

export default Home;