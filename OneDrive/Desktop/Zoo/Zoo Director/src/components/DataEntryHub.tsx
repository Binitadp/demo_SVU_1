import { LeaveSanction } from './sections/data-entry/LeaveSanction';
import { DutyReassignment } from './sections/data-entry/DutyReassignment';
import { AnimalMovement } from './sections/data-entry/AnimalMovement';
import { CageAssignment } from './sections/data-entry/CageAssignment';

interface DataEntryHubProps {
  activeSubSection: string;
  setActiveSubSection: (section: string) => void;
}

export function DataEntryHub({ activeSubSection, setActiveSubSection }: DataEntryHubProps) {
  const renderForm = () => {
    switch (activeSubSection) {
      case 'leaveSanction':
        return <LeaveSanction />;
      case 'dutyReassignment':
        return <DutyReassignment />;
      case 'animalMovement':
        return <AnimalMovement />;
      case 'cageAssignment':
        return <CageAssignment />;
      default:
        return (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500">Select a form from the sidebar menu to get started.</p>
          </div>
        );
    }
  };

  return (
    <div className="p-8">
      {renderForm()}
    </div>
  );
}
