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
            <div className="min-h-screen bg-gray-50 dark:bg-[#181818] flex flex-col items-center p-8">
      {/* Editor Wrapper */}
      <div className="w-full max-w-4xl bg-white dark:bg-[#232323] rounded-lg p-8 shadow-xl">
        {/* Add Button and Title */}
        <div className="flex items-center mb-6">
          <button className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-400 dark:border-gray-600 text-gray-500 dark:text-gray-300 bg-gray-100 dark:bg-[#232323]">
            +
          </button>
          <div className="ml-4 flex flex-col w-full">
            <input onChange={(e)=>{
                setTitle(e.target.value)
            }}
              type="text"
              placeholder="Title"
              className="w-full text-3xl font-semibold text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none bg-gray-50 dark:bg-[#232323]"
            />
          </div>
        </div>

        {/* Content Area */}
        <textarea onChange={(e)=>{
            setDescription(e.target.value)
        }}
          placeholder="Tell your story..."
          className="w-full min-h-[400px] text-lg text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-[#232323] focus:outline-none placeholder-gray-400 dark:placeholder-gray-500 resize-none rounded-md border border-gray-200 dark:border-gray-700"
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
          }} className="px-8 py-3 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition duration-300 shadow-md">
            Publish
          </button>
        </div>
      </div>
    </div>
    </div>
}