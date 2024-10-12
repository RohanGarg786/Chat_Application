import  { useContext } from 'react'
import './Home.css'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Avatar } from '@mui/material'
import { GlobalStateContext } from '../ContextApi/GlobalStateProvide'
import SearchIcon from '@mui/icons-material/Search';
import DuoIcon from '@mui/icons-material/Duo';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AddIcon from '@mui/icons-material/Add';
import MicIcon from '@mui/icons-material/Mic';
import AddCommentIcon from '@mui/icons-material/AddComment';

const Home = () => {
    const context = useContext(GlobalStateContext);
    if (!context) {
        throw new Error("useGlobalState must be used within a GlobalStateProvider");
    }

    const { avatar } = context;
    return (
        <div className='home'>
            {/* Upper Panel  */}
           <div className="homeleft">
            <div className='leftUpperPanel'>
                <h2>Chats</h2>
                <div className="sidebar">
                    <AddCommentIcon color='action' className='add' sx={{ height: "4vh", width: "4vh" }}/>
                    <MoreVertIcon sx={{ height: "4vh", width: "4vh" }}/>
                </div>
            </div>
            <div className='leftSearch'>
                <input type="text" placeholder=' Search'/>
            </div>
            <div className='leftFilter'>
                <p>All</p>
                <p>Unread</p>
                <p>Favourites</p>
                <p>Groups</p>
            </div>
            <div className='leftBottomPanel'>Chatings</div>
           </div>

           <div className="homeright">
           <div className="upperPanel">
                <div className="upperPanelRight">
                    <Avatar src={avatar} alt='User' sx={{ height: "5vh", width: "5vh" }} />
                    <h3>User Name</h3>
                </div>
                <div className="upperPanelLeft">
                    <DuoIcon color='action' sx={{ height: "4vh", width: "4vh" }}/>
                    <SearchIcon sx={{ height: "4vh", width: "4vh" }}/>
                    <MoreVertIcon sx={{ height: "4vh", width: "4vh" }} />
                </div>
            </div>

            {/* Middel Panel For Messages */}
            <div className="rightMiddlePanel">
                H
            </div>
            <div className="rightBottomPanel">
                <div className='icons'>
                <InsertEmoticonIcon sx={{ height: "4vh", width: "4vh" }} className='InsertEmoticonIcon'/>
                <AddIcon sx={{ height: "4vh", width: "4vh" }} className='AddIcon'/>
                </div>
                <input type="text" placeholder='Type a message' />
                <MicIcon sx={{ height: "4vh", width: "4vh" }} className='MicIcon'/>
            </div>
           </div>
        </div>
    )
}

export default Home