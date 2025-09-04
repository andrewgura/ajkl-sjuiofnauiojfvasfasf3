import { useFormContext } from "react-hook-form";
import { WaiverFormData } from "./waiver-validation";
import { Card } from "@/components/ui/card";
import { TriangleAlert } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { SimpleCheckbox, SimpleCheckbox2 } from "@/components/ui/checkbox";
import { ChangeEvent, useState } from "react";
import DateInput2 from "@/components/shared/DateInput2";

export default function Security() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<WaiverFormData>();
  const [accept, setAccept] = useState(false);

  const handleAcceptChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAccept(e.target.checked);
    console.log(e.target.checked);
  };

  return (
    <Card className="bg-white shadow-sm">
      <div className="p-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-900">
          Security Statement and Information
        </h2>
      </div>

      <div className="p-4 space-y-4">
        <div className="text-sm bg-blue-50 p-4 rounded-[1vw]">
          <p>
            By submitting this request, the requester and the UAS operartor (if
            different from than the requester) agree to the following
            requirements if TSA grants the requested waiver:
          </p>
          <ul
            style={{
              listStyleType: "disc",
              paddingLeft: 40,
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            <li>
              The aircraft operator will verify the identity of each individual
              boarding the aircraft for each flight leg listed in the itinerary.
            </li>
            <li>
              The aircraft operator will ensure that only individuals whose
              identifying information is included in the manifest section of
              this form are onboard the aircraft for any flight leg listed in
              the itinerary.
            </li>
            <li>
              The aircraft operator will not deviate from the approved air
              traffic flight plan.
            </li>
            <li>
              The aircraft operator will control access to the aircraft and will
              search the aircraft (including cargo and cabin areas) prior to
              each flight leg listed in the itinerary to ensure that no unusual
              objects, explosives, or weapons have been placed onboard.
            </li>
          </ul>
          <p>
            Failure to comply with these requirements may result in the denial
            or revocation of the waiver and the imposition of civil money
            penalties.
          </p>
        </div>

        <div className="flex items-center text-sm bg-red-200 px-4 py-2 rounded-[.5vw]">
          <TriangleAlert />
          <div className="font-semibold mx-4">
            Do not provide any sensitive security information when answering the
            following questions.
          </div>
        </div>

        <p className="text-sm bg-yellow-100 px-4 py-2 rounded-[.5vw]">
          The following fields must contain verifiable data or the waiver
          request will be denied. The use of &quot;N/A&quot; or similar will also result
          in a waiver request denial.
        </p>

        <div className="grid grid-cols-3 gap-4 items-center">
          <Label>
            How is the aircraft secured when not operational at the place of
            origin? (Locked hangar, fenced area with gate access, security
            guard, etc.) <span className="text-red-500">*</span>
          </Label>
          <Textarea className="col-span-2" {...register("secSecured")} />

          <Label>
            How are the persons on the manifest positively identified before
            boarding the aircraft? <span className="text-red-500">*</span>
          </Label>
          <Textarea className="col-span-2" {...register("secManifest")} />

          <Label>
            Provide any additional security measures taken.{" "}
            <span className="text-red-500">*</span>
          </Label>
          <Textarea className="col-span-2" {...register("secAddSecurity")} />
        </div>

        <div className="border-t border-gray-300 space-y-4">
          <p className="text-md font-semibold mt-4">
            Affirmation under penalty of perjury
          </p>
          <p className="text-sm">
            I hereby affirm, under penalty of perjury, that the information I
            have provided on this application is true, complete, and correct to
            the best of my knowledge and belief and is provided in good faith. I
            understand that a knowing and willful false statement, or an
            omission of a material fact, on this application may be punished by
            fine or imprisonment or both (see section 1001 of Title 18 United
            States Code), and may be grounds for denial of a waiver request or
            suspension or revocation of a waiver and other penalties.
          </p>

          <div className="grid grid-cols-3 items-center gap-x-4 gap-y-1">
            <div>
              <Label className="text-sm font-medium text-gray-700 px-1">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input className="h-8 -mt-1" {...register("secName")} />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 px-1">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input className="h-8 -mt-1" {...register("secTitle")} />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 px-1">
                Date <span className="text-red-500">*</span>
              </Label>
              {/* <Input className="h-8 -mt-1" {...register("secDate")} /> */}
              <DateInput2 placeholder="Select a date" value={watch("secDate")} {...register("secDate")} />
            </div>
            <div className="col-span-3 px-4">
              <SimpleCheckbox2
                label="I accept the above security statement"
                {...register('secAccepted')}
                className="text-sm font-medium text-gray-700"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
