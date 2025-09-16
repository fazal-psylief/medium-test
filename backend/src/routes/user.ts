import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { signinInput, signupInput } from "fazal_bhinder-common";
import { Hono } from "hono";
import { sign } from "hono/jwt";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if(!success){
      c.status(401)
      return c.json({
        msg: "Invalid Inputs"
      })
    }
  
    try{
        const user = await prisma.user.create({
        data:{
          email:body.email,
          passward:body.passward,
          name: body.name || null,
        }
      })
        const jwt = await sign({id:user.id},c.env.JWT_SECRET)
        return c.json({jwt})
    }catch(error){
        c.status(403);
        console.error('Error while signing up:', error); 
        return c.json({error:'error while signup'})
    }
})
  
userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if(!success){
      c.status(401)
      return c.json({
        msg: "Invalid Inputs"
      })
    }
    const user = await prisma.user.findUnique({
      where: {
          email: body.email
      }
  });
  
  if (!user || user.passward !== body.password) {
      c.status(403);
      return c.json({ error: "Invalid credentials" });
  }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
})