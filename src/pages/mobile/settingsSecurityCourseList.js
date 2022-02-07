import { i18n } from '../../store/plugins/ui/languages';

export default () => [
  { name: 'intro', title: i18n.t('security-courses.settings.details.intro.title') },
  { name: 'bank', title: i18n.t('security-courses.settings.details.bank.title') },
  { name: 'privacy', title: i18n.t('security-courses.settings.details.privacy.title') },
  { name: 'layers', title: i18n.t('security-courses.settings.details.layers.title') },
].map((course) => ({
  ...course,
  routeName: `settings-security-course-${course.name}`,
}));
