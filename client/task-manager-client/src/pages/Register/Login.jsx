import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa6";

const Login = () => {
    const { googleLogin, signIn } = useAuth()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        photo: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await signIn(formData.email, formData.password);
            if (response) {
                Swal.fire({
                    title: 'Success!',
                    text: 'You have registered successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                navigate("/main")
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const { user } = await googleLogin()
            if (user) {
                navigate("/main")
            }
        } catch (err) {
            console.log(err.message);
        }
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="input input-bordered"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="input input-bordered"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <div className="px-8 mb-3 text-center"><p>Do Not Have an Account? <Link className="text-blue-600 font-bold hover:underline" to={"/register"}>Register</Link></p></div>
                    <div className="form-control px-8 mb-3">
                    <button onClick={handleGoogleLogin}
                        className="btn btn-outline flex items-center"> <FaGoogle />Sign in with Google</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;