import { Blog } from "../hooks/hooks"
import { Appbar } from "./AppBar"
import { Avatar } from "./BlogCard"

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div className="bg-white dark:bg-[#181818] min-h-screen">
      <Appbar />
      <div className="flex justify-center gap-8 max-w-7xl mx-auto mt-8 px-4">
        {/* Main Blog Content */}
        <div className="flex-1 max-w-2xl">
          <div className="border-b border-gray-200 dark:border-gray-700 pb-8 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Avatar name={blog.author.name || "Anonymous"} />
              <span className="text-sm text-gray-700 dark:text-gray-300 font-semibold">{blog.author.name || "Anonymous"}</span>
              <span className="mx-2 text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-400">2nd Feb 2024</span>
            </div>
            <div className="text-4xl font-extrabold font-serif text-black dark:text-white mb-4">
              {blog.title}
            </div>
            <div className="text-lg text-gray-700 dark:text-gray-200 mb-6">
              {blog.content}
            </div>
          </div>
        </div>
        {/* Image Placeholder (for visual consistency) */}
        <div className="w-80 h-56 bg-gray-200 dark:bg-gray-700 rounded-lg flex-shrink-0 hidden lg:block mt-4"></div>
      </div>
    </div>
  );
};