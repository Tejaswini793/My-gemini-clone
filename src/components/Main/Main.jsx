// components/Main/Main.jsx

import React from 'react';
import './Main.css';
import { assets } from '../../assets/assets';

const Main = ({
  prompt,
  setPrompt,
  handleSendMessage,
  loading,
  chatHistory,
  chatDisplayRef
}) => {
  return (
    <div className='main'>
      <div className='nav'>
        <p>Gemini</p>
        <img src={assets.user_icon} alt='User Icon' />
      </div>

      <div className="main-container">
        {chatHistory.length === 0 && !loading ? (
          <>
            <div className="greet">
              <p><span>Hello, Tejaswini.</span></p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt='Code Icon' />
              </div>
              <div className="card">
                <p>Suggest some good places for roadtrip</p>
                <img src={assets.compass_icon} alt='Compass Icon' />
              </div>
              <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt='Bulb Icon' />
              </div>
              <div className="card">
                <p>Brainstorm some team bonding idea</p>
                <img src={assets.message_icon} alt='Message Icon' />
              </div>
            </div>
          </>
        ) : (
          <div className="chat-display" ref={chatDisplayRef}>
            {chatHistory.map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                <p>{msg.text}</p>
              </div>
            ))}

            {loading && (
              <div className="loading-indicator message gemini">
                <div className="dot-pulse"></div>
                <p>Thinking...</p>
              </div>
            )}
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              type='text'
              placeholder='Enter a prompt here'
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
              disabled={loading}
            />
            <div>
              <img src={assets.gallery_icon} alt='Gallery Icon' />
              <img src={assets.mic_icon} alt='Mic Icon' />
              {prompt ? (
                <img
                  onClick={handleSendMessage}
                  src={assets.send_icon}
                  alt='Send Icon'
                  className="send-icon"
                />
              ) : null}
            </div>
          </div>
          <p className='bottom-info'>
            Gemini might give inaccurate info, including about people, so double-check its responses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;