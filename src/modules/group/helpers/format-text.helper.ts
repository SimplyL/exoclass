export const formatAgeGroup = (ages: number[]) => `${ages.join(',')} year olds`;

export const formatAvailableSpots = (capacity: number, attendees: number) => `${capacity - attendees} spots left`;

export const formatContactDetails = (phone: string, email: string) => `${phone} | ${email}`;
