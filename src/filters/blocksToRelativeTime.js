import { i18n } from '../store/plugins/ui/languages';

export default (blocks) => {
  const minutes = blocks * 3;
  const minutesPerHour = 60;
  const minutesPerDay = minutesPerHour * 24;

  if (minutes < minutesPerHour) {
    return `~${i18n.tc('minutes', Math.round(minutes))}`;
  }
  if (minutes < minutesPerDay) {
    return `~${i18n.tc('hours', Math.round(minutes / minutesPerHour))}`;
  }
  return `~${i18n.tc('days', Math.round(minutes / minutesPerDay))}`;
};
