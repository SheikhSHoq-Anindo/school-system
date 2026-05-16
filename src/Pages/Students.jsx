    import { useEffect, useState } from 'react'
    import { supabase } from '../../supabaseClient'

    export default function Students() {
        const [students, setStudents] = useState([])
        const [loading, setLoading] = useState(true)
        const [name, setName] = useState('')
        const [roll, setRoll] = useState('')
        const [className, setClassName] = useState('KG-1')
        const [saving, setSaving] = useState(false)

        useEffect(() => {
            loadStudents()
        }, [])
        
        async function loadStudents() {
            const {data, error} = await supabase
            .from('students')
            .select('*')
            .eq('academic_year', 2025)
            .order('roll_number', { ascending: true })

            if (error) console.error(error)
            else setStudents(data)
            setLoading(false)

        }

        async function addStudent() {
            if (!name || !roll) {
                alert('Please fill in name and roll number')
                return
            }
        setSaving(true)
        const { error } = await supabase
        .from('students')
        .insert({
            name: name,
            roll_number: parseInt(roll),
            class: className,
            academic_year: 2025
        })

        if (error) {
            console.error(error)
            alert('Error saving student')
        } else {
            setName('')
            setRoll('')
            await loadStudents()
        }

        setSaving(false)
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Students</h1>

            {/* Add Student Form */}
            <div className="bg-gray-100 p-4 rounder-lg mb-6">
                <h2 className="text-lg font-semibold mb-4">Add New Student</h2>

                <div className="flex flex-col gap-3">
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full name"
                        className="border rounded p-2 w-full"
                    />
                    <input
                        value={roll}
                        onChange={(e) => setRoll(e.target.value)}
                        placeholder="Roll number"
                        type="number"
                        className="border rounded p-2 w-full"
                    />
                    <select
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        className="border rounded p-2 w-full"
                    >
                        <option value="KG-1">KG-1</option>
                        <option value="KG-2">KG-2</option>
                        <option value="KG-3">KG-3</option>
                    </select>
                    <button 
                        onClick={addStudent}
                        disabled={saving}
                        className="bg-blue-600 text-white rounded p-2 font-semibold disabled:opacity-50"
                    >
                        {saving ? 'Saving...' : 'Add Student'}     
                    </button>
                </div>
            </div>

            {/* Student List */}
            <div>
                {loading ? (
                    <p className="text-gray-500">Loading...</p>
                ) : (
                    students.map(student => (
                        <div key={student.id} className="flex justify-between items-center p-3 border-b">
                            <span className="font-medium">{student.name}</span>
                            <span className="text-gray-500 text-sm">Roll {student.roll_number}</span>
                            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">{student.class}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}