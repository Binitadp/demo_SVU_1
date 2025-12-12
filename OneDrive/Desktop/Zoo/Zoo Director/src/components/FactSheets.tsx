import { AnimalFactSheet } from './sections/fact-sheets/AnimalFactSheet';
import { BirdFactSheet } from './sections/fact-sheets/BirdFactSheet';
import { CageFactSheet } from './sections/fact-sheets/CageFactSheet';
import { StaffFactSheet } from './sections/fact-sheets/StaffFactSheet';
import { SupervisorFactSheet } from './sections/fact-sheets/SupervisorFactSheet';

interface FactSheetsProps {
  activeSubSection: string;
  setActiveSubSection: (section: string) => void;
}

export function FactSheets({ activeSubSection, setActiveSubSection }: FactSheetsProps) {
  const renderFactSheet = () => {
    switch (activeSubSection) {
      case 'animalFact':
        return <AnimalFactSheet />;
      case 'birdFact':
        return <BirdFactSheet />;
      case 'cageFact':
        return <CageFactSheet />;
      case 'staffFact':
        return <StaffFactSheet />;
      case 'supervisorFact':
        return <SupervisorFactSheet />;
      default:
        return (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500">Select a fact sheet from the sidebar menu.</p>
          </div>
        );
    }
  };

  return (
    <div className="p-8">
      {renderFactSheet()}
    </div>
  );
}
