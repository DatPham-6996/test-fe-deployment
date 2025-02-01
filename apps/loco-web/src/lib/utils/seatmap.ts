import { SectionDisplay, SeatDisplay } from '../types';

export function displaySeatId(seatId: string): SeatDisplay {
  const [sectionId, rowId, positionId] = seatId.split('-');
  return {
    id: seatId,
    section: sectionId?.split('_')[1],
    row: rowId?.split('_')[1],
    position: positionId?.split('_')[1],
  };
}

export function displaySectionId(sectionId: string): SectionDisplay {
  return {
    id: sectionId,
  };
}
