// src/App.jsx

import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar/side bar';
import Main from './components/Main/Main';
import { model } from './config/gemini';
import './App.css';

const App = () => {
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);
    const chatDisplayRef = useRef(null);

    const scrollToBottom = () => {
        if (chatDisplayRef.current) {
            chatDisplayRef.current.scrollTop = chatDisplayRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory]);

    const handleSendMessage = async () => {
        if (!prompt.trim()) return;

        const userPrompt = prompt.trim();

        setChatHistory(prevHistory => [...prevHistory, { type: 'user', text: userPrompt }]);
        setPrompt('');

        setLoading(true);
        const geminiMessageIndex = chatHistory.length + 1;
        setChatHistory(prevHistory => [...prevHistory, { type: 'gemini', text: '' }]);

        try {
            if (!model) {
                throw new Error("Gemini model not initialized. Check your config/gemini.js file for API key and initialization.");
            }

            const result = await model.generateContentStream({
                contents: [{ role: "user", parts: [{ text: userPrompt }] }],
            });

            let currentGeminiText = '';
            for await (const chunk of result.stream) {
                const text = await chunk.text();
                currentGeminiText += text;
                setChatHistory(prevHistory => {
                    const newHistory = [...prevHistory];
                    newHistory[geminiMessageIndex] = { type: 'gemini', text: currentGeminiText };
                    return newHistory;
                });
            }
        } catch (error) {
            console.error("Error generating Gemini response:", error);
            setChatHistory(prevHistory => {
                const newHistory = [...prevHistory];
                newHistory[geminiMessageIndex] = { type: 'error', text: "Oops! Something went wrong. Please try again." };
                return newHistory;
            });
        } finally {
            setLoading(false);
        }
    };

    const startNewChat = () => {
        setChatHistory([]);
        setPrompt('');
        setLoading(false);
        console.log("New chat started!");
    };

    const loadPastPrompt = (pastText) => {
        setPrompt(pastText);
        setChatHistory([{ type: 'user', text: pastText }]);
        console.log(`Loaded past prompt: ${pastText}`);
    };

    const handleHelpClick = () => {
        setChatHistory(prev => [...prev, { type: 'gemini', text: "I can help you with general queries about how Gemini works, or answer any questions you have!" }]);
        console.log("Help clicked!");
    };

    const handleActivityClick = () => {
        setChatHistory(prev => [...prev, { type: 'gemini', text: "Your activity history is currently not implemented in this demo. Feature coming soon!" }]);
        console.log("Activity clicked!");
    };

    const handleSettingsClick = () => {
        setChatHistory(prev => [...prev, { type: 'gemini', text: "Settings are not available in this demo version. Stay tuned for updates!" }]);
        console.log("Settings clicked!");
    };

    const handleGalleryClick = () => {
        setChatHistory(prev => [...prev, { type: 'gemini', text: "Image upload is not supported in this demo. Please use text prompts for now." }]);
        console.log("Gallery (Add Image) clicked!");
    };

    const handleMicClick = () => {
        setChatHistory(prev => [...prev, { type: 'gemini', text: "Voice input is not supported in this demo. Please type your prompt." }]);
        console.log("Microphone clicked!");
    };

    const showInitialGreeting = chatHistory.length === 0;

    return (
        <>
            <Sidebar
                onNewChat={startNewChat}
                chatHistory={Array.from(new Set(chatHistory.filter(msg => msg.type === 'user').map(msg => msg.text)))}
                onLoadPastPrompt={loadPastPrompt}
                onHelpClick={handleHelpClick}
                onActivityClick={handleActivityClick}
                onSettingsClick={handleSettingsClick}
            />
            <Main
                prompt={prompt}
                setPrompt={setPrompt}
                handleSendMessage={handleSendMessage}
                loading={loading}
                chatHistory={chatHistory}
                chatDisplayRef={chatDisplayRef}
                onGalleryClick={handleGalleryClick}
                onMicClick={handleMicClick}
            />
        </>
    );
};

export default App;