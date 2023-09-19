import { useContext } from "react";
import "./stories.scss"
import { AuthContext } from "../../context/authContext";

const Stories = () => {

    const {currentUser} = useContext(AuthContext)

//Temporary

const stories=[
    {
        id: 1,
        name: "John Doe",
        img: "https://images.pexels.com/photos/74512/pexels-photo-74512.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        id: 2,
        name: "John Doe",
        img: "https://images.pexels.com/photos/74512/pexels-photo-74512.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        id: 3,
        name: "John Doe",
        img: "https://images.pexels.com/photos/74512/pexels-photo-74512.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        id: 4,
        name: "John Doe",
        img: "https://images.pexels.com/photos/74512/pexels-photo-74512.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
];

  return (
    <div className="stories">
        <div className="story">
            <img src={currentUser.profilePic} alt=""/>
            <span>{currentUser.name}</span>
            <button>+</button>
        </div>
       {stories.map(story=>(
        <div className="story" key={story.id}>
            <img src={story.img} alt=""/>
            <span>{story.name}</span>
        </div>
       ))} 
    </div>
  )
}

export default Stories