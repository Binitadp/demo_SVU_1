import { Download, Calendar, ArrowUpDown } from 'lucide-react';
import { useState } from 'react';

type DateRange = 'daily' | 'weekly' | 'monthly' | 'custom';
type SortKey = 'date' | 'name' | 'zone' | 'tasks' | 'rating' | 'compliance';

interface KeeperData {
  date: string;
  name: string;
  zone: string;
  tasks: number;
  rating: number;
  compliance: number;
}

export function KeeperPerformanceReport() {
  const [dateRange, setDateRange] = useState<DateRange>('daily');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const keeperPerformanceData: KeeperData[] = [
    { date: '2025-12-12', name: 'Ramesh Kumar', zone: 'Zone A', tasks: 12, rating: 4.3, compliance: 89 },
    { date: '2025-12-12', name: 'Anil Sharma', zone: 'Zone B', tasks: 10, rating: 4.1, compliance: 82 },
    { date: '2025-12-11', name: 'Vijay Rao', zone: 'Zone C', tasks: 14, rating: 4.6, compliance: 94 },
    { date: '2025-12-10', name: 'Ramesh Kumar', zone: 'Zone A', tasks: 11, rating: 4.4, compliance: 90 },
    { date: '2025-12-09', name: 'Anil Sharma', zone: 'Zone B', tasks: 9, rating: 4.0, compliance: 80 },
    { date: '2025-12-05', name: 'Vijay Rao', zone: 'Zone C', tasks: 13, rating: 4.7, compliance: 96 }
  ];

  const filterByDateRange = (data: KeeperData[]) => {
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

  const sortData = (data: KeeperData[]) => {
    return [...data].sort((a, b) => {
      let aValue: any = a[sortKey];
      let bValue: any = b[sortKey];

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
    const data = sortData(filterByDateRange(keeperPerformanceData));
    const headers = ['Date', 'Keeper Name', 'Zone', 'Tasks Completed', 'Performance Rating', 'Compliance (%)'];
    const csvContent = [
      headers.join(','),
      ...data.map(row =>
        [row.date, row.name, row.zone, row.tasks, row.rating, row.compliance].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `keeper-performance-${dateRange}-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const filteredAndSortedData = sortData(filterByDateRange(keeperPerformanceData));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg text-gray-900">Keeper Performance Report</h3>

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
            <tr className="border-b border-gray-200">
              <th
                className="text-left py-3 px-4 cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center gap-2">
                  Date
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                className="text-left py-3 px-4 cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-2">
                  Keeper Name
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                className="text-left py-3 px-4 cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('zone')}
              >
                <div className="flex items-center gap-2">
                  Zone
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                className="text-left py-3 px-4 cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('tasks')}
              >
                <div className="flex items-center gap-2">
                  Tasks Completed
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                className="text-left py-3 px-4 cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('rating')}
              >
                <div className="flex items-center gap-2">
                  Performance Rating
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                className="text-left py-3 px-4 cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('compliance')}
              >
                <div className="flex items-center gap-2">
                  Compliance (%)
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedData.map((row, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-3 px-4 text-gray-600">{row.date}</td>
                <td className="py-3 px-4">{row.name}</td>
                <td className="py-3 px-4">{row.zone}</td>
                <td className="py-3 px-4">{row.tasks}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-sm">
                    ⭐ {row.rating}
                  </span>
                </td>
                <td className="py-3 px-4">{row.compliance}%</td>
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
