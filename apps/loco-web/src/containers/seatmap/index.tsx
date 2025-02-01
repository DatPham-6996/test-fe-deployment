'use client';

import Loader from '@/components/loading-indicator/Loader';
import { useResponsiveDialog } from '@/components/responsive-dialog/responsive-dialog-context';
import { SeatMap, SvgAttributes, SvgElement } from '@/components/seatmap';
import { GetSeatMapQuery } from '@/lib/__generated__/graphql';
import { toastInfo } from '@/lib/utils/toast';
import { tiersState } from '@/state-management/seatmap/atoms/all-tiers-state';
import { entityIdToSectionNameState } from '@/state-management/seatmap/atoms/entity-id-to-section-name-state';
import { entityIdToTierIdState } from '@/state-management/seatmap/atoms/entity-id-to-tier-id-state';
import { gaSectionInventoryState } from '@/state-management/seatmap/atoms/ga-section-inventory-state';
import { selectedEntitiesState } from '@/state-management/seatmap/atoms/selected-entities-state';
import { unavailableSeatsState } from '@/state-management/seatmap/atoms/unavailable-seats-state';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useRecoilState, useRecoilValue } from 'recoil';
import parseStyleToObject from 'style-to-object';
import { v4 as uuidv4 } from 'uuid';
import { selectedSeatsState } from '../../state-management/seatmap/atoms/selected-seats-state';
import { GASectionQuantitySelector } from './components/GASectionQuantitySelector';

type SeatMapContainerProps = {
  seatMap: GetSeatMapQuery | undefined;
  eventId: string;
  maxTicketPerOrder: number;
};

export const SeatMapContainer = ({ seatMap, eventId, maxTicketPerOrder }: SeatMapContainerProps) => {
  const [selectedSeats, setSelectedSeats] = useRecoilState<Set<string>>(selectedSeatsState(eventId));
  const [selectedEntities, setSelectedEntities] = useRecoilState<string[]>(selectedEntitiesState(eventId));
  const unavailableSeats = useRecoilValue(unavailableSeatsState(eventId));
  const gaSectionInventory = useRecoilValue(gaSectionInventoryState(eventId));
  const [entityIdToTierId, setEntityIdToTierId] = useRecoilState<Map<string, string>>(entityIdToTierIdState(eventId));
  const [entityIdToSectionName, setEntityIdToSectionName] = useRecoilState<Map<string, string>>(
    entityIdToSectionNameState(eventId)
  );
  const [seatMapSvg, setSeatMapSvg] = useState<SvgElement | null>(null);
  const { formatMessage } = useIntl();
  const { openDialog, closeDialog } = useResponsiveDialog();
  const tiers = useRecoilValue(tiersState(eventId));

  useEffect(() => {
    const fetchSvg = async () => {
      if (!seatMap) return;

      try {
        const response = await axios.get(seatMap.getEventSeatMap.seatMapUrl, {
          headers: {
            'Content-Type': 'image/svg+xml',
            /// Our seat map svg is fragile, it might contains outdated/incorrect ids and drawings,
            /// so we don't want to enable caching at the moment
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
            Expires: '0',
          },
        });

        const svgElement = convertSvgToSvgElement(response.data);
        if (!svgElement) return;

        setSeatMapSvg(svgElement);
      } catch (error) {
        console.error('Error fetching the SVG:', error);
      }
    };

    fetchSvg();
  }, [seatMap]);

  const onSeatClick = (seatId: string, tierId: string, sectionName: string) => {
    if (unavailableSeats?.has(seatId)) return;

    const newSelectedSeats = new Set(selectedSeats);
    const newEntityIdToTierId = new Map(entityIdToTierId);
    const newSelectedEntities = [...selectedEntities];
    const newEntityIdToSectionName = new Map(entityIdToSectionName);

    if (!newSelectedSeats.has(seatId) && selectedEntities.length === maxTicketPerOrder) {
      toastInfo(formatMessage({ id: 'seatReservation.maxTicketPerOrderToast' }));
      return;
    }

    if (newSelectedSeats.has(seatId)) {
      newSelectedSeats.delete(seatId);
      newEntityIdToTierId.delete(seatId);
      newSelectedEntities.splice(newSelectedEntities.indexOf(seatId), 1);
      newEntityIdToSectionName.delete(seatId);
    } else {
      newSelectedSeats.add(seatId);
      newEntityIdToTierId.set(seatId, tierId);
      newSelectedEntities.push(seatId);
      newEntityIdToSectionName.set(seatId, sectionName);
    }

    setSelectedSeats(newSelectedSeats);
    setEntityIdToTierId(newEntityIdToTierId);
    setSelectedEntities(newSelectedEntities);
    setEntityIdToSectionName(newEntityIdToSectionName);
  };

  const onGASectionClick = (sectionId: string, tierId: string, sectionName: string) => {
    const sectionInfo = { id: sectionId, tierId };
    const tier = tiers.get(tierId);

    if (!tier) return;

    openDialog(
      <GASectionQuantitySelector
        sectionInfo={sectionInfo}
        maxTicketPerOrder={maxTicketPerOrder}
        sectionInventory={gaSectionInventory.get(sectionId)}
        currentSelectedCount={selectedEntities.length}
        tier={tier}
        sectionName={sectionName}
        onAdd={(section, quantity) => {
          handleGAAddWithSection({ ...section, name: sectionName }, quantity);
          closeDialog();
        }}
      />
    );
  };

  const handleGAAddWithSection = (section: { id: string; tierId: string; name: string }, quantity: number) => {
    const remainingSlots = maxTicketPerOrder - selectedEntities.length;
    if (quantity > remainingSlots) {
      toastInfo(formatMessage({ id: 'seatReservation.maxTicketPerOrderToast' }));
      return;
    }

    const newEntityIdToTierId = new Map(entityIdToTierId);
    const newEntityIdToSectionName = new Map(entityIdToSectionName);
    const newSelectedEntities = [...selectedEntities];

    for (let i = 0; i < quantity; i++) {
      // We transformed sectionId to sectionId-uuid to avoid rendering issue
      const transformedSectionId = `${section.id}-${uuidv4()}`;
      newSelectedEntities.push(transformedSectionId);
      newEntityIdToTierId.set(transformedSectionId, section.tierId);
      newEntityIdToSectionName.set(transformedSectionId, section.name);
    }

    setEntityIdToSectionName(newEntityIdToSectionName);
    setEntityIdToTierId(newEntityIdToTierId);
    setSelectedEntities(newSelectedEntities);
  };

  if (!seatMapSvg) {
    return (
      <div className="h-full w-full place-content-center items-center flex flex-row">
        <Loader className="w-5" size={12} />
      </div>
    );
  }

  return (
    <SeatMap
      seatMapConfig={seatMapSvg}
      eventId={eventId}
      onSeatClick={onSeatClick}
      onGASectionClick={onGASectionClick}
      selectedSeats={selectedSeats}
      unavailableSeats={unavailableSeats}
      gaSectionInventory={gaSectionInventory}
    />
  );
};

