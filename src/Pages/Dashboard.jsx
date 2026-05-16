export default function Dashboard() {
    return(
        <div>
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Total Students</p>
                    <p className="text-3xl font-bold text-blue-600">-</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Total Teachers</p>
                    <p className="text-3xl font-bold text-blue-600">-</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Classes</p>
                    <p className="text-3xl font-bold text-blue-600">-</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Exams</p>
                    <p className="text-3xl font-bold text-blue-600">-</p>
                </div>
            </div>                              
        </div>
    )
}