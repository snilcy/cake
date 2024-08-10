export const ms = {
  fromDays: (days: number = 1) => days * ms.fromHours(24),
  fromHours: (hours: number = 1) => hours * ms.fromMinutes(60),
  fromMinutes: (minutes: number = 1) => minutes * ms.fromSeconds(60),
  fromSeconds: (seconds: number = 1) => seconds * 1000,
  fromWeek: (weeks: number = 1) => weeks * ms.fromDays(7),
  fromYears: (years: number = 1) => years * ms.fromDays(365),
}
