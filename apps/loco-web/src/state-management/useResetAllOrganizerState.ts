// useResetAllState.js
import { useResetRecoilState } from 'recoil';
import { currentEventState } from './organizer/atoms/current-event';
import { currentOrgState } from './organizer/atoms/current-org';

const useResetAllOrganizerState = () => {
  const resetSelectedEventState = useResetRecoilState(currentEventState);
  const resetSelectedOrgState = useResetRecoilState(currentOrgState);

  const resetAllState = () => {
    resetSelectedEventState();
    resetSelectedOrgState();
  };

  return resetAllState;
};

export default useResetAllOrganizerState;
