import { useState } from 'react'
import axios from 'axios'

function App() {
  const [topic, setTopic] = useState("fractions")
  const [grade, setGrade] = useState("4")
  const [plan, setPlan] = useState("")

  const generateLessonPlan = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/lesson', {
        params: { topic, grade }
      })
      setPlan(res.data.plan)
    } catch (error) {
      console.error("Error generating lesson plan:", error)
      setPlan("Something went wrong. Is the backend running?")
    }
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>🧑‍🏫 AI Lesson Plan Generator</h1>
      <div style={{ marginBottom: "1rem" }}>
        <input 
          type="text" 
          value={topic} 
          onChange={e => setTopic(e.target.value)} 
          placeholder="Topic (e.g. Fractions)" 
          style={{ marginRight: "0.5rem", padding: "0.5rem" }} 
        />
        <input 
          type="text" 
          value={grade} 
          onChange={e => setGrade(e.target.value)} 
          placeholder="Grade (e.g. 4)" 
          style={{ marginRight: "0.5rem", padding: "0.5rem" }} 
        />
        <button onClick={generateLessonPlan} style={{ padding: "0.5rem 1rem" }}>
          Generate Plan
        </button>
      </div>
      <pre style={{ whiteSpace: "pre-wrap", background: "#f9f9f9", padding: "1rem" }}>
        {plan}
      </pre>
    </div>
  )
}

export default App
