import { Appbar } from "../components/AppBar"
import { BlogCard, FeedBar } from "../components/BlogCard"
import { SkeletonBlog } from "../components/SkeletonBlog";
import { useBlogs } from "../hooks/hooks";


export const Blogs = ()=>{

    const {loading,blogs} = useBlogs();

    if(loading){
        return<div>
            <Appbar/>
            <div  className="flex justify-center">
                <div>
                    <SkeletonBlog/>
                    <SkeletonBlog/>
                    <SkeletonBlog/>
                    <SkeletonBlog/>
                    <SkeletonBlog/>
                    <SkeletonBlog/>
                </div>
            </div>
        </div>
    }

    return <div>
            <Appbar/>
            <FeedBar/>
                <div  className="flex justify-center">
                    <div  className="">
                        {blogs.map(blog =><BlogCard 
                        key={blog.id}
                        id={blog.id}
                        authorName={blog.author.name || "Anonymous"}
                        title={blog.title}
                        content={blog.content}
                        publishedDate={"2nd Feb 2024"}
                        />)}
                </div>
            </div>
        </div>
}