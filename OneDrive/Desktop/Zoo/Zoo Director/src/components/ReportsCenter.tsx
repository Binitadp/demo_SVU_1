import { useState } from 'react';
import { StaffAttendanceReport } from './sections/reports/StaffAttendanceReport';
import { SupervisorPerformanceReport } from './sections/reports/SupervisorPerformanceReport';
import { KeeperPerformanceReport } from './sections/reports/KeeperPerformanceReport';
import { AnimalHealthReport } from './sections/reports/AnimalHealthReport';
import { AnimalMovementReport } from './sections/reports/AnimalMovementReport';
import { CageInfrastructureReport } from './sections/reports/CageInfrastructureReport';
import { VisitorManagementReport } from './sections/reports/VisitorManagementReport';
import { BudgetUtilizationReport } from './sections/reports/BudgetUtilizationReport';
import { InterZooCoordinationReport } from './sections/reports/InterZooCoordinationReport';
import { StrategicSummaryReport } from './sections/reports/StrategicSummaryReport';

interface ReportsCenterProps {
  activeSubSection: string;
  setActiveSubSection: (section: string) => void;
}

export function ReportsCenter({ activeSubSection, setActiveSubSection }: ReportsCenterProps) {
  const renderReportContent = () => {
    switch (activeSubSection) {
      case 'staffAttendance':
        return <StaffAttendanceReport />;
      case 'supervisorPerformance':
        return <SupervisorPerformanceReport />;
      case 'keeperPerformance':
        return <KeeperPerformanceReport />;
      case 'animalHealth':
        return <AnimalHealthReport />;
      case 'animalMovementReport':
        return <AnimalMovementReport />;
      case 'cageInfrastructure':
        return <CageInfrastructureReport />;
      case 'visitorManagement':
        return <VisitorManagementReport />;
      case 'budgetUtilization':
        return <BudgetUtilizationReport />;
      case 'interZooCoordination':
        return <InterZooCoordinationReport />;
      case 'strategicSummary':
        return <StrategicSummaryReport />;
      default:
        return (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500">Select a report from the sidebar to view details.</p>
          </div>
        );
    }
  };

  return (
    <div className="p-8">
      {/* Report Content */}
      {renderReportContent()}
    </div>
  );
}
