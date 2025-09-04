import { useFormContext } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/shared/Section";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { WaiverFormData } from "../waiver-validation";
import DateInput2 from "@/components/shared/DateInput2";

export default function DasspItinerary() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<WaiverFormData>();

  return (
    <div>
      <Card id="dassp_itinerary" className="bg-white shadow-sm">
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
              <DateInput2 className="h-8" value={watch("applicationDate")} {...register("applicationDate")} />
            </div>
          </Section>

          <Section title="Waiver Period">
            <div className="grid grid-cols-2 items-center gap-2">
              <Label className="text-sm font-medium text-gray-700">
                Waiver Start Date <span className="text-red-500">*</span>
              </Label>
              <DateInput2 className="h-8" value={watch("startDate")} {...register("startDate")} />
              <Label className="text-sm font-medium text-gray-700">
                Waiver End Date <span className="text-red-500">*</span>
              </Label>
              <DateInput2 className="h-8" value={watch("endDate")} {...register("endDate")} />
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
              <DateInput2 className="h-8" value={watch("deptDate")} {...register("deptDate")} />
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
              <DateInput2 className="h-8" value={watch("arrivDate")} {...register("arrivDate")} />
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
              <DateInput2 className="h-8" value={watch("deptDateDca")} {...register("deptDateDca")} />
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
    </div>
  );
}
