export const WaiverType = {
  DASSP: "DASSP",
  Disney: "Disney",
  Domestic: "Domestic",
  International: "International",
  MooredBalloon: "Moored Balloon",
  SpecialEvent: "Special Event",
  SportingEvent: "Sporting Event",
  UnmannedAircraftSystem: "Unmanned Aircraft System",
} as const;

// To get the type
export type WaiverType = (typeof WaiverType)[keyof typeof WaiverType];

//TODO: Get all possible steps
export type ProcessStepType =
    | "TSA Assigned"
    | "IAPWG Review"
    | "Ready For FAA"
    | "Ready for QA"