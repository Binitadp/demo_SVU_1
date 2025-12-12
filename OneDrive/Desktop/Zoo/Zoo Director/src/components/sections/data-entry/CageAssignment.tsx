import { useState } from 'react';
import { Save, Edit, Trash2, X } from 'lucide-react';

interface CageAssignmentRecord {
  id: number;
  date: string;
  cageId: string;
  speciesAssigned: string;
  infrastructureStatus: string;
  remarks: string;
}

export function CageAssignment() {
  const [formData, setFormData] = useState({
    date: '',
    cageId: '',
    speciesAssigned: '',
    infrastructureStatus: '',
    remarks: ''
  });

  const [submittedRecords, setSubmittedRecords] = useState<CageAssignmentRecord[]>([]);
  const [nextId, setNextId] = useState(1);
  const [editingRecord, setEditingRecord] = useState<CageAssignmentRecord | null>(null);
  const [editFormData, setEditFormData] = useState<CageAssignmentRecord | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEditInputChange = (field: keyof CageAssignmentRecord, value: string) => {
    if (editFormData) {
      setEditFormData({ ...editFormData, [field]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newRecord: CageAssignmentRecord = {
      id: nextId,
      ...formData
    };
    setSubmittedRecords([...submittedRecords, newRecord]);
    setNextId(nextId + 1);
    alert('Cage Assignment Form submitted successfully!');

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      date: '',
      cageId: '',
      speciesAssigned: '',
      infrastructureStatus: '',
      remarks: ''
    });
  };

  const handleCancel = () => {
    resetForm();
  };

  const handleEdit = (record: CageAssignmentRecord) => {
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
        <h3 className="text-lg text-gray-900 mb-6">Cage Assignment Form</h3>

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
            <label className="block text-gray-700 mb-2">Cage ID</label>
            <input
              type="text"
              value={formData.cageId}
              onChange={(e) => handleInputChange('cageId', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Enter cage ID (e.g., C-01)"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Species Assigned</label>
            <input
              type="text"
              value={formData.speciesAssigned}
              onChange={(e) => handleInputChange('speciesAssigned', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Enter species"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Infrastructure Status</label>
            <select
              value={formData.infrastructureStatus}
              onChange={(e) => handleInputChange('infrastructureStatus', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            >
              <option value="">Select Status</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Needs Repair">Needs Repair</option>
              <option value="Under Maintenance">Under Maintenance</option>
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
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Cage ID</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Species</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Status</th>
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
                    <td className="py-3 px-4 text-gray-900">{record.cageId}</td>
                    <td className="py-3 px-4 text-gray-900">{record.speciesAssigned}</td>
                    <td className="py-3 px-4 text-gray-900">{record.infrastructureStatus}</td>
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
              <h3 className="text-xl text-gray-900">Edit Cage Assignment Record</h3>
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
                  <label className="block text-gray-700 text-sm font-medium mb-2">Cage ID</label>
                  <input
                    type="text"
                    value={editFormData.cageId}
                    onChange={(e) => handleEditInputChange('cageId', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Species Assigned</label>
                  <input
                    type="text"
                    value={editFormData.speciesAssigned}
                    onChange={(e) => handleEditInputChange('speciesAssigned', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Infrastructure Status</label>
                  <select
                    value={editFormData.infrastructureStatus}
                    onChange={(e) => handleEditInputChange('infrastructureStatus', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="">Select Status</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Needs Repair">Needs Repair</option>
                    <option value="Under Maintenance">Under Maintenance</option>
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
