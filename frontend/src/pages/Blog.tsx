import { Appbar } from "../components/AppBar"
import { FullBlog } from "../components/FullBlog"
import { SkeletonBlog } from "../components/SkeletonBlog"
import { useBlog } from "../hooks/hooks"
import { useParams } from "react-router-dom"

export const Blog = () =>{
    const {id} = useParams()
    const {loading , blog } = useBlog({
        id: Number(id) 
    })
    
    if(loading || !blog){
        return <div>
            <Appbar/>
            <div className="flex justify-center">
                <SkeletonBlog/>
            </div>
        </div>
    }
    return<div>
        
        <FullBlog blog={blog}/>
    </div>
}