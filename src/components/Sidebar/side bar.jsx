import React, { useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';

const Sidebar = ({ onNewChat,chatHistory,onLoadPastPrompt,onHelpClick,onActivityClick,onSettingsClick }) => { 
    const [extended, setExtended] = useState(false);

    return (
        <div className={`Sidebar ${extended ? 'extended' : ''}`}>
            <div className="top">
                <img onClick={() => setExtended(prev => !prev)} className='menu' src={assets.menu_icon} alt="" />
                <div className='new-chat'>
                    <img src={assets.plus_icon} alt="" />
                    {extended ? <p> New Chat</p> : null}
                </div>
                {extended 
                    ?(
          <div className="recent">
            <p className="title">Recent</p>
            {chatHistory.length > 0 ? (
              chatHistory.map((entry, index) => (
                <div key={index} onClick={() => onLoadPastPrompt(entry)} className="recent-entry"> {/* <--- Connects to onLoadPastPrompt */}
                  <img src={assets.message_icon} alt="message icon" />
                  <p>{entry.length > 15 ? entry.substring(0, 15) + '...' : entry}</p>
                </div>
              ))
            ) : (
              <p className="no-recent-chats">No recent chats</p>
            )}
          </div>
        ): null}
        </div>
        <div className="bottom">
                <div onClick={onHelpClick} className="bottom-item recent-entry"> 
                    <img src={assets.question_icon} alt="Help icon" />
                    {extended?<p>Help</p>:null}
                </div>
                <div onClick={onActivityClick} className="bottom-item recent-entry"> 
                    <img src={assets.history_icon} alt="Activity icon" />
                    {extended?<p>Activity</p>:null}
                </div>
                <div onClick={onSettingsClick} className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="Settings icon" />
                    {extended?<p>Settings</p>:null}
                </div>
            </div>
        </div>
    );
};
export default Sidebar;