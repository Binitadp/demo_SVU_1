import { useState } from 'react';
import { Save, Edit, Trash2, X } from 'lucide-react';

interface LeaveSanctionRecord {
  id: number;
  staffName: string;
  role: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  substituteAssigned: string;
  remarks: string;
}

export function LeaveSanction() {
  const [formData, setFormData] = useState({
    staffName: '',
    role: '',
    leaveType: '',
    startDate: '',
    endDate: '',
    substituteAssigned: '',
    remarks: ''
  });

  const [submittedRecords, setSubmittedRecords] = useState<LeaveSanctionRecord[]>([]);
  const [nextId, setNextId] = useState(1);
  const [editingRecord, setEditingRecord] = useState<LeaveSanctionRecord | null>(null);
  const [editFormData, setEditFormData] = useState<LeaveSanctionRecord | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEditInputChange = (field: keyof LeaveSanctionRecord, value: string) => {
    if (editFormData) {
      setEditFormData({ ...editFormData, [field]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newRecord: LeaveSanctionRecord = {
      id: nextId,
      ...formData
    };
    setSubmittedRecords([...submittedRecords, newRecord]);
    setNextId(nextId + 1);
    alert('Leave Sanction Form submitted successfully!');

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      staffName: '',
      role: '',
      leaveType: '',
      startDate: '',
      endDate: '',
      substituteAssigned: '',
      remarks: ''
    });
  };

  const handleCancel = () => {
    resetForm();
  };

  const handleEdit = (record: LeaveSanctionRecord) => {
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
        <h3 className="text-lg text-gray-900 mb-6">Leave Sanction Form</h3>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">Staff Name</label>
            <input
              type="text"
              value={formData.staffName}
              onChange={(e) => handleInputChange('staffName', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Enter staff name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Role</label>
            <select
              value={formData.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            >
              <option value="">Select Role</option>
              <option value="Keeper">Keeper</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Dietician">Dietician</option>
              <option value="Vet Assistant">Vet Assistant</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Leave Type</label>
            <select
              value={formData.leaveType}
              onChange={(e) => handleInputChange('leaveType', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            >
              <option value="">Select Leave Type</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Earned Leave">Earned Leave</option>
              <option value="Emergency Leave">Emergency Leave</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => handleInputChange('startDate', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => handleInputChange('endDate', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Substitute Assigned</label>
            <input
              type="text"
              value={formData.substituteAssigned}
              onChange={(e) => handleInputChange('substituteAssigned', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Enter substitute name"
              required
            />
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
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Staff Name</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Role</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Leave Type</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Period</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Substitute</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {submittedRecords.map((record) => (
                  <tr
                    key={record.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 text-gray-900">{record.staffName}</td>
                    <td className="py-3 px-4 text-gray-900">{record.role}</td>
                    <td className="py-3 px-4">
                      <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">
                        {record.leaveType}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-900">
                      {record.startDate} to {record.endDate}
                    </td>
                    <td className="py-3 px-4 text-gray-900">{record.substituteAssigned}</td>
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
              <h3 className="text-xl text-gray-900">Edit Leave Sanction Record</h3>
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
                  <label className="block text-gray-700 text-sm font-medium mb-2">Staff Name</label>
                  <input
                    type="text"
                    value={editFormData.staffName}
                    onChange={(e) => handleEditInputChange('staffName', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Role</label>
                  <select
                    value={editFormData.role}
                    onChange={(e) => handleEditInputChange('role', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="">Select Role</option>
                    <option value="Keeper">Keeper</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="Dietician">Dietician</option>
                    <option value="Vet Assistant">Vet Assistant</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Leave Type</label>
                  <select
                    value={editFormData.leaveType}
                    onChange={(e) => handleEditInputChange('leaveType', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="">Select Leave Type</option>
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Casual Leave">Casual Leave</option>
                    <option value="Earned Leave">Earned Leave</option>
                    <option value="Emergency Leave">Emergency Leave</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Start Date</label>
                  <input
                    type="date"
                    value={editFormData.startDate}
                    onChange={(e) => handleEditInputChange('startDate', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">End Date</label>
                  <input
                    type="date"
                    value={editFormData.endDate}
                    onChange={(e) => handleEditInputChange('endDate', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Substitute Assigned</label>
                  <input
                    type="text"
                    value={editFormData.substituteAssigned}
                    onChange={(e) => handleEditInputChange('substituteAssigned', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
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
