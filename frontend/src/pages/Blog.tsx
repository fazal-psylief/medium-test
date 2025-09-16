import { FullBlog } from "../components/FullBlog"
import { SkeletonBlog } from "../components/SkeletonBlog"
import { useBlog } from "../hooks/hooks"
import { useParams } from "react-router-dom"

export const Blog = () => {
    const { id } = useParams();
    const { loading, blog } = useBlog({ id: Number(id) });

    if (loading || !blog) {
        return (
            <div className="bg-white dark:bg-[#181818] min-h-screen">
                <SkeletonBlog />
            </div>
        );
    }
    return <FullBlog blog={blog} />;
}