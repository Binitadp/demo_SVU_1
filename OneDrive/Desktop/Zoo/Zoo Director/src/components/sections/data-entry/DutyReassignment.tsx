import { useState } from 'react';
import { Save, Edit, Trash2, X } from 'lucide-react';

interface DutyReassignmentRecord {
  id: number;
  date: string;
  originalStaff: string;
  newStaff: string;
  zoneCage: string;
  reason: string;
  remarks: string;
}

export function DutyReassignment() {
  const [formData, setFormData] = useState({
    date: '',
    originalStaff: '',
    newStaff: '',
    zoneCage: '',
    reason: '',
    remarks: ''
  });

  const [submittedRecords, setSubmittedRecords] = useState<DutyReassignmentRecord[]>([]);
  const [nextId, setNextId] = useState(1);
  const [editingRecord, setEditingRecord] = useState<DutyReassignmentRecord | null>(null);
  const [editFormData, setEditFormData] = useState<DutyReassignmentRecord | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEditInputChange = (field: keyof DutyReassignmentRecord, value: string) => {
    if (editFormData) {
      setEditFormData({ ...editFormData, [field]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newRecord: DutyReassignmentRecord = {
      id: nextId,
      ...formData
    };
    setSubmittedRecords([...submittedRecords, newRecord]);
    setNextId(nextId + 1);
    alert('Duty Reassignment Form submitted successfully!');

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      date: '',
      originalStaff: '',
      newStaff: '',
      zoneCage: '',
      reason: '',
      remarks: ''
    });
  };

  const handleCancel = () => {
    resetForm();
  };

  const handleEdit = (record: DutyReassignmentRecord) => {
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
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg text-gray-900 mb-6">Duty Reassignment Form</h3>

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
            <label className="block text-gray-700 mb-2">Original Staff</label>
            <input
              type="text"
              value={formData.originalStaff}
              onChange={(e) => handleInputChange('originalStaff', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Enter original staff name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">New Staff</label>
            <input
              type="text"
              value={formData.newStaff}
              onChange={(e) => handleInputChange('newStaff', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Enter new staff name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Zone/Cage</label>
            <input
              type="text"
              value={formData.zoneCage}
              onChange={(e) => handleInputChange('zoneCage', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Enter zone or cage ID"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Reason</label>
            <select
              value={formData.reason}
              onChange={(e) => handleInputChange('reason', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            >
              <option value="">Select Reason</option>
              <option value="Staff Leave">Staff Leave</option>
              <option value="Emergency">Emergency</option>
              <option value="Rotation">Rotation</option>
              <option value="Workload Balance">Workload Balance</option>
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
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Original Staff</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">New Staff</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Zone/Cage</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Reason</th>
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
                    <td className="py-3 px-4 text-gray-900">{record.originalStaff}</td>
                    <td className="py-3 px-4 text-gray-900">{record.newStaff}</td>
                    <td className="py-3 px-4 text-gray-900">{record.zoneCage}</td>
                    <td className="py-3 px-4 text-gray-900">{record.reason}</td>
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
              <h3 className="text-xl text-gray-900">Edit Duty Reassignment Record</h3>
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
                  <label className="block text-gray-700 text-sm font-medium mb-2">Original Staff</label>
                  <input
                    type="text"
                    value={editFormData.originalStaff}
                    onChange={(e) => handleEditInputChange('originalStaff', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">New Staff</label>
                  <input
                    type="text"
                    value={editFormData.newStaff}
                    onChange={(e) => handleEditInputChange('newStaff', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Zone/Cage</label>
                  <input
                    type="text"
                    value={editFormData.zoneCage}
                    onChange={(e) => handleEditInputChange('zoneCage', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Reason</label>
                  <select
                    value={editFormData.reason}
                    onChange={(e) => handleEditInputChange('reason', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="">Select Reason</option>
                    <option value="Staff Leave">Staff Leave</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Rotation">Rotation</option>
                    <option value="Workload Balance">Workload Balance</option>
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
