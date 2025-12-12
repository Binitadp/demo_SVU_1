import { Download, Calendar, ArrowUpDown } from 'lucide-react';
import { useState } from 'react';

type DateRange = 'daily' | 'weekly' | 'monthly' | 'custom';
type SortKey = 'date' | 'cageId' | 'condition' | 'maintenance' | 'safetyAudit';

interface CageData {
  date: string;
  cageId: string;
  condition: string;
  maintenance: string;
  safetyAudit: string;
}

export function CageInfrastructureReport() {
  const [dateRange, setDateRange] = useState<DateRange>('daily');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const cageInfrastructureData: CageData[] = [
    { date: '2025-12-12', cageId: 'C-01', condition: 'Excellent', maintenance: 'Completed', safetyAudit: 'Pass' },
    { date: '2025-12-12', cageId: 'C-12', condition: 'Fair', maintenance: 'Overdue', safetyAudit: 'Pending' },
    { date: '2025-12-11', cageId: 'C-23', condition: 'Good', maintenance: 'Scheduled', safetyAudit: 'Pass' },
    { date: '2025-12-10', cageId: 'C-45', condition: 'Poor', maintenance: 'Urgent', safetyAudit: 'Fail' },
    { date: '2025-12-09', cageId: 'C-08', condition: 'Excellent', maintenance: 'Completed', safetyAudit: 'Pass' },
    { date: '2025-12-05', cageId: 'C-15', condition: 'Good', maintenance: 'Scheduled', safetyAudit: 'Pass' }
  ];

  const filterByDateRange = (data: CageData[]) => {
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

  const sortData = (data: CageData[]) => {
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
    const data = sortData(filterByDateRange(cageInfrastructureData));
    const headers = ['Date', 'Cage ID', 'Condition', 'Maintenance', 'Safety Audit'];
    const csvContent = [
      headers.join(','),
      ...data.map(row =>
        [row.date, row.cageId, row.condition, row.maintenance, row.safetyAudit].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cage-infrastructure-${dateRange}-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const filteredAndSortedData = sortData(filterByDateRange(cageInfrastructureData));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg text-gray-900">Cage Infrastructure Report</h3>

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
                onClick={() => handleSort('cageId')}
              >
                <div className="flex items-center gap-2">
                  Cage ID
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                className="text-left py-3 px-4 cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('condition')}
              >
                <div className="flex items-center gap-2">
                  Condition
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                className="text-left py-3 px-4 cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('maintenance')}
              >
                <div className="flex items-center gap-2">
                  Maintenance
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                className="text-left py-3 px-4 cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('safetyAudit')}
              >
                <div className="flex items-center gap-2">
                  Safety Audit
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedData.map((row, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-3 px-4 text-gray-600">{row.date}</td>
                <td className="py-3 px-4">{row.cageId}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-sm ${row.condition === 'Excellent' ? 'bg-green-100 text-green-700' :
                      row.condition === 'Good' ? 'bg-blue-100 text-blue-700' :
                        row.condition === 'Fair' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                    }`}>
                    {row.condition}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-sm ${row.maintenance === 'Completed' ? 'bg-green-100 text-green-700' :
                      row.maintenance === 'Scheduled' ? 'bg-blue-100 text-blue-700' :
                        row.maintenance === 'Overdue' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                    }`}>
                    {row.maintenance}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-sm ${row.safetyAudit === 'Pass' ? 'bg-green-100 text-green-700' :
                      row.safetyAudit === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                    }`}>
                    {row.safetyAudit}
                  </span>
                </td>
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
