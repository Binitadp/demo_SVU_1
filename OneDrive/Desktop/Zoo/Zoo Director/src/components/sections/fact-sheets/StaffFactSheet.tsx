import { Search, Eye, Edit } from 'lucide-react';
import { useState } from 'react';

export function StaffFactSheet() {
  const [searchTerm, setSearchTerm] = useState('');

  const staffData = [
    {
      id: 'S-001',
      name: 'Ramesh Kumar',
      role: 'Keeper',
      zoneCoverage: 'Zone A, B',
      performanceRating: 4.5,
      attendanceRate: '95%',
      contactNumber: '+91 98765 11111',
      dateJoined: '2018-05-12'
    },
    {
      id: 'S-002',
      name: 'Priya Singh',
      role: 'Dietician',
      zoneCoverage: 'All Zones',
      performanceRating: 4.8,
      attendanceRate: '98%',
      contactNumber: '+91 98765 22222',
      dateJoined: '2020-03-20'
    },
    {
      id: 'S-003',
      name: 'Anil Sharma',
      role: 'Keeper',
      zoneCoverage: 'Zone C, D',
      performanceRating: 4.2,
      attendanceRate: '92%',
      contactNumber: '+91 98765 33333',
      dateJoined: '2019-08-15'
    }
  ];

  return (
    <div>
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg text-gray-900">Staff Fact Sheet</h3>
        </div>
        <div className="p-6">
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search staff..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div className="space-y-4">
            {staffData.map((staff) => (
              <div key={staff.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg text-gray-900">{staff.name}</h4>
                    <p className="text-gray-600">{staff.role} | ID: {staff.id}</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    ⭐ {staff.performanceRating}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-gray-500 text-sm">Zone Coverage</p>
                    <p className="text-gray-900">{staff.zoneCoverage}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Attendance Rate</p>
                    <p className="text-gray-900">{staff.attendanceRate}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Contact Number</p>
                    <p className="text-gray-900">{staff.contactNumber}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-500 text-sm">Date Joined</p>
                  <p className="text-gray-900">{staff.dateJoined}</p>
                </div>

                <div className="flex gap-2">
                  <button className="px-3 py-1.5 bg-white border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-2 text-sm">
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  <button className="px-3 py-1.5 bg-white border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-2 text-sm">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
