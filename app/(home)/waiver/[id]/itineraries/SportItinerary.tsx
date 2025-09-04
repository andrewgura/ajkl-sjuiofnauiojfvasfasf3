import { useFormContext } from "react-hook-form";
import { WaiverFormData } from "../waiver-validation";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/shared/Section";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SimpleSelect } from "@/components/ui/simple-select";
import DateInput2 from "@/components/shared/DateInput2";

const sportingEvents = [
  { value: "indy", label: "Indy Racing League" },
  { value: "mlb", label: "MLB Game" },
  { value: "nascar", label: "NASCAR Event" },
  { value: "ncaa", label: "NCAA Football Game" },
  { value: "nfl", label: "NFL Event" },
];
const sportVenues = [{ value: "1", label: "Populate from lookup list" }];
const sportPurpose = [
  { value: "aerial", label: "Aerial Demonstration Flyover" },
  { value: "parachute", label: "Parachute Operations" },
  { value: "personnel", label: "Transportation of Event Personnel" },
  { value: "survey", label: "Venue Operations Survey" },
];

export default function SportItinerary() {
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
                value="SPT"
                placeholder="SPT"
                {...register("waiverSubtype")}
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
            <Section title="Disney Specific Information">
              <div className="grid grid-cols-4 items-center gap-2">
                <Label className="text-sm font-medium text-gray-700">
                  Sporting Event <span className="text-red-500">*</span>
                </Label>
                <SimpleSelect
                  options={sportingEvents}
                  className="col-span-3 h-8"
                  {...register("sportEventName")}
                />

                <Label className="text-sm font-medium text-gray-700">
                  Event Venue <span className="text-red-500">*</span>
                </Label>
                <SimpleSelect
                  options={sportVenues}
                  className="col-span-3 h-8"
                  {...register("sportEventVenue")}
                />

                <Label className="text-sm font-medium text-gray-700">
                  Previous Venue Name
                </Label>
                <Input
                  className="col-span-3 h-8"
                  {...register("sportPrevVenueName")}
                />

                <Label className="text-sm font-medium text-gray-700">
                  Venue City <span className="text-red-500">*</span>
                </Label>
                <Input className="col-span-3 h-8" {...register("sportCity")} />

                <Label className="text-sm font-medium text-gray-700">
                  Venue State <span className="text-red-500">*</span>
                </Label>
                <Input className="col-span-3 h-8" {...register("sportState")} />

                <Label className="text-sm font-medium text-gray-700">
                  Flight Altitude <span className="text-red-500">*</span>
                </Label>
                <Input
                  className="col-span-3 h-8"
                  {...register("flightAltitude")}
                />
              </div>
            </Section>
          </div>

          <div className="col-span-2">
            <Section title="Purpose of Flight/ Comments">
              <SimpleSelect
                options={sportPurpose}
                className="h-8 py-1"
                placeholder="Select a Purpose"
                {...register("purposeComments")}
              />
            </Section>
          </div>
        </div>
      </Card>
    </div>
  );
}
