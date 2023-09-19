import { useContext, useState } from "react";
import "./comments.scss"
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import moment from 'moment'
import { useMutation, useQueryClient ,useQuery} from "@tanstack/react-query";

const Comments = ({postId}) => {

    const [desc, setDesc] = useState("");

    const {currentUser} = useContext(AuthContext);

    const { isLoading, error, data } = useQuery({
        queryKey: ['comments'],
        queryFn: () =>
         makeRequest.get("/comments?postId="+postId).then((res) => {
          return res.data;
         })
      });

      
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ desc, postId});
    setDesc("");

  };

    //Temporary
    // const comments =[
    //     {
    //         id:1,
    //         desc: "ferds cfgdv bghfvcd hhbbbv",
    //         name :"John Doe",
    //         userId:1,
    //         profilePicture: "https://images.pexels.com/photos/1829980/pexels-photo-1829980.jpeg?auto=compress&cs=tinysrgb&w=600"
    //     },
    //     {
    //         id:1,
    //         desc: "ferds cfgdv bghfvcd hhbbbv",
    //         name :"John Doe",
    //         userId:1,
    //         profilePicture: "https://images.pexels.com/photos/1829980/pexels-photo-1829980.jpeg?auto=compress&cs=tinysrgb&w=600"
    //     },
        
    // ];


  return (
    <div className="comments">
        <div className="write">
            <img src={currentUser.profilePic} alt="" />
            <input type="text" placeholder="write a comment" onChange={(e) => setDesc(e.target.value)} value={desc}/>
            <button onClick={handleClick}>Send</button>
        </div>

        {isLoading ? "loading" :data.map((comment)=>(
           <div className="comment" key={comment.id}>
            <img src={comment.profilePic} alt="" />
            {/* <img src={currentUser.profilePicture} alt="" /> */}
            <div className="info">
                <span>{comment.name}</span>
                <p>{comment.desc}</p>
            </div>
            <span className="date">{moment(comment.createdAt).fromNow()}</span>
           </div> 
        ))}
    </div>
  );
};

export default Comments