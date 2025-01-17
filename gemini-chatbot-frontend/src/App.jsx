import { useState } from 'react'
import './App.css'
import ChatInput from './components/ChatInput'
import ChatResponse from './components/ChatResponse'
import { fetchChatResponse } from './services/api';

function App() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleQuestionSubmit = async(question) => {
    setLoading(true);
    setResponse(null);
    try {
      //Making an API call
      const apiResponse = await fetchChatResponse(question);
      setResponse(apiResponse);

    } catch (error) {
      alert("Error occured, Failed to get the response. Please try again later.");
    } finally {
      setLoading(false);
    }
  }


  // //If loading is true, display loading message
  // if(loading){
  //   return <div className="container my-4"> Loading... </div>
  // }

  return (
    <div className='App'>
      <header className='bg-primary text-white text-center py-4'>
        <h1> Gemini QnA Chatbot </h1>
      </header>

        {/* Input from User */}
        <ChatInput onSubmit={handleQuestionSubmit}/>

        {loading && <h2> Loading.... Please Wait </h2>}

        {/* Response from Gemini */}
        <ChatResponse response={response}/>

        

      
    </div>
  )
}

export default App
