import { makeRequest } from "../../axios";
import Post from "../post/Post";
import "./posts.scss"
import {useQuery} from '@tanstack/react-query'

const Posts = ({userId}) => {

  const { isLoading, error, data } = useQuery({
    queryKey: ['posts'],
    queryFn: () =>
     makeRequest.get("/posts?userId="+userId).then((res) => {
      return res.data;
     })
  })

  console.log(data)
//temporary

// const posts =[
//     {
//         id: 1,
//         name: "John Doe",
//         userId: 1,
//         profilePic:"https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=600",
//         desc:"Aaas fghhyy uuytf gf6yhjj ggty",
//         img:"https://images.pexels.com/photos/1829980/pexels-photo-1829980.jpeg?auto=compress&cs=tinysrgb&w=600"

//     },

//     {
//         id: 2,
//         name: "Jane Doe",
//         userId: 2,
//         profilePic:"https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//         desc:"Sadfaj hhauua auyy ahaau ya66a"
//     },
// ];

  return (
    <div className="posts">
        {error ? "Something went wrong!":isLoading ? "loading" :data.map((post)=>(
          <Post post={post} key={post.id}/>
        ))}
    </div>
  )
}

export default Posts