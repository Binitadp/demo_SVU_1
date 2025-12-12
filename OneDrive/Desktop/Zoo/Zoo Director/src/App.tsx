import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { Profile } from './components/Profile';
import { DataEntryHub } from './components/DataEntryHub';
import { FactSheets } from './components/FactSheets';
import { ReportsCenter } from './components/ReportsCenter';
import {
  LayoutDashboard,
  Edit3,
  FileText,
  BarChart3,
  AlertTriangle,
  User,
  LogOut,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [activeSubSection, setActiveSubSection] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const dataEntrySubItems = [
    { id: 'leaveSanction', label: 'Leave Sanction' },
    { id: 'dutyReassignment', label: 'Duty Reassignment' },
    { id: 'animalMovement', label: 'Animal/Bird Movement' },
    { id: 'cageAssignment', label: 'Cage Assignment' }
  ];

  const factSheetsSubItems = [
    { id: 'animalFact', label: 'Animal Fact Sheet' },
    { id: 'birdFact', label: 'Bird Fact Sheet' },
    { id: 'cageFact', label: 'Cage Fact Sheet' },
    { id: 'staffFact', label: 'Staff Fact Sheet' },
    { id: 'supervisorFact', label: 'Supervisor Fact Sheet' }
  ];

  const reportsSubItems = [
    { id: 'staffAttendance', label: 'StaffPulse' },
    { id: 'supervisorPerformance', label: 'ZoneMaster' },
    { id: 'keeperPerformance', label: 'KeeperTrack' },
    { id: 'animalHealth', label: 'HealthScan' },
    { id: 'animalMovementReport', label: 'MoveLog' },
    { id: 'cageInfrastructure', label: 'CageCheck' },
    { id: 'visitorManagement', label: 'VisitorEcho' },
    { id: 'budgetUtilization', label: 'BudgetView' },
    { id: 'interZooCoordination', label: 'ZooLink' },
    { id: 'strategicSummary', label: 'ZooSnapshot' }
  ];

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    {
      id: 'dataEntry',
      label: 'Data Entry',
      icon: Edit3,
      subItems: dataEntrySubItems
    },
    {
      id: 'factSheets',
      label: 'Fact Sheet',
      icon: FileText,
      subItems: factSheetsSubItems
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: BarChart3,
      subItems: reportsSubItems
    },
    { id: 'emergency', label: 'Emergency', icon: AlertTriangle }
  ];

  const toggleSection = (sectionId: string) => {
    if (expandedSections.includes(sectionId)) {
      setExpandedSections(expandedSections.filter(id => id !== sectionId));
    } else {
      setExpandedSections([...expandedSections, sectionId]);
    }
  };

  const handleSectionClick = (item: any) => {
    if (item.subItems) {
      const isCurrentlyExpanded = expandedSections.includes(item.id);

      if (!isCurrentlyExpanded) {
        // Expanding: auto-select first sub-item
        setExpandedSections([...expandedSections, item.id]);
        setActiveSection(item.id);
        setActiveSubSection(item.subItems[0].id);
      } else {
        // Collapsing
        setExpandedSections(expandedSections.filter(id => id !== item.id));
        setActiveSubSection('');
      }
    } else {
      setActiveSection(item.id);
      setActiveSubSection('');
      setExpandedSections([]);
    }
  };

  const handleSubItemClick = (sectionId: string, subItemId: string) => {
    setActiveSection(sectionId);
    setActiveSubSection(subItemId);
  };

  const renderContent = () => {
    if (activeSection === 'dashboard') {
      return <Dashboard />;
    } else if (activeSection === 'dataEntry') {
      return <DataEntryHub activeSubSection={activeSubSection} setActiveSubSection={setActiveSubSection} />;
    } else if (activeSection === 'factSheets') {
      return <FactSheets activeSubSection={activeSubSection} setActiveSubSection={setActiveSubSection} />;
    } else if (activeSection === 'reports') {
      return <ReportsCenter activeSubSection={activeSubSection} setActiveSubSection={setActiveSubSection} />;
    } else if (activeSection === 'profile') {
      return <Profile />;
    }
    return <Dashboard />;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="h-16 border-b border-gray-200 flex items-center px-6">
          <h1 className="text-xl">Zootopia</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isExpanded = expandedSections.includes(item.id);
            const isActive = activeSection === item.id;

            return (
              <div key={item.id}>
                {/* Main Navigation Item */}
                <button
                  onClick={() => handleSectionClick(item)}
                  className={`w-full flex items-center justify-between px-6 py-2.5 text-left transition-colors ${isActive
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    {Icon && <Icon className="w-4 h-4" />}
                    <span>{item.label}</span>
                  </div>
                  {item.subItems && (
                    isExpanded ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )
                  )}
                </button>

                {/* Sub Navigation Items */}
                {item.subItems && isExpanded && (
                  <div className="bg-gray-50">
                    {item.subItems.map((subItem) => (
                      <button
                        key={subItem.id}
                        onClick={() => handleSubItemClick(item.id, subItem.id)}
                        className={`w-full text-left px-6 pl-14 py-2 text-sm transition-colors ${activeSubSection === subItem.id
                          ? 'bg-gray-200 text-blue-600'
                          : 'text-gray-600 hover:bg-gray-100'
                          }`}
                      >
                        {subItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 p-4">
          <div className="text-gray-600 mb-2 px-2">
            <p>Director Details</p>
            <p className="text-gray-900">John Doe</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveSection('profile')}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded border border-gray-300"
            >
              <User className="w-4 h-4" />
              Profile
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-red-700 hover:bg-red-50 rounded border border-red-300">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <div>
            <h2 className="text-xl text-gray-900">
              {activeSection === 'dashboard' && 'Dashboard Overview'}
              {activeSection === 'dataEntry' && 'Data Entry Hub'}
              {activeSection === 'factSheets' && 'Fact Sheets'}
              {activeSection === 'reports' && 'Reports Center'}
              {activeSection === 'profile' && 'Profile'}
              {activeSection === 'emergency' && 'Emergency Management'}
            </h2>
            <p className="text-gray-500">Director of the Zoo (Alipore Zoo)</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Wednesday 10 December 2025</span>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}