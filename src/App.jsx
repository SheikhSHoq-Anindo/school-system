import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

function App() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  // Form state.
  const [name, setName] = useState('')
  const [roll, setRoll] = useState('')
  const [className, setClassName] = useState('KG-1')
  const [saving, setSaving] = useState(false)

  // Load students on page open
  useEffect(() => {
    loadStudents()
  }, [])

  async function loadStudents() {
    const { data, error} = await supabase
      .from('students')
      .select('*')
      .eq('academic_year', 2025)
      .order('roll_number', {ascending: true})
    
    if (error) console.error(error)
    else setStudents(data)
    setLoading(false)
  }

  // This runs when the form is submitted
  async function addStudent() {
    // Basic validation - don't save empty data
    if (!name || !roll) {
      alert('Please fill in name and roll number')
      return
    }

    setSaving(true)

    const {error} = await supabase.from('students').insert({
      name: name,
      roll_number: parseInt(roll), // convert text to roll_number
      class: className,
      academic_year: 2025
    })

    if(error) {
      console.error(error)
      alert('Error saving student')
    } else {
      // Clear the form
      setName('')
      setRoll('')
      // Reload the list so the new student appears
      await loadStudents()
    }

    setSaving(false)
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto'}}>
      <h1>School System</h1>

      {/* Add Student Form*/}
      <div style={{ background: '#f0f0f0', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
        <h1>Add Student</h1>

        <div style={{ marginBottom: '8px'}}>
          <label>Name: </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Student full name"
            style={{ marginLeft: '8px', padding: '4px' }}
            />
        </div>

        <div style={{ marginBottom: '8px'}}>
          <label>Roll Number: </label>
          <input
            value={roll}
            onChange={(e) => setRoll(e.target.value)}
            placeholder="Assigned roll number at the time of admission"
            type="number"
            style={{ marginLeft: '8px', padding: '4px' }}
            />
        </div>

        <div style={{ marginBottom: '16px'}}>
          <label>Class: </label>
          <select
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            style={{ marginLeft: '8px', padding: '4px' }}
          >
            <option value="KG-1">KG-1</option>
            <option value="KG-2">KG-2</option>
            <option value="KG-3">KG-3</option>
          </select>
          
        </div>

        <button
          onClick={addStudent}
          disabled={saving}
          style={{ padding: '8px 16px', cursor: 'pointer' }}
        >
          {saving ? 'Saving...' : 'Add Student'}
        </button>
      </div>

      {/* Student List*/}
      <h2>Students ({students.length})</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        students.map(student => {
          <div key={student.id} style={{
            padding: '12px',
            borderBottom: '1px solid #ddd',
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <strong>{student.name}</strong>
            <span>Roll {student.roll_number}</span>
            <span>{student.class}</span>
          </div>})
      )}
    </div>
  )
}

export default App