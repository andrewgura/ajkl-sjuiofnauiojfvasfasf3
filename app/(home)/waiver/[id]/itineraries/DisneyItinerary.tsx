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

const disneyParks = [
  { value: "dwfl", label: "Disney World, Florida" },
  { value: "dlca", label: "Disneyland, California" },
];

export default function DisneyItinerary() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<WaiverFormData>();

  return (
    <div>
      <Card id="disney-itinerary" className="bg-white shadow-sm">
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
    </div>
  );
}