const parseAttributes = (attributes: NamedNodeMap): SvgAttributes => {
  const attrs: SvgAttributes = {};
  for (let i = 0; i < attributes.length; i++) {
    const attr = attributes.item(i);
    if (attr) {
      let attrName = attr.name;
      let attrValue: string | Record<string, string> = attr.value;

      // Handle style attribute conversion
      if (attrName === 'style') {
        attrValue = parseStyleToObject(attrValue) ?? {};
        attrs['style'] = attrValue;
      } else {
        // Handle other attribute name conversions
        switch (attrName) {
          case 'stroke-width':
            attrName = 'strokeWidth';
            break;
          case 'xmlns:xlink':
            attrName = 'xmlnsXlink';
            break;
          case 'enable-background':
            attrName = 'enableBackground';
            break;
          case 'xml:space':
            attrName = 'xmlSpace';
            break;
          case 'stroke-linecap':
            attrName = 'strokeLinecap';
            break;
        }
        attrs[attrName] = attrValue;
      }
    }
  }

  return attrs;
};

const parseSvgElement = (element: Element, parentName: string = ''): SvgElement => {
  const children: SvgElement[] = [];

  for (let i = 0; i < element.children.length; i++) {
    const child = element.children.item(i);
    if (child) {
      children.push(parseSvgElement(child, element.tagName));
    }
  }

  return {
    name: element.tagName,
    type: element.tagName,
    value: element.textContent || '',
    parent: parentName,
    attributes: parseAttributes(element.attributes),
    children: children,
  };
};

const convertSvgToSvgElement = (svgString: string): SvgElement | null => {
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');

  const svgElement = svgDoc.querySelector('svg');

  if (svgElement) {
    return parseSvgElement(svgElement);
  }

  return null;
};
