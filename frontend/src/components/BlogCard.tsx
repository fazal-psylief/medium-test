import { Link } from "react-router-dom"


interface BlogCardProps{
    authorName: string,
    title: string,
    content: string,
    publishedDate: string,
    id:number,
    image?: string
}


export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate,
    id,
    image
}: BlogCardProps) => {
    return (
        <div className="">
            <div>
            </div>
            <div>
                <Link to={`/blog/${id}`}>
                    <div className="border-b border-slate-200 pb-4 p-4 w-screen max-w-screen-md cursor-pointer bg-white dark:bg-[#232323] rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] flex items-start">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center mb-2">
                                <Avatar name={authorName} />
                                <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
                                    {authorName}
                                </div>
                                <div className="flex justify-center flex-col pl-2 ">
                                    <Circle />
                                </div>
                                <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
                                    {publishedDate}
                                </div>
                            </div>
                            <div className="text-xl font-semibold pt-2 truncate">
                                {title}
                            </div>
                            <div className="text-md font-extralight truncate">
                                {content.slice(0, 100) + "..."}
                            </div>
                            <div className="w-full text-slate-500 text-sm font-thin pt-2">
                                {`${Math.ceil(content.length / 100)} min read`}
                            </div>
                        </div>
                        {image && (
                            <img
                                src={image}
                                alt="Blog visual"
                                className="w-32 h-24 object-cover rounded-lg ml-4 flex-shrink-0 border border-gray-200 dark:border-gray-700"
                            />
                        )}
                    </div>
                </Link>
            </div>
        </div>
    );
}

export function Circle (){
    return <div className="bg-slate-400 h-1 w-1 rounded-full"></div>
}

export function Avatar({name}: {name:string}){
    return (
        <div className="relative inline-flex items-center justify-center w-9 h-9 overflow-hidden bg-stone-600 dark:bg-stone-700 rounded-full border-2 border-white dark:border-gray-700 shadow-md">
            <span className="text-lg font-bold text-gray-100 dark:text-gray-200 select-none">
                {name[0].toUpperCase()}
            </span>
        </div>
    );
}

export function FeedBar() {
    return <div className='m-10'>
          <div>
  
          </div>
      </div>
    
  }
  
  