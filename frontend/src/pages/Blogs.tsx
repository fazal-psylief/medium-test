import { Appbar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { SkeletonBlog } from "../components/SkeletonBlog";
import { useBlogs } from "../hooks/hooks";
import { useState } from "react";

const tabs = [
  { name: "For you" },
  { name: "Following" },
  { name: "Featured", badge: "New" },
  { name: "Technology" },
  { name: "Data Science" },
  { name: "Programming" },
];

const staffPicks = [
  { title: "Want to just start writing? Join the \"Write with Medium\" June micro-challenge", author: "Scott Lamb", days: "1d ago", icon: "🟨" },
  { title: "Pride Didn't Ask Permission, Disruption Is Not Violence", author: "Dayna A. Ellis", days: "5d ago", icon: "🌈" },
  { title: "Ignoring the value of \"quiet work\" starts in the classroom", author: "The Medium Newsletter", days: "2d ago", icon: "📰" },
];

const recommendedTopics = [
  "Self Improvement", "Machine Learning", "Writing", "Relationships", "Politics"
];

export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  const [activeTab, setActiveTab] = useState("For you");

  // Example images from attached files
  const blogImages = [
    "/ai-tombstone.jpg",
    "/single-source-of-truth.jpg",
    "/monitor-dashboard.jpg",
    "/ink-splash.jpg",
    "/robot-meditate.jpg",
    "/postcss.jpg"
  ];

  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="flex justify-center">
          <div>
            <SkeletonBlog />
            <SkeletonBlog />
            <SkeletonBlog />
            <SkeletonBlog />
            <SkeletonBlog />
            <SkeletonBlog />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#181818] min-h-screen">
      <Appbar />
      {/* Tabs */}
      <div className="flex justify-center border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#181818] sticky top-[56px] z-40">
        <div className="flex space-x-6 max-w-4xl w-full px-4 py-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`relative flex items-center font-semibold text-base cursor-pointer pb-2 focus:outline-none transition-colors ${activeTab === tab.name ? 'text-black dark:text-white border-b-2 border-black dark:border-white' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}
            >
              {tab.name}
              {tab.badge && (
                <span className="ml-2 px-2 py-0.5 text-xs bg-green-500 text-white rounded-full font-bold">{tab.badge}</span>
              )}
            </button>
          ))}
        </div>
      </div>
      {/* Main Content */}
      <div className="flex flex-row justify-between max-w-7xl mx-auto mt-8 px-4">
        {/* Blog List */}
        <div className="flex-1 max-w-xl mr-8">
          {blogs.map((blog, idx) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              authorName={blog.author?.name || "Anonymous"}
              title={blog.title}
              content={blog.content}
              publishedDate={"2nd Feb 2024"}
              image={blogImages[idx % blogImages.length]}
            />
          ))}
        </div>
        {/* Sidebar */}
        <div className="w-80 hidden lg:block">
          {/* Staff Picks */}
          <div className="mb-8">
            <div className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Staff Picks</div>
            <ul className="space-y-4">
              {staffPicks.map((pick, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-2xl mt-1">{pick.icon}</span>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">{pick.title}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{pick.author} <span className="mx-1">·</span> {pick.days}</div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-green-600 dark:text-green-400 text-sm font-semibold cursor-pointer">See the full list</div>
          </div>
          {/* Recommended Topics */}
          <div>
            <div className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Recommended topics</div>
            <div className="flex flex-wrap gap-2">
              {recommendedTopics.map((topic, i) => (
                <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-[#232323] text-gray-700 dark:text-gray-200 rounded-full text-xs font-semibold cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">{topic}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};