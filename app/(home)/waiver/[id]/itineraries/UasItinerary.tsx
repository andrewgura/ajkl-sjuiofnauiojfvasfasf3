import { useFormContext } from "react-hook-form";
import { WaiverFormData } from "../waiver-validation";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/shared/Section";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";
import DateInput2 from "@/components/shared/DateInput2";

export default function UasItinerary() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<WaiverFormData>();

  return (
    <div>
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
