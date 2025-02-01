export const lineChartColors = [
  // '#FFA736',
  '#9FC851',
  '#DE8AE6',
  '#4DBBEC',
  '#EA7A81',
  '#479980',
  '#998CE0',
  '#53C1BE',
  '#DCE476',
  '#EB3149',
  '#F4752C',
  '#FCC870',
  '#91C2B3',
  '#94D6F4',
  '#98DAD8',
  '#C2BAEC',
  '#C5DE97',
  '#EAEFAD',
  '#EBB9F0',
  '#F2AFB3',
  '#F38392',
  '#F8AC80',
  '#FDDEA9',
  '#FFCA86',
  '#00331A',
  '#005586',
  '#005B58',
  '#33267A',
  '#396200',
  '#767E10',
  '#782480',
  '#96620A',
  '#994100',
  '#9D2E35',
  '#9E0000',
  '#A72900',
  '#FFFFFF',
];

export const getStrokeColor = (params: { index: number; channel: string }): string => {
  const { index, channel } = params;

  if (channel === 'flip') {
    return '#FACC15';
  }

  if (channel === 'unknown') {
    return '#FFA736';
  }

  return lineChartColors[index % lineChartColors.length];
};
