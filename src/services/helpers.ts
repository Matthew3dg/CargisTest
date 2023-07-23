export const convertStatus = (status: string) => {
  switch (status) {
    case 'active':
      return 'Активная';

    case 'on_pause':
      return 'На паузе';
    case 'completed':
      return 'Завершенная';
    default:
      return 'Активная';
  }
};
