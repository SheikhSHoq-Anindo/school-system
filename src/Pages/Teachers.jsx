import { useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient'

export default function Teachers() {
    const [teachers, setTeachers] = useState()
    const [loading, setLoading] = useState(true)
    const [name, setName] = useState('')
    const [teacher_id, setTeacher_id] = useState('')
    const [subjects, setSubjects] = useState(null)
    const [className, setClassName] = useState(null)

    useEffect(() => {
        loadTeachers()
    }, [])

    async function loadTeachers() {
        const { data, error } = await supabase
        .from ('students')
        .select('*')        
    
        if (error) console.error(error)
        else setTeachers(data)
        setLoading(false)
    }
}