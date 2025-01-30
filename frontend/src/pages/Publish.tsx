import axios from "axios"
import { Appbar } from "../components/AppBar"
import { BACKEND_URL } from "../config"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


export const Publish = ()=>{

    const [title , setTitle] = useState("");
    const [description , setDescription] = useState("");
    const navigate = useNavigate();

    return <div>
        <Appbar/>
            <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
      {/* Editor Wrapper */}
      <div className="w-full max-w-4xl bg-gray-50 rounded-lg p-8">
        {/* Add Button and Title */}
        <div className="flex items-center mb-6">
          <button className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-400 text-gray-500">
            +
          </button>
          <div className="ml-4 flex flex-col w-full">
            <input onChange={(e)=>{
                setTitle(e.target.value)
            }}
              type="text"
              placeholder="Title"
              className="w-full text-3xl font-semibold text-gray-800 placeholder-gray-400 focus:outline-none bg-gray-50"
            />
          </div>
        </div>

        {/* Content Area */}
        <textarea onChange={(e)=>{
            setDescription(e.target.value)
        }}
          placeholder="Tell your story..."
          className="w-full min-h-[400px] text-lg text-gray-700 bg-gray-50 focus:outline-none placeholder-gray-400 resize-none"
        ></textarea>

        {/* Publish Button */}
        <div className="flex justify-end mt-6">
          <button onClick={async()=>{
            const response = await axios.post(`${BACKEND_URL}api/v1/blog`,{
                title,
                content:description
            },{
                headers:{
                    Authorization: localStorage.getItem("token")
                }
            });
            navigate(`/blog/${response.data.id}`)
          }} className="px-8 py-3 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition duration-300">
            Publish
          </button>
        </div>
      </div>
    </div>
    </div>
}