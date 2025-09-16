import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/jwt";
import { createBlog, updateBlog } from "fazal_bhinder-common";

export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string
        JWT_SECRET: string
      },
    Variables:{
        userId: string
    }
}>();

//Middleware 
const authMiddleware = async (c: any, next: any) => {
    const authHeader = c.req.header("authorization") || "";
    try {
      const user = await verify(authHeader, c.env.JWT_SECRET) as { id: string };
      if (user && user.id) {
        c.set("userId", user.id);
        await next();
      } else {
        c.status(403);
        return c.json({ message: "You are not logged in" });
      }
    } catch (e) {
      c.status(403);
      return c.json({ message: "token invalid or you are not logged in" });
    }
  };
  
  // Protect only these routes
  blogRouter.post('/', authMiddleware, async (c) => {
    const authorId = c.get("userId");
    if (!authorId) {
      c.status(403);
      return c.json({ error: "Unauthorized" });
    }
    const prisma = new PrismaClient({ datasourceUrl: c.env?.DATABASE_URL }).$extends(withAccelerate());
    const body = await c.req.json();
    const { success } = createBlog.safeParse(body);
    if (!success) {
      c.status(400);
      return c.json({ msg: "Inputs are not correct" });
    }
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: Number(authorId),
      }
    });
    return c.json({ id: blog.id });
  });
  
  blogRouter.put('/', authMiddleware, async (c) => {
    const body = await c.req.json();
    const { success } = updateBlog.safeParse(body);
    if (!success) {
      c.status(400);
      return c.json({ msg: "Invalid inputs" });
    }
    const prisma = new PrismaClient({ datasourceUrl: c.env?.DATABASE_URL }).$extends(withAccelerate());
    const blog = await prisma.blog.update({
      where: { id: body.id },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({ id: blog.id });
  });
  
 
 
blogRouter.get('/bulk', async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());
        
        const blog = await prisma.blog.findMany({
            select: {
                title: true,
                content: true,
                id: true,
                author: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        return c.json({
            blog,
        });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return c.json({ error: 'Internal Server Error' }, 500);
    }
});

  
blogRouter.get('/:id', async(c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl:c.env?.DATABASE_URL,
    }).$extends(withAccelerate())  

    try{
        const blog = await prisma.blog.findFirst({
            where:{
                id: Number(id)
            },
            select:{
                id:true,
                title:true,
                content:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        })
        return c.json({
            blog
        })
    }catch(e){
        c.status(411);
        return c.json({message:"blog not found"})
    }
  })
  
