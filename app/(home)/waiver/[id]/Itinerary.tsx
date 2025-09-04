import { useFormContext } from "react-hook-form";
import { WaiverFormData } from "./waiver-validation";
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

const disneyParks = [
  { value: "dwfl", label: "Disney World, Florida" },
  { value: "dlca", label: "Disneyland, California" },
];
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

export default function Itinerary() {
  const {
    register,
    formState: { errors },
  } = useFormContext<WaiverFormData>();

  return (
    <div>
      <Card
        id="dassp_itinerary"
        className="bg-white shadow-sm"
        style={{ display: "none" }}
      >
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">DASSP Itinerary</h2>
        </div>

        <div className="p-4 grid grid-cols-2 gap-x-2 gap-y-4">
          <Section title="Basic Information" className="">
            <div className="grid grid-cols-2 items-center gap-2">
              <Label className="text-sm font-medium text-gray-700">
                Waiver Subtype <span className="text-red-500">*</span>
              </Label>
              <Input
                disabled
                className="h-8"
                value="DASSP"
                placeholder="DASSP"
                {...register("waiverSubtype")}
              />
              <Label className="text-sm font-medium text-gray-700">
                Date <span className="text-red-500">*</span>
              </Label>
              <Input className="h-8" {...register("applicationDate")} />
            </div>
          </Section>

          <Section title="Waiver Period">
            <div className="grid grid-cols-2 items-center gap-2">
              <Label className="text-sm font-medium text-gray-700">
                Waiver Start Date <span className="text-red-500">*</span>
              </Label>
              <Input className="h-8" {...register("startDate")} />
              <Label className="text-sm font-medium text-gray-700">
                Waiver End Date <span className="text-red-500">*</span>
              </Label>
              <Input className="h-8" {...register("endDate")} />
            </div>
          </Section>

          <Section title="DASSP Specific Information">
            <div className="grid grid-cols-2 items-center gap-2">
              <Label className="text-sm font-medium text-gray-700">
                DASSP Company Name <span className="text-red-500">*</span>
              </Label>
              <Input className="h-8" {...register("dasspCompanyName")} />
              <Label className="text-sm font-medium text-gray-700">
                DASSP Operator Number <span className="text-red-500">*</span>
              </Label>
              <Input className="h-8" {...register("dasspOperatorNum")} />
              <Label className="text-sm font-medium text-gray-700">
                DASSP Security Coordinator{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                className="h-8"
                {...register("dasCoordinator")}
              />
            </div>
          </Section>

          <Section title="Departure Gateway Airport Information">
            <div className="grid grid-cols-2 items-center gap-2">
              <Label className="text-sm font-medium text-gray-700">
                Airport Code <span className="text-red-500">*</span>
              </Label>
              <Input className="h-8" {...register("dasspDepartAirport")} />
              <Label className="text-sm font-medium text-gray-700">
                Gateway FBO <span className="text-red-500">*</span>
              </Label>
              <Input className="h-8" {...register("dasspDepartFbo")} />
              <Label className="text-sm font-medium text-gray-700">
                Departure Date <span className="text-red-500">*</span>
              </Label>
              <Input className="h-8" {...register("deptDate")} />
              <Label className="text-sm font-medium text-gray-700">
                Departure Time (EST) <span className="text-red-500">*</span>
              </Label>
              <Input className="h-8" {...register("deptTime")} />
            </div>
          </Section>

          <Section title="Arrival Information to DCA">
            <div className="grid grid-cols-2 items-center gap-2">
              <Label className="text-sm font-medium text-gray-700">
                DCA Arrival Date <span className="text-red-500">*</span>
              </Label>
              <Input className="h-8" {...register("arrivDate")} />
              <Label className="text-sm font-medium text-gray-700">
                DCA Arrival Time (EST)
                <span className="text-red-500">*</span>
              </Label>
              <Input className="h-8" {...register("arrivTime")} />
            </div>
          </Section>

          <Section title="Departure Information from DCA">
            <div className="grid grid-cols-2 items-center gap-2">
              <Label className="text-sm font-medium text-gray-700">
                DCA Departure Date <span className="text-red-500">*</span>
              </Label>
              <Input className="h-8" {...register("deptDateDca")} />
              <Label className="text-sm font-medium text-gray-700">
                DCA Departure Time (EST) <span className="text-red-500">*</span>
              </Label>
              <Input className="h-8" {...register("deptTimeDca")} />
              <Label className="text-sm font-medium text-gray-700">
                Destination Airport <span className="text-red-500">*</span>
              </Label>
              <Input className="h-8" {...register("dasspDestAirport")} />
            </div>
          </Section>

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

      <Card
        id="disney-itinerary"
        className="bg-white shadow-sm"
        style={{ display: "none" }}
      >
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Disney Itinerary</h2>
        </div>

        <div className="p-4 grid grid-cols-2 gap-x-2 gap-y-4">
          <Section title="Basic Information" className="">
            <div className="grid grid-cols-2 items-center gap-2">
              <Label className="text-sm font-medium text-gray-700">
                Waiver Subtype <span className="text-red-500">*</span>
              </Label>
              <Input
                disabled
                className="h-8"
                value="DIS"
                placeholder="DIS"
                {...register("waiverSubtype")}
              />
              <Label className="text-sm font-medium text-gray-700">
                Date <span className="text-red-500">*</span>
              </Label>
              <Input className="h-8" {...register("applicationDate")} />
            </div>
          </Section>

          <Section title="Waiver Period">
            <div className="grid grid-cols-2 items-center gap-2">
              <Label className="text-sm font-medium text-gray-700">
                Waiver Start Date <span className="text-red-500">*</span>
              </Label>
              <Input className="h-8" {...register("startDate")} />
              <Label className="text-sm font-medium text-gray-700">
                Waiver End Date <span className="text-red-500">*</span>
              </Label>
              <Input className="h-8" {...register("endDate")} />
            </div>
          </Section>

          <div className="col-span-2">
            <Section title="Disney Specific Information">
              <div className="grid grid-cols-3 items-center gap-2">
                <Label className="text-sm font-medium text-gray-700">
                  Theme Park <span className="text-red-500">*</span>
                </Label>
                <SimpleSelect
                  options={disneyParks}
                  className="col-span-2 h-8"
                  {...register("disneyPark")}
                />

                <Label className="text-sm font-medium text-gray-700">
                  Departure Point <span className="text-red-500">*</span>
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
                <Input
                  className="col-span-2 h-8"
                  {...register("disneyDepartPoint")}
                />

                <Label className="text-sm font-medium text-gray-700">
                  Final Destination <span className="text-red-500">*</span>
                </Label>
                <Input
                  className="col-span-2 h-8"
                  {...register("disneyFinalDest")}
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

      <Card
        id="domestic-itinerary"
        className="bg-white shadow-sm"
        style={{ display: "none" }}
      >
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">
            Domestic Flight Itinerary
          </h2>
        </div>

        <div className="p-4 grid grid-cols-2 gap-x-2 gap-y-4">
          <Section title="Basic Information">
            <div className="grid grid-cols-2 items-center gap-2">
              <Label className="text-sm font-medium text-gray-700">
                Waiver Subtype <span className="text-red-500">*</span>
              </Label>
              <Input
                disabled
                className="h-8"
                value="DOM"
                placeholder="DOM"
                {...register("waiverSubtype")}
              />
              <Label className="text-sm font-medium text-gray-700">
                Approved Distance <span className="text-red-500">*</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-3 w-3 ml-2 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm">
                        This field will be filled in by a TSA analyst.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input
                className="h-8"
                disabled
                {...register("domApprovedDistance")}
              />
              <Label className="text-sm font-medium text-gray-700">
                Application Date <span className="text-red-500">*</span>
              </Label>
              <Input className="h-8" {...register("applicationDate")} />
            </div>
          </Section>

          <Section title="Waiver Period">
            <div className="grid grid-cols-2 items-center gap-2">
              <Label className="text-sm font-medium text-gray-700">
                Waiver Start Date <span className="text-red-500">*</span>
              </Label>
              <Input className="h-8" {...register("startDate")} />
              <Label className="text-sm font-medium text-gray-700">
                Waiver End Date <span className="text-red-500">*</span>
              </Label>
              <Input className="h-8" {...register("endDate")} />
            </div>
          </Section>

          <div className="col-span-2">
            <Section title="Domestic Specific Information">
              <div className="grid grid-cols-3 gap-2 items-center">
                <Label className="text-sm font-medium text-gray-700">
                  Distance from DCA VOR <span className="text-red-500">*</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon className="h-3 w-3 ml-2 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm">
                          Bearing and Radial Distance from the DCA VOR including
                          nautical miles (e.g. DCA 270 @ 8.5NM)
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Input
                  className="h-8 col-span-2"
                  {...register("domDcaDistance")}
                />
                <p className="col-span-3 text-sm bg-yellow-100 mt-2 px-4 py-2 rounded-[.5vw]">
                  Fill in FRZ Airport Destinations <b>OR</b> FRZ Overflights
                </p>

                <Label className="text-sm font-medium text-gray-700">
                  FRZ Airport Destination(s){" "}
                  <span className="text-red-500">*</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon className="h-3 w-3 ml-2 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm">
                          Please enter 4 letter Identifiers/ICAO codes of the
                          destination airport(s).
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Input className="h-8 col-span-2" {...register("domFrzDest")} />

                <Label className="text-sm font-medium text-gray-700">
                  FRZ Overflights <span className="text-red-500">*</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon className="h-3 w-3 ml-2 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm">
                          Enter a Street Address or Intersection including City
                          and State.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Input
                  className="h-8 col-span-2"
                  {...register("domFrzOverflights")}
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

      <Card
        id="intl-itinerary"
        className="bg-white shadow-sm"
        style={{ display: "none" }}
      >
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
              <Input className="h-8" {...register("applicationDate")} />
            </div>
          </Section>

          <Section title="Waiver Period">
            <div className="grid grid-cols-2 items-center gap-2">
              <Label className="text-sm font-medium text-gray-700">
                Waiver Start Date <span className="text-red-500">*</span>
              </Label>
              <Input className="h-8" {...register("startDate")} />
              <Label className="text-sm font-medium text-gray-700">
                Waiver End Date <span className="text-red-500">*</span>
              </Label>
              <Input className="h-8" {...register("endDate")} />
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

      <Card id="uas-itinerary" className="bg-white shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">
            Unmanned Aircraft Itinerary
          </h2>
        </div>

        <div className="p-4 grid grid-cols-2 gap-x-2 gap-y-4">
          <Section title="Basic Information">
            <div className="grid grid-cols-2 items-center gap-2">
              <Label className="text-sm font-medium text-gray-700">
                Waiver Subtype <span className="text-red-500">*</span>
              </Label>
              <Input
                disabled
                className="h-8"
                value="UAS"
                placeholder="UAS"
                {...register("waiverSubtype")}
              />
              <Label className="text-sm font-medium text-gray-700">
                Approved Distance <span className="text-red-500">*</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-3 w-3 ml-2 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm">
                        This field will be filled in by a TSA analyst.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input
                className="h-8"
                disabled
                {...register("uasApprovedDistance")}
              />
              <Label className="text-sm font-medium text-gray-700">
                Application Date <span className="text-red-500">*</span>
              </Label>
              <Input className="h-8" {...register("applicationDate")} />
            </div>
          </Section>

          <Section title="Waiver Period">
            <div className="grid grid-cols-2 items-center gap-2">
              <Label className="text-sm font-medium text-gray-700">
                Waiver Start Date <span className="text-red-500">*</span>
              </Label>
              <Input className="h-8" {...register("startDate")} />
              <Label className="text-sm font-medium text-gray-700">
                Waiver End Date <span className="text-red-500">*</span>
              </Label>
              <Input className="h-8" {...register("endDate")} />
            </div>
          </Section>
          <div className="col-span-2">
            <Section title="UAS Location Information">
              <div className="grid grid-cols-4 gap-2 items-center">
                <Label className="text-sm font-medium text-gray-700">
                  Street Address <span className="text-red-500">*</span>
                </Label>
                <Input className="h-8 col-span-3" {...register("destStreet")} />
                <Label className="text-sm font-medium text-gray-700">
                  City <span className="text-red-500">*</span>
                </Label>
                <Input className="h-8 col-span-3" {...register("destCity")} />
                <Label className="text-sm font-medium text-gray-700">
                  State <span className="text-red-500">*</span>
                </Label>
                <Input className="h-8 col-span-3" {...register("destState")} />
                <Label className="text-sm font-medium text-gray-700">
                  Zip Code <span className="text-red-500">*</span>
                </Label>
                <Input className="h-8 col-span-3" {...register("destZip")} />

                <Label className="text-sm font-medium text-gray-700">
                  Distance from DCA VOR <span className="text-red-500">*</span>{" "}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon className="h-3 w-3 ml-2 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm">
                          Bearing and Radial Distance from the DCA VOR including
                          nautical miles (e.g. DCA 270 @ 8.5NM)
                          <br /> <br />
                          UAS First Responders ONLY use &quot;DC FRZ - Agency
                          Jurisdiction&quot;
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>

                <Input
                  className="h-8 col-span-3"
                  {...register("dcaraddist")}
                />
                <Label className="text-sm font-medium text-gray-700">
                  Flight Altitude <span className="text-red-500">*</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon className="h-3 w-3 ml-2 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm">
                          Enter the Above Ground Level (AGL) value
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Input
                  className="h-8 col-span-3"
                  {...register("flightAltitude")}
                />

                <Label className="text-sm font-medium text-gray-700">
                  Coordinates <span className="text-red-500">*</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon className="h-3 w-3 ml-2 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm">
                          Please list the location of the proposed UAS flight
                          with latitude and longitude (Lat/Lon) submitted in
                          degrees/minutes/seconds format and requested radius in
                          nautical miles for operation. <br />
                          EX: XX.XX.XXN / XXX.XX.XXW - .25NM radius
                          <br /> <br />
                          For an extended route of flight, the Lat/Lon should
                          represent waypoints along the proposed route, and
                          should include the requested width. <br />
                          EX: XX.XX.XXN / XXX.XX.XXW - .50NM width either side
                          <br />
                          EX: XX.XX.XXN / XXX.XX.XXW <br />
                          EX: XX.XX.XXN / XXX.XX.XXW <br />
                          EX: XX.XX.XXN / XXX.XX.XXW
                          <br /> <br />
                          For flight areas with 3 or more bounded sides, the
                          Lat/Lon should represent the vertices of the shape and
                          begin with the most northerly point, traversing
                          clockwise. <br />
                          EX: XX.XX.XXN / XXX.XX.XXW <br />
                          EX: XX.XX.XXN / XXX.XX.XXW <br />
                          EX: XX.XX.XXN / XXX.XX.XXW
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Textarea
                  className="h-8 col-span-3"
                  {...register("latLong")}
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
