import { NextResponse,NextRequest } from "next/server";
import { testConnection } from "@/database/db";
import { blogCategoryModel } from "@/models/blogCategory.model";
import { Blog } from "@/models/blog.model";
import { Sequelize } from "sequelize";

type Answer = {
  name: string;
  total: number;
};


export async function GET(){
    try {
        await testConnection();

        const category = await blogCategoryModel.findAll({
            where:{
               active:true, 
            },
            attributes:["id","name"],
            raw:true,
        })

        const blogs = await Blog.findAll({
          where: {
            active: true,
          },
          attributes: ["categoryId",
            [Sequelize.fn('COUNT',Sequelize.col('id')),'totalBlogs']
          ],
          group: ["categoryId"],
          raw: true,
        });
        const first3blogs = await Blog.findAll({
          where: {
            active: true,
            status : "published",
          },
          attributes: ["id", "slug", "title"],
          raw: true,
          limit: 3,
        });
        const ans:Answer[]=[];
        for(let i=0;i<category.length;i++){
          for(let j=0;j<blogs.length;j++){
              if(category[i].id == blogs[j].categoryId){
                  ans.push({ "name": category[i]?.name, "total": blogs[j]?.totalBlogs });
              }
            // console.log(blogs[j]);
          }
        }

        return NextResponse.json({
          message: "Blog fetched by group",
          blogs: blogs.length,
          category: category.length,
          ans: ans,
          first3blogs:first3blogs,
        });

    } catch (error:any) {
        console.log(error.message);
        return NextResponse.json({message:error.message,status:0});
    }
}