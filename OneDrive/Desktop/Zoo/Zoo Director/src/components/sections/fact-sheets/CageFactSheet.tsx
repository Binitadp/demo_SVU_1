import { Search, Eye, Edit } from 'lucide-react';
import { useState } from 'react';

export function CageFactSheet() {
  const [searchTerm, setSearchTerm] = useState('');

  const cageData = [
    {
      id: 'C-01',
      dimensions: '20m x 15m',
      type: 'Carnivore Enclosure',
      speciesHoused: 'Bengal Tiger',
      capacity: '2 animals',
      maintenanceLogs: 'Last cleaned: 09-Dec-2025, Next scheduled: 16-Dec-2025',
      condition: 'Excellent'
    },
    {
      id: 'C-12',
      dimensions: '15m x 10m',
      type: 'Reptile House',
      speciesHoused: 'Python, Cobra',
      capacity: '5 animals',
      maintenanceLogs: 'Last cleaned: 08-Dec-2025, Maintenance overdue',
      condition: 'Fair'
    },
    {
      id: 'C-23',
      dimensions: '30m x 25m',
      type: 'Large Mammal Enclosure',
      speciesHoused: 'Asian Elephant',
      capacity: '3 animals',
      maintenanceLogs: 'Last cleaned: 10-Dec-2025, Next scheduled: 17-Dec-2025',
      condition: 'Good'
    }
  ];

  return (
    <div>
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg text-gray-900">Cage Fact Sheet</h3>
        </div>
        <div className="p-6">
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search cages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div className="space-y-4">
            {cageData.map((cage) => (
              <div key={cage.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg text-gray-900">Cage {cage.id}</h4>
                    <p className="text-gray-600">{cage.type}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    cage.condition === 'Excellent' ? 'bg-green-100 text-green-700' :
                    cage.condition === 'Good' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {cage.condition}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-gray-500 text-sm">Dimensions</p>
                    <p className="text-gray-900">{cage.dimensions}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Species Housed</p>
                    <p className="text-gray-900">{cage.speciesHoused}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Capacity</p>
                    <p className="text-gray-900">{cage.capacity}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-500 text-sm">Maintenance Logs</p>
                  <p className="text-gray-900">{cage.maintenanceLogs}</p>
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
