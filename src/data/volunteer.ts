export const volunteerRoles = [
  {
    title: "Field Volunteer",
    description: "Help organise and participate in nature walks, surveys and biodiversity activities.",
    icon: "binoculars",
  },
  {
    title: "Education Volunteer",
    description: "Help with workshops, school activities and environmental education.",
    icon: "graduation",
  },
  {
    title: "Science Volunteer",
    description: "Assist with biodiversity recording, monitoring and citizen-science projects.",
    icon: "flask",
  },
  {
    title: "Communications Volunteer",
    description: "Help with photography, writing, social media and storytelling.",
    icon: "camera",
  },
  {
    title: "Event Volunteer",
    description: "Help organise community events and activities.",
    icon: "calendar",
  },
] as const;

export type VolunteerRole = (typeof volunteerRoles)[number]["title"];

export const interestOptions = [
  "Joining Exploring Neighbourhood",
  "Volunteering",
  "Bird Walks",
  "Frog Walks",
  "Sky Watch",
  "Citizen Science",
  "Research",
  "Partnership",
  "Education",
  "Other",
] as const;
