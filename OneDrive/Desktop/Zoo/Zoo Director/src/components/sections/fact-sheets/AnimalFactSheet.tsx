import { Search, Eye, Edit, X, Save } from 'lucide-react';
import { useState } from 'react';
import { createPortal } from 'react-dom';

interface Animal {
  id: string;
  species: string;
  name: string;
  age: string;
  gender: string;
  healthHistory: string;
  cageAssignment: string;
  dateArrived: string;
}

export function AnimalFactSheet() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewingAnimal, setViewingAnimal] = useState<Animal | null>(null);
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);
  const [editFormData, setEditFormData] = useState<Animal | null>(null);

  const [animalData, setAnimalData] = useState<Animal[]>([
    {
      id: 'A-001',
      species: 'Bengal Tiger',
      name: 'Raja',
      age: '5 years',
      gender: 'Male',
      healthHistory: 'Vaccinated, Minor injury treated in Aug 2025',
      cageAssignment: 'C-01',
      dateArrived: '2020-03-15'
    },
    {
      id: 'A-002',
      species: 'Asian Elephant',
      name: 'Ganesha',
      age: '12 years',
      gender: 'Male',
      healthHistory: 'Regular checkups, Dental treatment in progress',
      cageAssignment: 'C-23',
      dateArrived: '2018-07-22'
    },
    {
      id: 'A-003',
      species: 'White Tiger',
      name: 'Shera',
      age: '3 years',
      gender: 'Female',
      healthHistory: 'Recently transferred, Quarantine completed',
      cageAssignment: 'C-02',
      dateArrived: '2025-12-05'
    }
  ]);

  const filteredAnimals = animalData.filter(animal =>
    animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    animal.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
    animal.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (animal: Animal) => {
    setViewingAnimal(animal);
  };

  const handleEdit = (animal: Animal) => {
    console.log('Edit clicked for animal:', animal);
    setEditingAnimal(animal);
    setEditFormData({ ...animal });
    console.log('Modal should now be visible');
  };

  const handleSaveEdit = () => {
    if (editFormData) {
      setAnimalData(animalData.map(animal =>
        animal.id === editFormData.id ? editFormData : animal
      ));
      setEditingAnimal(null);
      setEditFormData(null);
      alert('Animal data updated successfully!');
    }
  };

  const handleCancelEdit = () => {
    setEditingAnimal(null);
    setEditFormData(null);
  };

  const handleEditInputChange = (field: keyof Animal, value: string) => {
    if (editFormData) {
      setEditFormData({ ...editFormData, [field]: value });
    }
  };

  return (
    <div className="relative">
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg text-gray-900">Animal Fact Sheet</h3>
        </div>
        <div className="p-6">
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search animals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {filteredAnimals.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No animals found matching your search.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAnimals.map((animal) => (
                <div key={animal.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg text-gray-900">{animal.name}</h4>
                      <p className="text-gray-600">{animal.species} | ID: {animal.id}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      Active
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-gray-500 text-sm">Age</p>
                      <p className="text-gray-900">{animal.age}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Gender</p>
                      <p className="text-gray-900">{animal.gender}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Cage Assignment</p>
                      <p className="text-gray-900">{animal.cageAssignment}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-500 text-sm">Health History</p>
                    <p className="text-gray-900">{animal.healthHistory}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-500 text-sm">Date Arrived</p>
                    <p className="text-gray-900">{animal.dateArrived}</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewDetails(animal)}
                      className="px-3 py-1.5 bg-white border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-2 text-sm transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                    <button
                      onClick={() => handleEdit(animal)}
                      className="px-3 py-1.5 bg-blue-500 text-white border border-blue-500 rounded hover:bg-blue-600 flex items-center gap-2 text-sm transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* View Details Modal */}
      {viewingAnimal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
              <h3 className="text-xl text-gray-900">Animal Details</h3>
              <button
                onClick={() => setViewingAnimal(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">Animal ID</p>
                    <p className="text-gray-900">{viewingAnimal.id}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">Name</p>
                    <p className="text-gray-900">{viewingAnimal.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">Species</p>
                    <p className="text-gray-900">{viewingAnimal.species}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">Age</p>
                    <p className="text-gray-900">{viewingAnimal.age}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">Gender</p>
                    <p className="text-gray-900">{viewingAnimal.gender}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">Cage Assignment</p>
                    <p className="text-gray-900">{viewingAnimal.cageAssignment}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">Date Arrived</p>
                    <p className="text-gray-900">{viewingAnimal.dateArrived}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">Status</p>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Active</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">Health History</p>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded">{viewingAnimal.healthHistory}</p>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setViewingAnimal(null)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingAnimal && editFormData && createPortal(
        <>
          {/* Backdrop */}
          <div
            className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50"
            style={{
              position: 'fixed',
              zIndex: 9998,
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}
            onClick={handleCancelEdit}
          />
          {/* Centered Modal */}
          <div
            className="bg-white shadow-2xl overflow-y-auto rounded-lg"
            style={{
              position: 'fixed',
              zIndex: 9999,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '600px',
              maxWidth: '90vw',
              maxHeight: '85vh'
            }}
          >
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
              <h3 className="text-xl text-gray-900">Edit Animal Information</h3>
              <button
                onClick={handleCancelEdit}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Animal ID</label>
                    <input
                      type="text"
                      value={editFormData.id}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      value={editFormData.name}
                      onChange={(e) => handleEditInputChange('name', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Species</label>
                    <input
                      type="text"
                      value={editFormData.species}
                      onChange={(e) => handleEditInputChange('species', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Age</label>
                    <input
                      type="text"
                      value={editFormData.age}
                      onChange={(e) => handleEditInputChange('age', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Gender</label>
                    <select
                      value={editFormData.gender}
                      onChange={(e) => handleEditInputChange('gender', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Cage Assignment</label>
                    <input
                      type="text"
                      value={editFormData.cageAssignment}
                      onChange={(e) => handleEditInputChange('cageAssignment', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Date Arrived</label>
                    <input
                      type="date"
                      value={editFormData.dateArrived}
                      onChange={(e) => handleEditInputChange('dateArrived', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Health History</label>
                    <textarea
                      value={editFormData.healthHistory}
                      onChange={(e) => handleEditInputChange('healthHistory', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </>,
        document.body
      )}
    </div>
  );
}
