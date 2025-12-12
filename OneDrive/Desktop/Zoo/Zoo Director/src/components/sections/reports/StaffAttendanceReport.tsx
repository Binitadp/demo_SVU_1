import { Download, Calendar, ArrowUpDown } from 'lucide-react';
import { useState } from 'react';

type DateRange = 'daily' | 'weekly' | 'monthly' | 'custom';
type SortKey = 'date' | 'name' | 'role' | 'status';

interface StaffData {
  date: string;
  name: string;
  role: string;
  status: string;
  leaveType: string;
  substitute: string;
}

export function StaffAttendanceReport() {
  const [dateRange, setDateRange] = useState<DateRange>('daily');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Sample data with dates
  const staffAttendanceData: StaffData[] = [
    { date: '2025-12-12', name: 'Ramesh Kumar', role: 'Keeper', status: 'Present', leaveType: '-', substitute: '-' },
    { date: '2025-12-12', name: 'Priya Singh', role: 'Dietician', status: 'Present', leaveType: '-', substitute: '-' },
    { date: '2025-12-12', name: 'Anil Sharma', role: 'Keeper', status: 'Absent', leaveType: 'Sick Leave', substitute: 'Vijay Rao' },
    { date: '2025-12-11', name: 'Sunita Patel', role: 'Vet Assistant', status: 'Present', leaveType: '-', substitute: '-' },
    { date: '2025-12-11', name: 'Rakesh Gupta', role: 'Supervisor', status: 'Present', leaveType: '-', substitute: '-' },
    { date: '2025-12-10', name: 'Ramesh Kumar', role: 'Keeper', status: 'Present', leaveType: '-', substitute: '-' },
    { date: '2025-12-09', name: 'Priya Singh', role: 'Dietician', status: 'Absent', leaveType: 'Casual Leave', substitute: 'Meera Shah' },
    { date: '2025-12-05', name: 'Anil Sharma', role: 'Keeper', status: 'Present', leaveType: '-', substitute: '-' }
  ];

  const filterByDateRange = (data: StaffData[]) => {
    const today = new Date('2025-12-12');

    switch (dateRange) {
      case 'daily':
        return data.filter(item => item.date === '2025-12-12');
      case 'weekly':
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        return data.filter(item => new Date(item.date) >= weekAgo);
      case 'monthly':
        const monthAgo = new Date(today);
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        return data.filter(item => new Date(item.date) >= monthAgo);
      case 'custom':
        if (!customStartDate || !customEndDate) return data;
        return data.filter(item =>
          item.date >= customStartDate && item.date <= customEndDate
        );
      default:
        return data;
    }
  };

  const sortData = (data: StaffData[]) => {
    return [...data].sort((a, b) => {
      let aValue = a[sortKey];
      let bValue = b[sortKey];

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const exportToCSV = () => {
    const data = sortData(filterByDateRange(staffAttendanceData));
    const headers = ['Date', 'Staff Name', 'Role', 'Status', 'Leave Type', 'Substitute'];
    const csvContent = [
      headers.join(','),
      ...data.map(row =>
        [row.date, row.name, row.role, row.status, row.leaveType, row.substitute].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `staff-attendance-${dateRange}-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const filteredAndSortedData = sortData(filterByDateRange(staffAttendanceData));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg text-gray-900">Staff Attendance Report</h3>

        {/* Date Filter and Export */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-2 border border-gray-200">
            <Calendar className="w-4 h-4 text-gray-600" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as DateRange)}
              className="bg-transparent outline-none text-sm"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Custom Date Range Picker */}
      {dateRange === 'custom' && (
        <div className="mb-4 flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <label className="text-sm text-gray-700">From:</label>
          <input
            type="date"
            value={customStartDate}
            onChange={(e) => setCustomStartDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded"
          />
          <label className="text-sm text-gray-700">To:</label>
          <input
            type="date"
            value={customEndDate}
            onChange={(e) => setCustomEndDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded"
          />
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-300">
              <th
                className="text-left py-3 px-4 cursor-pointer hover:bg-blue-300 bg-blue-200 transition-colors font-semibold"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center gap-2">
                  Date
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                className="text-left py-3 px-4 cursor-pointer hover:bg-blue-300 bg-blue-200 transition-colors font-semibold"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-2">
                  Staff Name
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                className="text-left py-3 px-4 cursor-pointer hover:bg-blue-300 bg-blue-200 transition-colors font-semibold"
                onClick={() => handleSort('role')}
              >
                <div className="flex items-center gap-2">
                  Role
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                className="text-left py-3 px-4 cursor-pointer hover:bg-blue-300 bg-blue-200 transition-colors font-semibold"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center gap-2">
                  Status
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="text-left py-3 px-4 bg-blue-200 font-semibold">Leave Type</th>
              <th className="text-left py-3 px-4 bg-blue-200 font-semibold">Substitute</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedData.map((row, index) => (
              <tr
                key={index}
                className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-blue-50' : 'bg-blue-100'
                  } hover:bg-blue-150 transition-colors`}
              >
                <td className="py-3 px-4 text-gray-700">{row.date}</td>
                <td className="py-3 px-4">{row.name}</td>
                <td className="py-3 px-4">{row.role}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-sm ${row.status === 'Present' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                    {row.status}
                  </span>
                </td>
                <td className="py-3 px-4">{row.leaveType}</td>
                <td className="py-3 px-4">{row.substitute}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        Showing {filteredAndSortedData.length} records
      </div>
    </div>
  );
}
