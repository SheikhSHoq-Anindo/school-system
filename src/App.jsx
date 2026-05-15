import { useEffect, useState } from "react";
import { supabase } from "../supabaseCLient";

function App() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStudents() {
      const { data, error } = await supabase
        .from ('students')
        .select('*')
        .eq('academic_year', 2025)
      
      if (error) {
        console.error(error)
      } else {
        setStudents(data)
      }
      setLoading(false)
    }

    loadStudents()
  }, [])

  if(loading) return <p>Loading...</p>

  return (
    <div>
      <h1>Students</h1>
      {students.map(student => (
        <div key= {student.id}>
          <strong>{student.name}</strong> - Roll {student.roll_number} - {student.class}
        </div>))
      }
      
    </div>
  )
}

export default App