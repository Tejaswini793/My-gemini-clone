import React from 'react'
import './Main.css'
import { assets } from '../../assets/assets'


const Main = () => {
  return (
    <div className='main'>
        <div className='nav'>
            <p>Gemini</p>
            <img src={assets.user_icon} alt='' />
        </div>
        <div className="main-container">
            <div className="greet">
                <p><span> Hello ,Tejaswini.</span></p>
                <p>How can I help you today?</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Improve the readability of the following code</p>
                    <img src={assets.code_icon} alt='' />
                </div>
                <div className="card">
                    <p>Suggest some good places for roadtrip</p>
                    <img src={assets.compass_icon} alt='' />
                </div>
                <div className="card">
                    <p>Briefly summarize this concept: urban planning</p>
                    <img src={assets.bulb_icon} alt='' />
                </div>
                <div className="card">
                    <p>Brainstorm some team bonding idea</p>
                    <img src={assets.message_icon} alt='' />
                </div>
            </div>

            <div className="main-bottom">
                <div className="search-box">
                    <input type='text' placeholder='Enter a prompt here' />
                    <div>
                        <img src={assets.gallery_icon} alt=''/>
                        <img src={assets.mic_icon} alt=''/>
                        <img src={assets.send_icon} alt=''/>
                    </div>
                </div>
                <p className='bottom-info'>
                    Gemini might give inaccurate info, including about people, so double-check its responses.
                </p>
            </div>
        </div>

    </div>
  )
}

export default Main