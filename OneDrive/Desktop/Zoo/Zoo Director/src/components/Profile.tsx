export function Profile() {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow p-8">
          <h3 className="text-xl mb-6">Personal Details</h3>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-600 mb-2">Name</label>
              <p className="text-gray-900">Dr. Rajesh Kumar</p>
            </div>
            
            <div>
              <label className="block text-gray-600 mb-2">Role</label>
              <p className="text-gray-900">Director</p>
            </div>
            
            <div>
              <label className="block text-gray-600 mb-2">Assigned Zoo</label>
              <p className="text-gray-900">Alipore Zoological Gardens</p>
            </div>
            
            <div>
              <label className="block text-gray-600 mb-2">Employee ID</label>
              <p className="text-gray-900">DIR-2025-001</p>
            </div>
            
            <div>
              <label className="block text-gray-600 mb-2">Email</label>
              <p className="text-gray-900">rajesh.kumar@aliporezoo.gov.in</p>
            </div>
            
            <div>
              <label className="block text-gray-600 mb-2">Contact Number</label>
              <p className="text-gray-900">+91 98765 43210</p>
            </div>
            
            <div>
              <label className="block text-gray-600 mb-2">Date of Joining</label>
              <p className="text-gray-900">15th March 2020</p>
            </div>
            
            <div>
              <label className="block text-gray-600 mb-2">Department</label>
              <p className="text-gray-900">Administration</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
