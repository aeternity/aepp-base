export default [
  { name: 'intro', title: 'Intro & Disclaimer' },
  { name: 'bank', title: 'You are the bank' },
  { name: 'privacy', title: 'Your privacy' },
  { name: 'layers', title: 'Security layers' },
].map(course => ({
  ...course,
  routeName: `settings-security-course-${course.name}`,
}));
