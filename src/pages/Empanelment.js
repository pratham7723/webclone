import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Empanelment = () => {
  const navigate = useNavigate();
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [draftNumber, setDraftNumber] = useState('');
  const [resumeError, setResumeError] = useState('');

  const handleFreshApplication = () => {
    navigate('/hospital-empanelment-form');
  };

  const handleSignedUpApplication = () => {
    // TODO: Implement signed up application functionality
    console.log('Signed up application clicked');
  };

  const handleUserManual = () => {
    // Create a link element to trigger download
    const link = document.createElement('a');
    link.href = '/user-manual.pdf'; // PDF file path in public folder
    link.download = 'MJPJAY_Hospital_Empanelment_User_Manual.pdf';
    link.target = '_blank';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Optional: Show success message
    alert('User Manual download started!');
  };

  const handleResumeApplication = () => {
    setShowResumeModal(true);
    setResumeError('');
    setDraftNumber('');
  };

  const handleResumeSubmit = () => {
    if (!draftNumber.trim()) {
      setResumeError('Please enter your draft number');
      return;
    }

    // Navigate to form with draft number
    navigate(`/hospital-empanelment-form?draft=${draftNumber.trim()}`);
  };

  const closeResumeModal = () => {
    setShowResumeModal(false);
    setResumeError('');
    setDraftNumber('');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="bg-white rounded-lg shadow-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            Mahatma Jyotirao Phule Jan Arogya Yojana
          </h1>
          <h2 className="text-3xl font-bold text-blue-800 mb-6">
            ELIGIBILITY CRITERIA FOR EMPANELLMENT OF HOSPITALS
          </h2>
        </div>

        <div className="prose max-w-none">
          {/* Introduction Section */}
          <section className="mb-8">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
                <span className="mr-2">📋</span>
                INTRODUCTION
              </h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  Government of Maharashtra is implementing Mahatma Jyotirao Phule Jan Arogya Yojana 
                  Scheme throughout the State for treating serious ailments requiring hospitalization. 
                  The scheme provides financial protection to families living below poverty line up to 
                  Rs. 1.5 lakhs in a year.
                </p>
                <p>
                  The objective of the scheme is to improve access of BPL families to quality medical 
                  care through an identified network of health care providers. A total of 975 (Surgical & Medical) 
                  procedures in identified specialties are covered under the schemes.
                </p>
                <p>
                  The identified Network Hospitals are required to implement all MJPJAY schemes sponsored 
                  by Government of Maharashtra.
                </p>
                <p>
                  In order to ensure that the service providers give quality medical care under the scheme 
                  certain minimum standards for the hospitals to be empanelled as defined below:
                </p>
              </div>
            </div>
          </section>

          {/* Requirements Section */}
          <section className="mb-8">
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center">
                <span className="mr-2">✅</span>
                A. REQUIREMENTS
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-green-800 mb-3">I. Definition</h4>
                  <div className="space-y-3 text-gray-700">
                    <div className="bg-white p-4 rounded border">
                      <p><strong>1) HOSPITAL / NURSING HOME:</strong> Means any premises used or intended to be used, 
                      for the reception of persons suffering from any sickness, injury or infirmity and the providing 
                      of treatment and nursing for them and includes a maternity home.</p>
                    </div>
                    <div className="bg-white p-4 rounded border">
                      <p><strong>2) Specialist Doctor:</strong> He/she is a doctor holding additional medical qualification 
                      in addition to MBBS. He/she shall be registered with Maharashtra medical council for additional qualification.</p>
                    </div>
                    <div className="bg-white p-4 rounded border">
                      <p><strong>3) Bed Eligibility:</strong> Minimum 30 beds for multispecialty hospital. Relaxation may be given 
                      for hospitals exist in aspirational and tribal districts/Talukas.</p>
                    </div>
                    <div className="bg-white p-4 rounded border">
                      <p><strong>4) Following single speciality hospitals are considered for Empanelment:</strong></p>
                      <ul className="list-disc list-inside mt-2 ml-4">
                        <li>Ophthalmology</li>
                        <li>Orthopaedic & Polytrauma</li>
                        <li>Neonatal & Paediatric Medical Management, Paediatric Surgery</li>
                        <li>Oncology</li>
                        <li>Burns</li>
                        <li>Nephrology (Maintenance Haemodialysis)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-green-800 mb-3">II. Infrastructure and Expertise (General)</h4>
                  <p className="text-gray-700 mb-4">
                    <strong>The hospital should have the following Expertise & Infrastructure as per guidelines:</strong>
                  </p>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded border">
                      <div className="flex items-start space-x-3">
                        <span className="text-2xl">🏥</span>
                        <div>
                          <p className="font-semibold">Minimum 30 inpatient medical beds</p>
                          <p className="text-sm text-gray-600">with adequate spacing for each bed and supporting staff as per norms.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded border">
                      <div className="flex items-start space-x-3">
                        <span className="text-2xl">👨‍⚕️</span>
                        <div>
                          <p className="font-semibold">Atleast one in-house surgeon and or in-house physician (MD)</p>
                          <p className="text-sm text-gray-600">shall be available for empanelment of Surgical and Medical packages respectively.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded border">
                      <div className="flex items-start space-x-3">
                        <span className="text-2xl">📋</span>
                        <div>
                          <p className="font-semibold">All doctors registered under Maharashtra Medical Council</p>
                          <p className="text-sm text-gray-600">whether fulltime or part-time should be registered.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded border">
                      <div className="flex items-start space-x-3">
                        <span className="text-2xl">⏰</span>
                        <div>
                          <p className="font-semibold">Round-the-clock availability</p>
                          <p className="text-sm text-gray-600">of Duty Doctors & Paramedic staff.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded border">
                      <div className="flex items-start space-x-3">
                        <span className="text-2xl">🔬</span>
                        <div>
                          <p className="font-semibold">In-house round-the-clock basic diagnostic facilities</p>
                          <p className="text-sm text-gray-600">for biochemical, pathological and radiology tests.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded border">
                      <div className="flex items-start space-x-3">
                        <span className="text-2xl">🚨</span>
                        <div>
                          <p className="font-semibold">Casualty equipped with Monitors, Defibrillator</p>
                          <p className="text-sm text-gray-600">Crash Cart, Resuscitation equipment, Oxygen and Suction facility.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded border">
                      <div className="flex items-start space-x-3">
                        <span className="text-2xl">⚡</span>
                        <div>
                          <p className="font-semibold">Fully equipped Operation Theatre</p>
                          <p className="text-sm text-gray-600">along with required equipments as mentioned in the specific requirements.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded border">
                      <div className="flex items-start space-x-3">
                        <span className="text-2xl">🏥</span>
                        <div>
                          <p className="font-semibold">ICU facility with Monitors, Ventilators</p>
                          <p className="text-sm text-gray-600">Oxygen facility, Suction facility, Defibrillator, and required other facilities.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Specific Requirements Section */}
          <section className="mb-8">
            <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center">
                <span className="mr-2">🎯</span>
                III. Expertise & Infrastructure (Specific)
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-purple-800 mb-3">A. For Empanelment of Cancer Therapy</h4>
                  <div className="bg-white p-4 rounded border">
                    <p className="text-gray-700">
                      Services of fully qualified Medical Oncologist, Radiation Oncologist and Surgical Oncologist – 
                      all the specialties should be available in the hospital. Equipment for Cobalt therapy, Linear 
                      accelerator and Brachy therapy – all or either can be empanelled for Cancer Surgeries and 
                      Chemo and Radio-Therapies.
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      <strong>Note:</strong> A combination of both professional and the equipment is essential.
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-purple-800 mb-3">B. For Empanelment of Poly Trauma</h4>
                  <div className="bg-white p-4 rounded border">
                    <p className="text-gray-700 mb-3">
                      Shall have Emergency Room Setup with round the clock dedicated duty doctors of Modern Medicine. 
                      Shall have round the clock anesthetist services. Shall be able to provide round the clock services 
                      of Neuro-surgeon, Orthopedic Surgeon, CT Surgeon and General Surgeon, Vascular Surgeon and other 
                      support specialties wherever applicable.
                    </p>
                    <ul className="list-disc list-inside text-gray-700 ml-4">
                      <li>Shall have dedicated round the clock Emergency theatre, Surgical ICU, Post-Op Setup with qualified staff.</li>
                      <li>Shall be able to provide necessary cashless diagnostic support round the clock including specialized investigations such as CT, MRI, emergency biochemical investigations.</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-purple-800 mb-3">C. For Empanelment of Prostheses (Artificial limbs)</h4>
                  <div className="bg-white p-4 rounded border">
                    <p className="text-gray-700 mb-3">
                      Shall have full time services of Orthopedic Surgeon to be empanelled to provide prostheses package 
                      under the scheme. Shall facilitate supply, fitting of appropriate prosthesis and gait training of 
                      patient by physiotherapist.
                    </p>
                    <ul className="list-disc list-inside text-gray-700 ml-4">
                      <li>Shall also facilitate free replacement of leather parts and ensure total replacement of Prosthesis in case of damage during guarantee period of 3 years</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Specialty Requirements Section */}
          <section className="mb-8">
            <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-orange-900 mb-4 flex items-center">
                <span className="mr-2">🏥</span>
                IV. Specialty wise specific requirements
              </h3>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded border">
                  <h4 className="font-semibold text-orange-800 mb-2">General Surgery</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Qualified M.S (General Surgeon) or equivalent with experience of atleast 100 Laparoscopic Procedures</li>
                    <li>Well equipped O.T with Laparoscopic equipment & Trained staff</li>
                    <li>Well equipped Post Operative ward and ICU facilities</li>
                    <li>Support speciality of General Medicine and Pediatrics</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded border">
                  <h4 className="font-semibold text-orange-800 mb-2">Orthopedic Surgery</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Qualified M.S Ortho. or D.Ortho or DNB (Ortho.)</li>
                    <li>Well equipped theatre with C-Arm facility</li>
                    <li>Trained paramedics</li>
                    <li>Well equipped Post Operative ward and ICU facilities</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded border">
                  <h4 className="font-semibold text-orange-800 mb-2">Cardiology</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Qualified D.M (Cardiology) or equivalent Degree (Round the clock)</li>
                    <li>Well equipped ICCU & ICU facilities</li>
                    <li>Cathlab facility</li>
                    <li>Support Services of Physician/Pediatrician</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded border">
                  <h4 className="font-semibold text-orange-800 mb-2">Neurosurgery</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Qualified Neuro - Surgeon(M.Ch or equivalent)</li>
                    <li>Well Equipped Theatre with Operating Microscope</li>
                    <li>Post Operative ward and ICU facilities</li>
                    <li>Neuro ICU facility</li>
                    <li>Round the clock CT/MRI services</li>
                    <li>Support services of Neurologist/physician</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 bg-red-50 border border-red-200 p-4 rounded">
                <p className="text-red-800 text-sm">
                  <strong>*</strong> All the doctors/Specialist who acquired equivalent degree other than those mentioned 
                  should have been recognized by MCI & must have been registered with Maharashtra Medical Council.
                </p>
              </div>
            </div>
          </section>

          {/* Other Services Section */}
          <section className="mb-8">
            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-indigo-900 mb-4 flex items-center">
                <span className="mr-2">🔧</span>
                VI. Other Services under the scheme
              </h3>
              
              <p className="text-gray-700 mb-4">
                Hospital should be in a position to provide following additional benefit to the BPL beneficiaries 
                related to identified systems:
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded border">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">🏢</span>
                    <div>
                      <p className="font-semibold">Provide space and separate MJPJAY counter/kiosk</p>
                      <p className="text-sm text-gray-600">as per the design for Arogyamitras (Health Coordinators) in the main entrance/reception of the Hospital.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded border">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">💻</span>
                    <div>
                      <p className="font-semibold">Provide Computer with networking</p>
                      <p className="text-sm text-gray-600">broadband with minimum 2 mbps speed dedicated for each computer/system or leased line, printer, scanner, bar code reader, digital camera, web cam, Mike Speaker and Stationary.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded border">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">🍽️</span>
                    <div>
                      <p className="font-semibold">Provide quality food free of cost</p>
                      <p className="text-sm text-gray-600">for the patients as envisaged in the package rates either through in-house pantry or by making alternate arrangements.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded border">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">🚗</span>
                    <div>
                      <p className="font-semibold">Provide transport or bear the cost</p>
                      <p className="text-sm text-gray-600">of transport charges (To & fro) incurred by the beneficiary and agrees to arrange the same at the time of discharge.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded border">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">🏥</span>
                    <div>
                      <p className="font-semibold">Provision of separate MJPJAY OPD</p>
                      <p className="text-sm text-gray-600">with networking computer with printer connection.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded border">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">🔬</span>
                    <div>
                      <p className="font-semibold">Free diagnostic tests and medical treatment</p>
                      <p className="text-sm text-gray-600">required for beneficiaries irrespective of surgery either in the 'In-House' or with 'Tie-up' facility.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Important Notes */}
          <section className="mb-8">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-yellow-900 mb-4 flex items-center">
                <span className="mr-2">⚠️</span>
                Important Notes
              </h3>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>Note:</strong> Any false information submitted by the hospital in online application for empanelment. 
                  It will be viewed seriously and such applications will be Rejected.
                </p>
                <p>
                  It may also be noted that the above are minimum indicative requirements and the hospital shall also 
                  provide or establish other requirements as per the indications/directions of the Society.
                </p>
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <section className="mb-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleFreshApplication}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
                >
                  Fresh Application
                </button>
                <button
                  onClick={handleResumeApplication}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
                >
                  Resume Application
                </button>
                <button
                  onClick={handleSignedUpApplication}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
                >
                  Signed up application
                </button>
                <button
                  onClick={handleUserManual}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
                >
                  Download User Manual
                </button>
              </div>
            </div>
          </section>

          {/* Technical Requirements */}
          <section className="mb-8">
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
              <p className="text-red-800 text-center font-semibold">
                <span className="mr-2">💻</span>
                Kindly use Internet Explorer 8 or above to fill the application form
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Resume Application Modal */}
      {showResumeModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 lg:w-1/3 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Resume Application
              </h3>
              <button
                onClick={closeResumeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-4">
                Enter your draft number to resume your application. You can find this number 
                in the confirmation message when you saved your draft.
              </p>
              
              <label htmlFor="draftNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Draft Number
              </label>
              <input
                type="text"
                id="draftNumber"
                value={draftNumber}
                onChange={(e) => setDraftNumber(e.target.value)}
                placeholder="e.g., DRAFT123456ABC"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              {resumeError && (
                <p className="text-red-600 text-sm mt-2">{resumeError}</p>
              )}
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={closeResumeModal}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleResumeSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
              >
                Resume Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Empanelment;
