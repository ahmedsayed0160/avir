import React, { useContext, useEffect, useState } from 'react'
import style from './Home.module.css'
import Profile from '../Profile/Profile'
import { CounterContext } from '../../Context/CounterContext';
import { PostContext } from '../../Context/PostContext';

export default function Home() {

 let {getAllPosts} = useContext(PostContext);
 const [posts, setposts] = useState([])

 async function getPosts(){
    let res = await getAllPosts();
    
    if (res.length ){
      setposts(res)
      console.log(res);
    }

      
  }

   useEffect(()=>{
    getPosts();
    
   },[])
   
  return <>
  
   {[].map ((post) => <div key={post.id} className='w-full my-8 md:w-[80%] lg:w-[60%] rounded-md bg-slate-200  mx-auto p-4 '>
    <div className='flex justify-between items-center'> 
      <div className='flex items-center gap-4 mb-4'> 
        <img src={post.user.photo} className='size-[36px]' alt="" />
        <p>{post.user.name}</p>
      </div>
      <div className='text-sm'>
        {post.createdAt}
      </div>
    </div>
     {post.body && <h2 className='mb-4'>{post.body}</h2>}
     {post.image && <img src={post.image} className='w-full rounded-md' alt={posts.body} />}

   </div>)  }
  </>
  
}
