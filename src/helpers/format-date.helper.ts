import { format } from 'date-fns';
import { weekdays } from '@/defaults/dates.default';
import { GroupItemSchedule } from '@/interfaces/group-list.interface';

export const formatMonthAndDay = (date: string): string => {
  return format(date, 'MMMM d');
};

export const formatDuration = (startDate: string, endDate: string): string => {
  const formattedStartDate = format(startDate, 'MMMM d yyyy');
  const formattedEndDate = format(endDate, 'MMMM d yyyy');

  return `${formattedStartDate} - ${formattedEndDate}`;
};

const formatDayName = (day: string): string => {
  return weekdays[parseInt(day) - 1];
};

const formatTime = (time: string) => {
  return format(new Date(`1970-01-01T${time}`), 'HH:mm');
};

export const getGroupSchedule = (schedule: GroupItemSchedule[]) => {
  const mergedData: { days: string[]; startTime: string; endTime: string }[] = [];

  schedule.forEach(({ day, start_time, end_time }) => {
    const formattedDay = formatDayName(day);
    const formattedStartTime = formatTime(start_time);
    const formattedEndTime = formatTime(end_time);

    const lastMerged = mergedData[mergedData.length - 1];

    if (lastMerged && lastMerged.endTime === formattedEndTime) {
      // If the end time matches the previous end time, merge the day
      lastMerged.days.push(formattedDay);
    } else {
      // Otherwise, create a new merged entry
      mergedData.push({
        days: [formattedDay],
        startTime: formattedStartTime,
        endTime: formattedEndTime,
      });
    }
  });

  const formattedMergedData = mergedData.map(({ days, startTime, endTime }) => {
    const formattedDays = days.join(', ');
    return `${formattedDays} ${startTime} - ${endTime}`;
  });

  return formattedMergedData.join(', ');
};
