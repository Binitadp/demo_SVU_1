import { Search, Eye, Edit } from 'lucide-react';
import { useState } from 'react';

export function SupervisorFactSheet() {
  const [searchTerm, setSearchTerm] = useState('');

  const supervisorData = [
    {
      id: 'SUP-001',
      name: 'Rakesh Gupta',
      zoneCoverage: 'Zone A, B',
      performanceRating: 4.5,
      checksCompleted: 145,
      feedbackScore: 85,
      contactNumber: '+91 98765 44444',
      dateJoined: '2017-02-10'
    },
    {
      id: 'SUP-002',
      name: 'Meena Desai',
      zoneCoverage: 'Zone C, D',
      performanceRating: 4.2,
      checksCompleted: 132,
      feedbackScore: 78,
      contactNumber: '+91 98765 55555',
      dateJoined: '2018-06-15'
    },
    {
      id: 'SUP-003',
      name: 'Suresh Reddy',
      zoneCoverage: 'Zone E, F',
      performanceRating: 4.7,
      checksCompleted: 158,
      feedbackScore: 92,
      contactNumber: '+91 98765 66666',
      dateJoined: '2016-11-20'
    }
  ];

  return (
    <div>
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg text-gray-900">Supervisor Fact Sheet</h3>
        </div>
        <div className="p-6">
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search supervisors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div className="space-y-4">
            {supervisorData.map((supervisor) => (
              <div key={supervisor.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg text-gray-900">{supervisor.name}</h4>
                    <p className="text-gray-600">Supervisor | ID: {supervisor.id}</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    ⭐ {supervisor.performanceRating}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-gray-500 text-sm">Zone Coverage</p>
                    <p className="text-gray-900">{supervisor.zoneCoverage}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Checks Completed</p>
                    <p className="text-gray-900">{supervisor.checksCompleted}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Feedback Score</p>
                    <p className="text-gray-900">{supervisor.feedbackScore}%</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-500 text-sm">Contact Number</p>
                  <p className="text-gray-900">{supervisor.contactNumber}</p>
                </div>

                <div className="mb-4">
                  <p className="text-gray-500 text-sm">Date Joined</p>
                  <p className="text-gray-900">{supervisor.dateJoined}</p>
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
