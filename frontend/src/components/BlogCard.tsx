import { Link } from "react-router-dom"


interface BlogCardProps{
    authorName: string,
    title: string,
    content: string,
    publishedDate: string
    id:number
}


export const BlogCard = ( { 
    authorName , 
    title ,
    content , 
    publishedDate ,
    id 
}: BlogCardProps ) => {

    return <div className="">
        <div>
            
        </div>
            <div>
                <Link to={`/blog/${id}`}>
                    <div className="border-b border-slate-200 pb-4 p-4 w-screen max-w-screen-md cursor-pointer"> 
                        <div className="flex"> 
                                <Avatar name={authorName}/> 
                            <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
                                    {authorName}
                            </div>
                            <div className="flex justify-center flex-col pl-2 ">
                                <Circle/>
                            </div>
                            <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
                                {publishedDate} 
                            </div>
                        </div>
                        <div className="text-xl font-semibold pt-2">
                            {title}
                        </div>
                        <div className="text-md font-extralight">
                            {content.slice(0,100) + "..."}
                        </div>
                        <div className="w-full text-slate-500 text-sm font-thin pt-2">
                            {`${Math.ceil(content.length/100)} min read`}
                        </div>
                    </div>
                </Link>
            </div>
        </div>
}

export function Circle (){
    return <div className="bg-slate-400 h-1 w-1 rounded-full"></div>
}

export function Avatar({name}: {name:string}){
    return <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-stone-600 rounded-full dark:bg-stone-650">
            <span className="text-lg text-gray-600 dark:text-gray-300 ">{name[0]}</span>
        </div>

}

export function FeedBar() {
    return <div className='m-10'>
          <div>
  
          </div>
      </div>
    
  }
  
  