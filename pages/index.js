import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [posts,setPost]=useState([])
  const [id,setId]=useState([])
  const [title,setTitle]=useState([])
  const [author,setAuthor]=useState([])
  const getPosts= async() => {
    const response = await axios.get('http://localhost:8000/users')
   setPost(response.data)
  }


  useEffect(()=> {
    getPosts()
  , []})
  console.log(posts)
  const postUsers = async(e) => {
    e.preventDefault()
const response = await axios.post('http://localhost:8000/users', {id,title,author})
if (response.status == 200) {
  getPosts()
}
  }
  return (
    <div className={styles.container}>
      <div>
        <form onSubmit={postUsers}>
          <input onChange={(e)  => setId(e.target.value)}value={id}placeholder='id' />
          <input onChange={(e)  => setTitle(e.target.value)}value={title}placeholder='title' />
          <input onChange={(e)  => setAuthor(e.target.value)}value={author}placeholder='author' />
          <input type='submit' />
        </form>
      </div>
     
     <div>
      {posts?.map((post,i) => {
      return(
        <div key={i}>
          <h1>
{post.id}
</h1>
<h2>{post.title}</h2>
<h3>{post.author}</h3>
        </div>
      )
})}

     </div>
     
    </div>
  )
}
