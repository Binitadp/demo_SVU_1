import { Search, Eye, Edit } from 'lucide-react';
import { useState } from 'react';

export function BirdFactSheet() {
  const [searchTerm, setSearchTerm] = useState('');

  const birdData = [
    {
      id: 'B-001',
      species: 'Peacock',
      wingTag: 'WT-1234',
      age: '2 years',
      gender: 'Male',
      healthStatus: 'Good',
      movementHistory: 'Transferred from Delhi Zoo - 2023',
      aviaryAssignment: 'A-05'
    },
    {
      id: 'B-002',
      species: 'Macaw',
      wingTag: 'WT-5678',
      age: '4 years',
      gender: 'Female',
      healthStatus: 'Fair - Under observation',
      movementHistory: 'Born in Alipore Zoo',
      aviaryAssignment: 'A-12'
    },
    {
      id: 'B-003',
      species: 'Eagle',
      wingTag: 'WT-9012',
      age: '6 years',
      gender: 'Male',
      healthStatus: 'Good',
      movementHistory: 'Rescued - 2019',
      aviaryAssignment: 'A-08'
    }
  ];

  return (
    <div>
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg text-gray-900">Bird Fact Sheet</h3>
        </div>
        <div className="p-6">
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search birds..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div className="space-y-4">
            {birdData.map((bird) => (
              <div key={bird.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg text-gray-900">{bird.species}</h4>
                    <p className="text-gray-600">ID: {bird.id} | Wing Tag: {bird.wingTag}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    Active
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-gray-500 text-sm">Age</p>
                    <p className="text-gray-900">{bird.age}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Gender</p>
                    <p className="text-gray-900">{bird.gender}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Aviary Assignment</p>
                    <p className="text-gray-900">{bird.aviaryAssignment}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-500 text-sm">Health Status</p>
                  <p className="text-gray-900">{bird.healthStatus}</p>
                </div>

                <div className="mb-4">
                  <p className="text-gray-500 text-sm">Movement History</p>
                  <p className="text-gray-900">{bird.movementHistory}</p>
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
