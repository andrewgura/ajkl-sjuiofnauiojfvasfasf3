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

export default function DomesticItinerary() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<WaiverFormData>();

  return (
    <div>
      <Card id="domestic-itinerary" className="bg-white shadow-sm">
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
    </div>
  );
}
