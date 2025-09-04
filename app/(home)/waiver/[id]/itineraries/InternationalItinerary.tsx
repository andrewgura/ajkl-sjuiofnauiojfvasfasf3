import { useFormContext } from "react-hook-form";
import { WaiverFormData } from "../waiver-validation";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/shared/Section";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SimpleSelect } from "@/components/ui/simple-select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";
import DateInput2 from "@/components/shared/DateInput2";

const intlSubtypes = [
  { value: "single", label: "Single Trip" },
  { value: "overflight", label: "Overflight" },
  { value: "notrans", label: "No Transponder" },
  { value: "iaa", label: "International Air Ambulance" },
];
const intlFlightType = [
  { value: "cargo", label: "Cargo" },
  { value: "crew", label: "Crew Only" },
  { value: "passenger", label: "Passenger" },
  { value: "cargo_pass", label: "Cargo and Passenger" },
];
const operationType = [
  { value: "elected", label: "Elected Official" },
  { value: "gov", label: "Government Official" },
  { value: "dassp", label: "DASSP Operation" },
  { value: "other", label: "Other Operation" },
];

export default function InternationalItinerary() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<WaiverFormData>();

  return (
    <div>
      <Card id="intl-itinerary" className="bg-white shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">
            International Flight Itinerary
          </h2>
        </div>

        <div className="p-4 grid grid-cols-2 gap-x-2 gap-y-4">
          <Section title="Basic Information">
            <div className="grid grid-cols-2 items-center gap-2">
              <Label className="text-sm font-medium text-gray-700">
                Waiver Subtype <span className="text-red-500">*</span>
              </Label>
              <SimpleSelect
                options={intlSubtypes}
                className="h-8 py-1"
                {...register("intlSubtype")}
              />
              <Label className="text-sm font-medium text-gray-700">
                Flight Type <span className="text-red-500">*</span>
              </Label>
              <SimpleSelect
                options={intlFlightType}
                className="h-8 py-1"
                {...register("intlFlightType")}
              />
              <Label className="text-sm font-medium text-gray-700">
                Application Date <span className="text-red-500">*</span>
              </Label>
              {/* <Input className="h-8" {...register("applicationDate")} /> */}
              <DateInput2 className="h-8" value={watch("applicationDate")} {...register("applicationDate")} />
            </div>
          </Section>

          <Section title="Waiver Period">
            <div className="grid grid-cols-2 items-center gap-2">
              <Label className="text-sm font-medium text-gray-700">
                Waiver Start Date <span className="text-red-500">*</span>
              </Label>
              {/* <Input className="h-8" {...register("startDate")} /> */}
              <DateInput2 className="h-8" value={watch("startDate")} {...register("startDate")} />
              <Label className="text-sm font-medium text-gray-700">
                Waiver End Date <span className="text-red-500">*</span>
              </Label>
              {/* <Input className="h-8" {...register("endDate")} /> */}
              <DateInput2 className="h-8" value={watch("endDate")} {...register("endDate")} />
            </div>
          </Section>

          <div className="col-span-2">
            <Section title="International Itinerary">
              <div className="grid grid-cols-4 items-center gap-2">
                <Label className="text-sm font-medium text-gray-700">
                  Departure Point(s) <span className="text-red-500">*</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon className="h-3 w-3 ml-2 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm">
                          Please use the 4-letter ICAO codes only <br />
                          Separate each code with spaces <br />
                          No special characters permitted <br />
                          Example: LFPB KMIA LFPB <br />
                          List trip-specific route of flight
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Textarea
                  className="col-span-3"
                  {...register("intlDepartPoint")}
                />

                <Label className="text-sm font-medium text-gray-700">
                  Intermediate Stop(s) <span className="text-red-500">*</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon className="h-3 w-3 ml-2 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm">
                          Please use the 4-letter ICAO codes only <br />
                          Separate each code with spaces <br />
                          No special characters permitted <br />
                          Example: LFPB KMIA LFPB <br />
                          List trip-specific route of flight
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Textarea
                  className="col-span-3"
                  {...register("intlIntStops")}
                />

                <Label className="text-sm font-medium text-gray-700">
                  Destination Point(s) <span className="text-red-500">*</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon className="h-3 w-3 ml-2 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm">
                          Please use the 4-letter ICAO codes only <br />
                          Separate each code with spaces <br />
                          No special characters permitted <br />
                          Example: LFPB KMIA LFPB <br />
                          List trip-specific route of flight
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Textarea
                  className="col-span-3"
                  {...register("intlDestPoint")}
                />

                <Label className="text-sm font-medium text-gray-700">
                  Final Destination(s) <span className="text-red-500">*</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon className="h-3 w-3 ml-2 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm">
                          Please use the 4-letter ICAO codes only <br />
                          Separate each code with spaces <br />
                          No special characters permitted <br />
                          Example: LFPB KMIA LFPB <br />
                          List trip-specific route of flight
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Textarea
                  className="col-span-3"
                  {...register("intlFinalDest")}
                />
              </div>
            </Section>
          </div>

          <div className="col-span-2">
            <Section title="International Air Ambulance Information">
              <div className="grid grid-cols-4 items-center gap-2">
                <Label className="text-sm font-medium text-gray-700">
                  Route of Flight <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  className="col-span-3"
                  {...register("intlAmbRoute")}
                />
                <Label className="text-sm font-medium text-gray-700">
                  Receiving Hospital(s) <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  className="col-span-3"
                  {...register("intlAmbHospitalName")}
                />
                <Label className="text-sm font-medium text-gray-700">
                  Hospital Phone Number(s){" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  className="col-span-3"
                  {...register("intlAmbHospitalNumber")}
                />
                <Label className="text-sm font-medium text-gray-700">
                  Hospital Address(es) <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  className="col-span-3"
                  {...register("intlAmbHospitalAddress")}
                />
                <Label className="text-sm font-medium text-gray-700">
                  Hospital Point(s) of Contact
                  <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  className="col-span-3"
                  {...register("intlAmbHospitalPoc")}
                />
              </div>
            </Section>
          </div>

          <div className="col-span-2">
            <Section title="Destination Contact Information">
              <div className="grid grid-cols-4 items-center gap-2">
                <Label className="text-sm font-medium text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  className="h-8 col-span-3"
                  {...register("intlContactName")}
                />
                <Label className="text-sm font-medium text-gray-700">
                  Street Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  className="h-8 col-span-3"
                  {...register("intlContactStreet")}
                />
                <Label className="text-sm font-medium text-gray-700">
                  City <span className="text-red-500">*</span>
                </Label>
                <Input
                  className="h-8 col-span-3"
                  {...register("intlContactCity")}
                />
                <Label className="text-sm font-medium text-gray-700">
                  State/Province
                </Label>
                <Input
                  className="h-8 col-span-3"
                  {...register("intlContactState")}
                />
                <Label className="text-sm font-medium text-gray-700">
                  Country <span className="text-red-500">*</span>
                </Label>
                <Input
                  className="h-8 col-span-3"
                  {...register("intlContactCountry")}
                />
                <Label className="text-sm font-medium text-gray-700">
                  Zip Code <span className="text-red-500">*</span>
                </Label>
                <Input
                  className="h-8 col-span-3"
                  {...register("intlContactZip")}
                />
                <Label className="text-sm font-medium text-gray-700">
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  className="h-8 col-span-3"
                  {...register("intlContactPhone")}
                />
              </div>
            </Section>
          </div>

          <div className="col-span-2">
            <Section title="Purpose of Flight/ Comments">
              <Textarea
                className=""
                {...register("purposeComments")}
                placeholder="Enter the purpose of your request and any additional comments..."
              />
            </Section>
          </div>
        </div>
      </Card>
    </div>
  );
}
