import { Section } from "@/components/shared/Section";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFormContext, useWatch } from "react-hook-form";
import { WaiverFormData } from "./waiver-validation";

/**
 * Maps the title value to a displayable label.
 * @param {string | undefined} value - The value of the title from the form data.
 * @returns {string} The displayable title label.
 */
const getTitleLabel = (value: string | undefined): string => {
  const titles = [
    { value: "Mr.", label: "Mr." },
    { value: "Mrs.", label: "Mrs." },
    { value: "Ms.", label: "Ms." },
    { value: "Miss", label: "Miss" },
    { value: "Dr.", label: "Dr." },
  ];
  return titles.find(t => t.value === value)?.label || '';
};

export default function Summary() {
  const { control } = useFormContext<WaiverFormData>();
  const formData = useWatch({ control });

  if (!formData) {
    return <div>Loading summary...</div>;
  }
  return (
    <div>
      <Card className="bg-white shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">
            Waiver Request Summary
          </h2>
        </div>

        <div className="p-4 space-y-2">
          <Section title="Proponent Information">
            <div className="grid grid-cols-7 gap-x-5 gap-y-1 items-center">
              <div></div>
              <div className="justify-items-center font-semibold col-span-2">
                <div className="justify-items-center">Requester</div>
              </div>
              <div className="justify-items-center font-semibold col-span-2">
                <div className="justify-items-center font-semibold col-span-2">
                  <div className="justify-items-center">Operator</div>
                </div>
              </div>
              <div className="justify-items-center font-semibold col-span-2">
                <div className="justify-items-center font-semibold col-span-2">
                  <div className="justify-items-center">Owner</div>
                </div>
              </div>

              {/* TODO: DRY up this form! */}

              <div className="text-sm font-medium text-gray-700">Title</div>
              <div className="col-span-2">{getTitleLabel(formData.reqTitle)}</div>
              <div className="col-span-2">{getTitleLabel(formData.opTitle)}</div>
              <div className="col-span-2">{getTitleLabel(formData.ownTitle)}</div>

              <div className="text-sm font-medium text-gray-700">First Name</div>
              <div className="col-span-2">{formData.reqFirstName}</div>
              <div className="col-span-2">{formData.opFirstName}</div>
              <div className="col-span-2">{formData.ownFirstName}</div>

              <div className="text-sm font-medium text-gray-700">Middle Name</div>
              <div className="col-span-2">{formData.reqMiddleName}</div>
              <div className="col-span-2">{formData.opMiddleName}</div>
              <div className="col-span-2">{formData.ownMiddleName}</div>

              <div className="text-sm font-medium text-gray-700">Last Name</div>
              <div className="col-span-2">{formData.reqLastName}</div>
              <div className="col-span-2">{formData.opLastName}</div>
              <div className="col-span-2">{formData.ownLastName}</div>

              <div className="text-sm font-medium text-gray-700">Organization</div>
              <div className="col-span-2">{formData.reqOrganization}</div>
              <div className="col-span-2">{formData.opOrganization}</div>
              <div className="col-span-2">{formData.ownOrganization}</div>

              <div className="text-sm font-medium text-gray-700">Street Address</div>
              <div className="col-span-2">{formData.reqStreetAddress}</div>
              <div className="col-span-2">{formData.opStreetAddress}</div>
              <div className="col-span-2">{formData.ownStreetAddress}</div>

              <div className="text-sm font-medium text-gray-700">City</div>
              <div className="col-span-2">{formData.reqCity}</div>
              <div className="col-span-2">{formData.opCity}</div>
              <div className="col-span-2">{formData.ownCity}</div>

              <div className="text-sm font-medium text-gray-700">State/Province</div>
              <div className="col-span-2">{formData.reqState}</div>
              <div className="col-span-2">{formData.opState}</div>
              <div className="col-span-2">{formData.ownState}</div>

              <div className="text-sm font-medium text-gray-700">Zip Code</div>
              <div className="col-span-2">{formData.reqZipCode}</div>
              <div className="col-span-2">{formData.opZipCode}</div>
              <div className="col-span-2">{formData.ownZipCode}</div>

              <div className="text-sm font-medium text-gray-700">Country</div>
              <div className="col-span-2">{formData.reqCountry}</div>
              <div className="col-span-2">{formData.opCountry}</div>
              <div className="col-span-2">{formData.ownCountry}</div>

              <div className="text-sm font-medium text-gray-700">Phone Number</div>
              <div className="col-span-2">{formData.reqPrimaryPhone}</div>
              <div className="col-span-2">{formData.opPrimaryPhone}</div>
              <div className="col-span-2">{formData.ownPrimaryPhone}</div>

              <div className="text-sm font-medium text-gray-700">24-hour Phone</div>
              <div className="col-span-2">{formData.req24hPhone}</div>
              <div className="col-span-2">{formData.op24hPhone}</div>
              <div className="col-span-2">{formData.own24hPhone}</div>

              <div className="text-sm font-medium text-gray-700">Primary Email</div>
              <div className="col-span-2">{formData.reqPrimaryEmail}</div>
              <div className="col-span-2">{formData.opPrimaryEmail}</div>
              <div className="col-span-2">{formData.ownPrimaryEmail}</div>

              <div className="text-sm font-medium text-gray-700">Secondary Email</div>
              <div className="col-span-2">{formData.reqAdditionalEmails}</div>
              <div className="col-span-2">{formData.opAdditionalEmails}</div>
              <div className="col-span-2">{formData.ownAdditionalEmails}</div>
            </div>
          </Section>
{/** TODO: Itinerary Summary section also need to be broken into different types, just like Itinerary tab itself! */}
          <Section title="Itinerary">
            <div className="grid grid-cols-4 gap-x-2">
              <div className="text-sm font-medium text-gray-700">
                Waiver Subtype
              </div>
              <div>{formData.waiverSubtype}</div>
              <div className="text-sm font-medium text-gray-700">
                Application Date
              </div>
              <div>{formData.applicationDate}</div>
              <div className="text-sm font-medium text-gray-700">
                Start Date
              </div>
              <div>{formData.startDate}</div>
              <div className="text-sm font-medium text-gray-700">End Date</div>
              <div>{formData.endDate}</div>
              <div className="text-sm font-medium text-gray-700">
                DASSP Company Name
              </div>
              <div>{formData.dasspCompanyName}</div>
              <div className="text-sm font-medium text-gray-700">
                DASSP Operator Number
              </div>
              <div>{formData.dasspOperatorNum}</div>
              <div className="text-sm font-medium text-gray-700">
                DASSP Security Coordinator
              </div>
              <div>{formData.dasCoordinator}</div>
              <div className="text-sm font-medium text-gray-700">
                Departure Airport Code
              </div>
              <div>{formData.dasspDepartAirport}</div>
              <div className="text-sm font-medium text-gray-700">
                Departure Gateway FBO
              </div>
              <div>{formData.dasspDepartFbo}</div>
              <div className="text-sm font-medium text-gray-700">
                Departure Date
              </div>
              <div>{formData.deptDate}</div>
              <div className="text-sm font-medium text-gray-700">
                Departure Time
              </div>
              <div>{formData.deptTime}</div>
              <div className="text-sm font-medium text-gray-700">
                DCA Arrival Date
              </div>
              <div>{formData.arrivDate}</div>
              <div className="text-sm font-medium text-gray-700">
                DCA Arrival Time
              </div>
              <div>{formData.arrivTime}</div>
              <div className="text-sm font-medium text-gray-700">
                DCA Departure Date
              </div>
              <div>{formData.deptDateDca}</div>
              <div className="text-sm font-medium text-gray-700">
                DCA Departure Time
              </div>
              <div>{formData.deptTimeDca}</div>
              <div className="text-sm font-medium text-gray-700">
                Destination Airport
              </div>
              <div>{formData.dasspDestAirport}</div>
              <div className="text-sm font-medium text-gray-700">Purpose</div>
              <div>{formData.purposeComments}</div>
            </div>
          </Section>

          <Section title="Aircraft Information">
            <Table className="bg-white rounded-lg border border-slate-200 shadow-sm">
              <TableHeader>
                <TableRow className="bg-slate-50/80">
                  <TableHead className="text-slate-700">Tail Number</TableHead>
                  <TableHead className="text-slate-700">Call Sign</TableHead>
                  <TableHead className="text-slate-700">
                    Aircraft Type
                  </TableHead>
                  <TableHead className="text-slate-700">Country</TableHead>
                  <TableHead className="text-slate-700">Gross Weight</TableHead>
                  <TableHead className="text-slate-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-20 text-center text-slate-500"
                  >
                    <span className="text-sm">
                      No Registered Aircraft Found
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Section>

          <Section title="Manifest">
            <Table className="bg-white rounded-lg border border-slate-200 shadow-sm">
              <TableHeader>
                <TableRow className="bg-slate-50/80">
                  <TableHead className="text-slate-700">Person Type</TableHead>
                  <TableHead className="text-slate-700">First Name</TableHead>
                  <TableHead className="text-slate-700">M.I.</TableHead>
                  <TableHead className="text-slate-700">Last Name</TableHead>
                  <TableHead className="text-slate-700">Sex</TableHead>
                  <TableHead className="text-slate-700">Birth Date</TableHead>
                  <TableHead className="text-slate-700">Birth City</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-20 text-center text-slate-500"
                  >
                    <span className="text-sm">
                      No Manifest Information Found
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Section>

          <Section title="Security Information">
            <div className="grid grid-cols-4 gap-2">
              <div className="text-sm font-medium text-gray-700">
                Non-operational Security Measures
              </div>
              <div className="col-span-3"></div>
              <div className="text-sm font-medium text-gray-700">
                Manifest Identification
              </div>
              <div className="col-span-3"></div>
              <div className="text-sm font-medium text-gray-700">
                Additional Security Measures
              </div>
              <div className="col-span-3"></div>
            </div>
          </Section>
        </div>
      </Card>
    </div>
  );
}
