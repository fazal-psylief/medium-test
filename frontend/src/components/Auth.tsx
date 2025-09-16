import { signupInput } from "fazal_bhinder-common";
import { ChangeEvent, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({type}: {type: "signup" | "signin"})=>{

    const navigate = useNavigate();
    const [blogInputs, setBlogInputs ] = useState<signupInput>({
        name: "",
        email : "",
        passward: ""
    })
    const [showUserExists, setShowUserExists] = useState(false);

    async function sendRequest(){
        try{
            const response = await axios.post(`${BACKEND_URL}api/v1/user/${type === "signup" ? "signup" : "signin"}`, blogInputs);
            const jwt = response.data;
            console.log("Auth response:", jwt);
            localStorage.setItem("token", jwt.jwt);
            navigate("/blogs")
        }catch(e: any){
            if (e.response && e.response.data && (e.response.data.code === "P2002" || (e.response.data.message && e.response.data.message.toLowerCase().includes("email already exists")))) {
                setShowUserExists(true);
            } else {
                alert("Error while signing up")
            }
        }
    }

    return (
        <div className="w-full max-w-md mx-auto">
            {/* User Exists Popup */}
            {showUserExists && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white dark:bg-[#232323] rounded-xl shadow-lg p-8 max-w-xs w-full text-center animate-fade-in">
                        <div className="text-lg font-bold text-red-600 dark:text-red-400 mb-2">User already exists</div>
                        <div className="text-gray-700 dark:text-gray-200 mb-4">Try to sign in instead.</div>
                        <button
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white rounded-full font-semibold transition-colors w-full"
                            onClick={() => setShowUserExists(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            <div className="bg-white dark:bg-[#232323] rounded-2xl shadow-lg px-10 py-12">
                <div className="text-center mb-8">
                    <div className="text-3xl font-extrabold font-serif text-gray-900 dark:text-white mb-2">
                        {type === "signup" ? "Create an account" : "Sign in to Medium"}
                    </div>
                    <div className="text-slate-500 dark:text-slate-300 text-base">
                        {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                        <Link className="pl-2 underline text-green-600 dark:text-green-400 font-semibold" to={type === "signin" ? "/signup" : "/signin"}>
                            {type === "signin" ? "Sign up" : "Sign in"}
                        </Link>
                    </div>
                </div>
                <div className="space-y-6">
                    {type === "signup" ? (
                        <LabelledInputType label="Username" placeholder="Enter your username" onChange={(e) => {
                            setBlogInputs({
                                ...blogInputs,
                                name: e.target.value
                            })
                        }} />
                    ) : null}
                    <LabelledInputType label="Email" placeholder="m@example.com" onChange={(e) => {
                        setBlogInputs({
                            ...blogInputs,
                            email: e.target.value
                        })
                    }} />
                    <LabelledInputType label="Password" type={"password"} placeholder="******" onChange={(e) => {
                        setBlogInputs({
                            ...blogInputs,
                            passward: e.target.value
                        })
                    }} />
                    <button onClick={sendRequest} className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-bold py-2 px-4 w-full rounded-full shadow-md transition-colors duration-200 mt-2">
                        {type === "signup" ? "Sign up" : "Sign in"}
                    </button>
                </div>
            </div>
        </div>
    );
}

interface LabelledInputType{
    label: string;
    placeholder: string;
    onChange: (e:ChangeEvent<HTMLInputElement>)=> void;
    type?: string; 
}

function LabelledInputType({label,placeholder,onChange,type}: LabelledInputType){
    return (
        <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200 pt-2">{label}</label>
            <input
                onChange={onChange}
                type={type || "text"}
                className="bg-gray-50 dark:bg-[#181818] border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 transition-colors duration-200"
                placeholder={placeholder}
                required
            />
        </div>
    );
}