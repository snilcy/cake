export const ms = {
  fromDays: (days = 1) => days * ms.fromHours(24),
  fromHours: (hours = 1) => hours * ms.fromMinutes(60),
  fromMinutes: (minutes = 1) => minutes * ms.fromSeconds(60),
  fromSeconds: (seconds = 1) => seconds * 1000,
  fromWeek: (weeks = 1) => weeks * ms.fromDays(7),
  fromYears: (years = 1) => years * ms.fromDays(365),
}
