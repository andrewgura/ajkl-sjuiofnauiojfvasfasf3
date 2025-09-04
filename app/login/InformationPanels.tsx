import React from "react";
import { Info, FileText, Users, AlertTriangle } from "lucide-react";

export default function InformationPanels() {
  return (
    <div className="space-y-3 max-h-full overflow-y-auto">
      {/* Warning Section */}
      <div className="bg-red-500/10 backdrop-blur-sm rounded-xl border border-red-400/20 p-4">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-3 h-3 text-red-300" />
          </div>
          <div>
            <h3 className="text-red-200 font-semibold text-xs mb-1">Warning</h3>
            <div className="text-red-200/90 text-[12px] leading-tight space-y-1">
              <p>
                You are accessing a U.S. Government authorized information system, which includes (1) this computer, (2) this computer network, (3) all computers connected to this network, and (4) all devices and storage media attached to this network or to a computer on this network, and (5) cloud services and hosting environments supporting this information system.
              </p>
              <p>By logging in and using this information system, you understand and consent to the following:</p>
              <ul className="list-disc pl-3 space-y-0.5 mt-1 text-[12px] leading-tight">
                <li>You have no reasonable expectation of privacy regarding communications or data transiting or stored on this information system.</li>
                <li>At any time and for any lawful Government purpose, communications may be monitored, intercepted, recorded, and searched.</li>
                <li>Any communications or data transiting or stored on this information system may be disclosed or used for any lawful Government purpose.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Act Notice */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Info className="w-3 h-3 text-blue-300" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-xs mb-1">Privacy Act Notice</h3>
            <div className="text-blue-200 text-[12px] leading-tight space-y-1">
              <p>
                <span className="font-semibold">AUTHORITY:</span> 49 U.S.C. § 114; Pub. L. 108-176. {" "}
                <span className="font-semibold">PRINCIPAL PURPOSE(S):</span> This
                information will be used to conduct background checks in connection with flight
                authorizations and waivers of flight restrictions. {" "}
                <span className="font-semibold">ROUTINE USE(S):</span> This information
                may be shared with aircraft and airport operators, the FBI, and the FAA, or for
                routine uses identified in TSA system of records. DHS/TSA 002, Transportation
                Security Threat Assessment System.
              </p>
              <p>
                <span className="font-semibold">DISCLOSURE:</span> Voluntary; failure to furnish the requested information may result in
                delays in processing your application or a denial of your application. Failure to
                furnish your Social Security Number (SSN) or Passport Number (PPN) may result in
                delays in processing your application.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Waiver Processing */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText className="w-3 h-3 text-green-300" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-xs mb-1">About Waiver Processing</h3>
            <p className="text-blue-200 text-[12px] leading-tight">
              If you are determined to be eligible for a waiver, you will be notified and provided
              with a unique waiver authorization. Although complete background checks take
              time to complete, we anticipate returning results as soon as they are received,
              provided there is no indication of a criminal history. Normally the process may take
              up to 5 business days to complete.
            </p>
          </div>
        </div>
      </div>

      {/* DASSP Flight Authorization */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Users className="w-3 h-3 text-purple-300" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-xs mb-1">About DASSP Flight Authorization</h3>
            <div className="text-blue-200 text-[12px] leading-tight space-y-1">
              <p>
                In order to receive an authorization for DCA access from TSA, an operator must be
                on the TSA DCA approved operator list, take off from an approved TSA Gateway
                Airport and utilize a TSA approved Armed Security Officer (ASO).
              </p>
              <ul className="list-disc pl-3 space-y-0.5 mt-1 text-[12px] leading-tight">
                <li>Before completing the flight authorization application form, please reserve an
                  FAA slot reservation at www.fly.faa.gov.</li>
                <li>The approved security coordinator, or company equivalent, must complete the
                  flight authorization application form.</li>
                <li>The application form must be received no later than 24 hours prior to your
                  departure time.</li>
                <li>The application must be filled out completely for processing within 24 hours.</li>
                <li>Passenger, Crew, and Armed Security Officer (ASO) manifest changes are
                  prohibited within 24 hours of departure.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}