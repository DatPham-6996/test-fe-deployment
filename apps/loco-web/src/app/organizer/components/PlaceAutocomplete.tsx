import { useEffect } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { useRef } from 'react';
import { Input } from '@/components/shadcn/ui/input';
import { useState } from 'react';
import { useIntl } from 'react-intl';

interface PlaceAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

const PlaceAutocomplete = ({ onPlaceSelect }: PlaceAutocompleteProps) => {
  const { formatMessage } = useIntl();
  const [placeAutocomplete, setPlaceAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary('places');

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ['geometry', 'name', 'formatted_address', 'address_components'],
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener('place_changed', () => {
      onPlaceSelect(placeAutocomplete.getPlace());
    });
  }, [onPlaceSelect, placeAutocomplete]);

  return (
    <div className="mx-5">
      <Input
        ref={inputRef}
        className="focus-visible:ring-transparent"
        placeholder={formatMessage({ id: 'organizer.event.enterLocation' })}
      />
    </div>
  );
};

export default PlaceAutocomplete;
