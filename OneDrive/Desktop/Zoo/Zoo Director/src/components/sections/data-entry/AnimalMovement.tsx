import { useState } from 'react';
import { Save, Edit, Trash2, X } from 'lucide-react';

interface MovementRecord {
  id: number;
  date: string;
  species: string;
  movementType: string;
  sourceDestination: string;
  quarantineStatus: string;
  documents: string;
  remarks: string;
}

export function AnimalMovement() {
  const [formData, setFormData] = useState({
    date: '',
    species: '',
    movementType: '',
    sourceDestination: '',
    quarantineStatus: '',
    documents: '',
    remarks: ''
  });

  const [submittedRecords, setSubmittedRecords] = useState<MovementRecord[]>([]);
  const [nextId, setNextId] = useState(1);
  const [editingRecord, setEditingRecord] = useState<MovementRecord | null>(null);
  const [editFormData, setEditFormData] = useState<MovementRecord | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEditInputChange = (field: keyof MovementRecord, value: string) => {
    if (editFormData) {
      setEditFormData({ ...editFormData, [field]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Add new record
    const newRecord: MovementRecord = {
      id: nextId,
      ...formData
    };
    setSubmittedRecords([...submittedRecords, newRecord]);
    setNextId(nextId + 1);
    alert('Animal/Bird Movement Form submitted successfully!');

    // Reset form
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      date: '',
      species: '',
      movementType: '',
      sourceDestination: '',
      quarantineStatus: '',
      documents: '',
      remarks: ''
    });
  };

  const handleCancel = () => {
    resetForm();
  };

  const handleEdit = (record: MovementRecord) => {
    setEditingRecord(record);
    setEditFormData({ ...record });
  };

  const handleSaveEdit = () => {
    if (editFormData) {
      setSubmittedRecords(submittedRecords.map(record =>
        record.id === editFormData.id ? editFormData : record
      ));
      setEditingRecord(null);
      setEditFormData(null);
      alert('Record updated successfully!');
    }
  };

  const handleCancelEdit = () => {
    setEditingRecord(null);
    setEditFormData(null);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this record?')) {
      setSubmittedRecords(submittedRecords.filter(record => record.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Form Section */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg text-gray-900 mb-6">Animal/Bird Movement Form</h3>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Species</label>
            <input
              type="text"
              value={formData.species}
              onChange={(e) => handleInputChange('species', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Enter species name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Type</label>
            <select
              value={formData.movementType}
              onChange={(e) => handleInputChange('movementType', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            >
              <option value="">Select Type</option>
              <option value="Inward">Inward</option>
              <option value="Outward">Outward</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Source/Destination Zoo</label>
            <input
              type="text"
              value={formData.sourceDestination}
              onChange={(e) => handleInputChange('sourceDestination', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Enter zoo name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Quarantine Status</label>
            <select
              value={formData.quarantineStatus}
              onChange={(e) => handleInputChange('quarantineStatus', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            >
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
              <option value="Not Required">Not Required</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Documents</label>
            <select
              value={formData.documents}
              onChange={(e) => handleInputChange('documents', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            >
              <option value="">Select Status</option>
              <option value="Complete">Complete</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 mb-2">Remarks</label>
            <textarea
              value={formData.remarks}
              onChange={(e) => handleInputChange('remarks', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              rows={3}
              placeholder="Enter any remarks"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors"
          >
            <Save className="w-4 h-4" />
            Submit
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Submitted Records Table */}
      {submittedRecords.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg text-gray-900 mb-4">Submitted Records</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Date</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Species</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Type</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Source/Destination</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Quarantine</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Documents</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {submittedRecords.map((record) => (
                  <tr
                    key={record.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 text-gray-900">{record.date}</td>
                    <td className="py-3 px-4 text-gray-900">{record.species}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs ${record.movementType === 'Inward'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-orange-100 text-orange-700'
                        }`}>
                        {record.movementType}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-900">{record.sourceDestination}</td>
                    <td className="py-3 px-4 text-gray-900">{record.quarantineStatus}</td>
                    <td className="py-3 px-4 text-gray-900">{record.documents}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(record)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(record.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingRecord && editFormData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
              <h3 className="text-xl text-gray-900">Edit Movement Record</h3>
              <button
                onClick={handleCancelEdit}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Date</label>
                  <input
                    type="date"
                    value={editFormData.date}
                    onChange={(e) => handleEditInputChange('date', e.target.value)}
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
                  <label className="block text-gray-700 text-sm font-medium mb-2">Type</label>
                  <select
                    value={editFormData.movementType}
                    onChange={(e) => handleEditInputChange('movementType', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="">Select Type</option>
                    <option value="Inward">Inward</option>
                    <option value="Outward">Outward</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Source/Destination Zoo</label>
                  <input
                    type="text"
                    value={editFormData.sourceDestination}
                    onChange={(e) => handleEditInputChange('sourceDestination', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Quarantine Status</label>
                  <select
                    value={editFormData.quarantineStatus}
                    onChange={(e) => handleEditInputChange('quarantineStatus', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="">Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                    <option value="Not Required">Not Required</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Documents</label>
                  <select
                    value={editFormData.documents}
                    onChange={(e) => handleEditInputChange('documents', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="">Select Status</option>
                    <option value="Complete">Complete</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Remarks</label>
                  <textarea
                    value={editFormData.remarks}
                    onChange={(e) => handleEditInputChange('remarks', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    rows={3}
                  />
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
        </div>
      )}
    </div>
  );
}
