export const getCountryFlag = (country: string) => {
  switch (country) {
    case 'france':
      return '🇫🇷';
    case 'italy':
      return '🇮🇹';
    case 'spain':
      return '🇪🇸';
    default:
      return '';
  }
};
