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

    async function sendRequest(){
        try{
            const response = await axios.post(`${BACKEND_URL}api/v1/user/${type === "signup" ? "signup" : "signin"}`, blogInputs);
            const jwt = response.data;
            localStorage.setItem("token ",jwt);
            navigate("/blogs")
        }catch(e){
            console.log(e)
            alert("Error while signing up")
        }
    }

    return <div className="h-screen flex justify-center flex-col">
           <div className="flex justify-center">
                <div>
                    <div className="px-10">    
                        <div className="text-3xl font-extrabold ">
                            Create an account
                        </div>
                        <div className=" text-slate-500">
                            {type === "signin" ? "Don't have an account?" : "Already have an account?"} 
                            <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                                {type === "signin" ? "Sign up" : "Sign in"}
                            </Link>
                        </div>
                    </div>
                    <div className="pt-7">
                        {type === "signup" ? <LabelledInputType label="Username" placeholder="Enter your username" onChange={(e)=>{
                                setBlogInputs({
                                    ...blogInputs,
                                    name: e.target.value
                                }) 
                            }}/> : null}
                        <LabelledInputType label="Email" placeholder="m@example.com" onChange={(e)=>{
                                setBlogInputs({
                                    ...blogInputs,
                                    email: e.target.value
                                })
                            }}/>
                        <LabelledInputType label="Password" type={"password"} placeholder="******" onChange={(e)=>{
                                setBlogInputs({
                                    ...blogInputs,
                                    passward: e.target.value
                                })
                            }}/>
                            <button onClick={sendRequest} className="bg-slate-900 mt-8 hover:bg-slate-700 text-white font-bold py-2 px-4 w-full rounded">
                                {type === "signup" ? "Sign up" : "Sign in"}
                            </button>
                    </div>
                    </div>
            </div>
    </div>
}

interface LabelledInputType{
    label: string;
    placeholder: string;
    onChange: (e:ChangeEvent<HTMLInputElement>)=> void;
    type?: string; 
}

function LabelledInputType({label,placeholder,onChange,type}: LabelledInputType){
        return<div>
            <label className="block mb-2 text-sm font-semibold text-black pt-2">{label }</label>
                <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
                 placeholder={placeholder} required />
        </div>
}