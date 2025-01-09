import React, { useState } from 'react';
import { router } from '@inertiajs/react';

function Index({ employees, query, currentPage, lastPage }) {
    const [search, setSearch] = useState(query || '');
    const [sortColumn, setSortColumn] = useState('emp_no');
    const [sortOrder, setSortOrder] = useState('asc');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('employees', { search });
    };

    const handlePageChange = (page) => {
        router.get('employees', { search, page });
    };

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortOrder('asc');
        }
    };

    const sortedEmployees = [...employees].sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];

        if (aValue < bValue) {
            return sortOrder === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
            return sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
    });

    return (
        <div className="p-6 min-h-screen bg-gradient-to-b from-black to-purple-900 text-white font-sans">
            <h1 className="text-center text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-500">
                🌌 Employee Galaxy 🌌
            </h1>

            <form
                onSubmit={handleSearch}
                className="flex items-center justify-center mb-8"
            >
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border-none p-3 rounded-l-lg w-1/2 text-black placeholder-gray-500 shadow-xl focus:ring-2 focus:ring-indigo-500"
                    placeholder="Search for stars..."
                />
                <button
                    type="submit"
                    className="p-3 rounded-r-lg bg-indigo-600 hover:bg-indigo-800 transition text-white font-semibold shadow-xl"
                >
                    🚀 Search
                </button>
            </form>

            <div className="overflow-x-auto">
                <table className="table-auto w-full bg-gray-800 text-gray-300 border-collapse rounded-lg shadow-2xl">
                    <thead className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white">
                        <tr>
                            <th
                                className="border p-4 cursor-pointer"
                                onClick={() => handleSort('emp_no')}
                            >
                                ID
                                {sortColumn === 'emp_no' && (sortOrder === 'asc' ? ' 🔼' : ' 🔽')}
                            </th>
                            <th
                                className="border p-4 cursor-pointer"
                                onClick={() => handleSort('first_name')}
                            >
                                First Name
                                {sortColumn === 'first_name' && (sortOrder === 'asc' ? ' 🔼' : ' 🔽')}
                            </th>
                            <th
                                className="border p-4 cursor-pointer"
                                onClick={() => handleSort('last_name')}
                            >
                                Last Name
                                {sortColumn === 'last_name' && (sortOrder === 'asc' ? ' 🔼' : ' 🔽')}
                            </th>
                            <th
                                className="border p-4 cursor-pointer"
                                onClick={() => handleSort('gender')}
                            >
                                Gender
                                {sortColumn === 'gender' && (sortOrder === 'asc' ? ' 🔼' : ' 🔽')}
                            </th>
                            <th className="border p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedEmployees.length > 0 ? (
                            sortedEmployees.map((employee, index) => (
                                <tr
                                    key={index}
                                    className={`cursor-pointer ${
                                        index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-800'
                                    } hover:bg-purple-700 transition`}
                                >
                                    <td className="border p-4 text-center">{employee.emp_no}</td>
                                    <td className="border p-4">{employee.first_name}</td>
                                    <td className="border p-4">{employee.last_name}</td>
                                    <td className="border p-4 text-center">
                                        {employee.gender === 'M' ? 'Male' : 'Female'}
                                    </td>
                                    <td className="border p-4 text-center">
                                        <button className="bg-gray-400 text-black px-4 py-2 rounded-lg shadow hover:bg-yellow-500 mr-2">
                                            Edit
                                        </button>
                                        <button className="bg-purple-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center p-6 text-gray-500">
                                    No employees found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="mt-6 flex justify-center space-x-4">
                <button
                    className={`p-3 px-6 rounded-lg ${
                        currentPage === 1
                            ? 'bg-gray-600 cursor-not-allowed'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    } transition`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    🌠 Previous
                </button>
                <div className="px-4 py-2 bg-gray-900 text-indigo-400 rounded-lg shadow">
                    Page {currentPage} of {lastPage}
                </div>
                <button
                    className={`p-3 px-6 rounded-lg ${
                        currentPage === lastPage
                            ? 'bg-gray-600 cursor-not-allowed'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    } transition`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === lastPage}
                >
                    Next 🌌
                </button>
            </div>
        </div>
    );
}

export default Index;
