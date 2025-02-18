import './App.css'
import 'prismjs/themes/prism-tomorrow.css'
import prism from 'prismjs'
import axios from 'axios'
import Editor from 'react-simple-code-editor'
import { use, useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import rehypeHighLight from 'rehype-highlight'
import "highlight.js/styles/github-dark.css";

function App() {

const [code,setCode]=useState(`function sum(){return a+b;}`)
const [review,setReview]=useState('')
const [loading,setLoading]=useState(false);

const reviewCode=async()=> {
  setLoading(true);
  try {
      const response = await axios.post('http://localhost:3000/ai/getReview', { code });
      console.log("API Response:", response.data);
      setReview(response.data)

  } catch (error) {
      console.error("API Error:", error);
      setReview("Error fetching review. Try again.");
  }
  setLoading(false);
}


useEffect(()=>{
prism.highlightAll()
},[])

  return (
    <main className="h-screen w-full p-3 flex gap-3 bg-gray-800">
      <div className="left basis-1/2 flex flex-col bg-black text-white p-4 rounded-lg shadow-md relative overflow-auto">
        <div className="code font-bold flex-grow ">
        <Editor
            value={code}
            onValueChange={setCode}
            highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
            padding={10}
            style={{
              fontFamily: '"Fira Code", "Fira Mono", monospace',
              fontSize: 12,
              border: "none",        // Removes border
              outline: "none",       // Removes focus outline
              boxShadow: "none",     // Removes any box shadow
              overflow: "auto", 
              borderRadius: "5px",
              height: "100%",
              width: "100%",
              background: "transparent",  // Ensures no background color from the editor
            }}
         />          

        </div>

        <button onClick={reviewCode} className="reviewbtn cursor- absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer ">
          Submit for Review
        </button>
      </div>

      <div style={{ backgroundColor: "#343434" }} className="right basis-1/2 p-4 rounded-lg shadow-md overflow-auto">
  <h2 className="text-xl font-bold">Code Review</h2>
  
  {loading ? (
    <div className="flex flex-col items-center justify-center h-full">
       <div className="w-12 h-12 border-4 border-gray-400 border-t-transparent rounded-full animate-spin">
       </div>
      <p className="mt-3 text-gray-300">Analyzing your code...</p>
    </div>
  ) : (
    <p className="text-gray-400 overflow-auto">
      <Markdown>{review}</Markdown>
    </p>
  )}
</div>

    </main>
  );
}

export default App;