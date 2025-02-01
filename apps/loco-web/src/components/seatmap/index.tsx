'use client';

import { useIsDarkTheme } from '@/state-management/hooks/useIsDarkMode';
import { showSeatLabelState } from '@/state-management/seatmap/atoms/show-seat-label-state';
import { CheckIcon, SlashIcon } from 'lucide-react';
import React, { memo } from 'react';
import { useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

export type SvgAttributes = {
  style?: Record<string, string>;
} & {
  [key: string]: string;
};

export type SvgElement = {
  name: string;
  type: string;
  value: string;
  parent: string;
  attributes: SvgAttributes;
  children: SvgElement[];
};

export type SeatMapProps = {
  seatMapConfig: SvgElement;
  selectedSeats?: Set<string>;
  unavailableSeats?: Set<string>;
  gaSectionInventory?: Map<string, number>;
  eventId: string;
  onSeatClick?: (seatId: string, tierId: string, sectionName: string) => void;
  onGASectionClick?: (sectionId: string, tierId: string, sectionName: string) => void;
};

type SVGProps = React.SVGAttributes<SVGElement> & {
  key: string;
};

type RenderConfig = {
  selectedSeats?: Set<string>;
  unavailableSeats?: Set<string>;
  onSeatClick?: (seatId: string, tierId: string, sectionName: string) => void;
  onGASectionClick?: (sectionId: string, tierId: string, sectionName: string) => void;
  isDarkMode?: boolean;
  gaSectionInventory?: Map<string, number>;
};

// Create a memoized seat label component
const SeatLabel = memo(function SeatLabel({
  attributes,
  name,
  value,
  isHidden,
  eventId,
}: {
  attributes: SvgAttributes;
  name: string;
  value: string;
  isHidden: boolean;
  eventId: string;
}) {
  const showSeatLabel = useRecoilValue(showSeatLabelState(eventId));

  const labelProps = {
    ...attributes,
    style: {
      ...attributes.style,
      pointerEvents: 'none',
      opacity: isHidden || !showSeatLabel ? 0 : 1,
      transition: 'opacity 0.2s ease-in-out',
    },
    key: attributes.id || uuidv4(),
  };

  return React.createElement(name, labelProps, value);
});

// Create a memoized seat component
const SeatElement = memo(function SeatElement({
  name,
  props,
  seatId,
  attributes,
  renderedChildren,
  config,
}: {
  name: string;
  props: SVGProps;
  seatId: string;
  attributes: SvgAttributes;
  renderedChildren: React.ReactNode[];
  config: RenderConfig;
}) {
  return renderSeat(name, props, seatId, attributes, renderedChildren, config);
});

// Create a memoized GA section component
const GASectionElement = memo(function GASectionElement({
  name,
  props,
  sectionId,
  attributes,
  renderedChildren,
  config,
}: {
  name: string;
  props: SVGProps;
  sectionId: string;
  attributes: SvgAttributes;
  renderedChildren: React.ReactNode[];
  config: RenderConfig;
}) {
  return renderGASection(name, props, sectionId, attributes, renderedChildren, config);
});

// Memoize the main SeatMap component
export const SeatMap = memo(function SeatMap(props: SeatMapProps) {
  const isDarkMode = useIsDarkTheme();
  return renderComponent(props, isDarkMode);
});

function renderComponent(
  {
    seatMapConfig,
    selectedSeats,
    unavailableSeats,
    onSeatClick,
    onGASectionClick,
    gaSectionInventory,
    eventId,
  }: SeatMapProps,
  isDarkMode: boolean
): React.ReactNode | null {
  const { name, type, value, attributes, children } = seatMapConfig;
  const props: SVGProps = { ...attributes, key: attributes['id'] || uuidv4() };

  // Handle seat groups
  if (name === 'g' && children.length === 2) {
    const seatElement = children.find((child) => child.attributes['data-entity-type'] === 'seat');
    if (seatElement) {
      const seatId = seatElement.attributes.id;
      const isHidden = selectedSeats?.has(seatId) || unavailableSeats?.has(seatId);

      // Render children directly with modified visibility
      const renderedChildren = children.map((child) => {
        if (child.attributes['data-entity-type'] === 'seat-label') {
          return (
            <SeatLabel
              key={child.attributes.id || uuidv4()}
              attributes={child.attributes}
              name={child.name}
              value={child.value}
              isHidden={isHidden ?? false}
              eventId={eventId}
            />
          );
        }

        return renderComponent(
          {
            seatMapConfig: child,
            selectedSeats,
            unavailableSeats,
            onSeatClick,
            onGASectionClick,
            gaSectionInventory,
            eventId,
          },
          isDarkMode
        );
      });

      return React.createElement(name, props, renderedChildren);
    }
  }

  if (name === 'style') {
    return renderStyleElement(name, props, value);
  }

  if (type === 'text') {
    return React.createElement(name, props, value);
  }

  handleDarkModeStyles(props, isDarkMode);

  const renderedChildren = children.map((child: SvgElement) =>
    renderComponent(
      {
        seatMapConfig: child,
        selectedSeats,
        onSeatClick,
        unavailableSeats,
        onGASectionClick,
        gaSectionInventory,
        eventId,
      },
      isDarkMode
    )
  );

  const elementId = attributes['id'];

  if (isSeatElement(name, elementId, attributes)) {
    return (
      <SeatElement
        name={name}
        props={props}
        seatId={elementId}
        attributes={attributes}
        renderedChildren={renderedChildren}
        config={{
          selectedSeats,
          unavailableSeats,
          onSeatClick,
          isDarkMode,
        }}
      />
    );
  }

  if (isGASection(attributes)) {
    return (
      <GASectionElement
        name={name}
        props={props}
        sectionId={elementId}
        attributes={attributes}
        renderedChildren={renderedChildren}
        config={{
          selectedSeats,
          onGASectionClick,
          isDarkMode,
          gaSectionInventory,
        }}
      />
    );
  }

  return React.createElement(name, props, renderedChildren);
}

function renderStyleElement(name: string, props: SVGProps, value: string) {
  return React.createElement(name, {
    ...props,
    dangerouslySetInnerHTML: { __html: value },
  });
}

function handleDarkModeStyles(props: SVGProps, isDarkMode: boolean) {
  if (!isDarkMode) return;

  const colorMap: Record<string, string> = {
    // Disable dark mode mapping colors for now
  };

  if (props.stroke && props.stroke in colorMap) {
    props.stroke = colorMap[props.stroke];
  }

  if (props.fill && props.fill in colorMap) {
    props.fill = colorMap[props.fill];
  }
}

function isSeatElement(name: string, elementId: string, attributes: SvgAttributes): boolean {
  const seatIdPattern = /^section_.*-row_.*-seat_.*$/;
  const isSeatElementInOldSeatMapPattern = name === 'circle' && seatIdPattern.test(elementId);
  const isSeatElementInNewSeatMapPattern = attributes['data-entity-type'] === 'seat';
  return isSeatElementInOldSeatMapPattern || isSeatElementInNewSeatMapPattern;
}

function isGASection(attributes: SvgAttributes): boolean {
  return attributes['data-entity-type'] === 'ga-section';
}

function createSlashIcon(attributes: SvgAttributes) {
  const slashIconSize = parseFloat(attributes.r) * 0.9;
  return (
    <SlashIcon
      x={parseFloat(attributes.cx) - slashIconSize / 2}
      y={parseFloat(attributes.cy) - slashIconSize / 2}
      size={slashIconSize}
      strokeWidth={4}
      className="fill-neutral-400 stroke-neutral-400"
    />
  );
}

function createCheckIcon(attributes: SvgAttributes, isDarkMode: boolean) {
  const checkIconSize = parseFloat(attributes.r) * 1.4;
  return (
    <CheckIcon
      x={parseFloat(attributes.cx) - checkIconSize / 2}
      y={parseFloat(attributes.cy) - checkIconSize / 2}
      size={checkIconSize}
      color={isDarkMode ? 'white' : 'black'}
      stroke={isDarkMode ? 'white' : 'black'}
      strokeWidth={5}
      className="pointer-events-none"
    />
  );
}

function renderSeat(
  name: string,
  props: SVGProps,
  seatId: string,
  attributes: SvgAttributes,
  renderedChildren: React.ReactNode[],
  config: RenderConfig
) {
  const { selectedSeats, unavailableSeats, onSeatClick, isDarkMode } = config;
  const tierId = attributes['data-tier-id'];
  const sectionName = attributes['data-section-name'] ?? '';

  props.key = seatId;
  props.className = 'cursor-pointer';

  const isUnavailable = unavailableSeats?.has(seatId) === true;
  if (isUnavailable) {
    props.className = `${props.className} fill-neutral-300 dark:fill-neutral-700 stroke-neutral-300 dark:stroke-none stroke-[0.5] !cursor-not-allowed`;
    return (
      <React.Fragment key={seatId}>
        {React.createElement(name, props, renderedChildren)}
        {createSlashIcon(attributes)}
      </React.Fragment>
    );
  }

  if (onSeatClick) {
    props.onClick = () => onSeatClick(seatId, tierId, sectionName);
  }

  const isSelected = selectedSeats?.has(seatId) === true;
  if (isSelected) {
    props.className = `${props.className} stroke-black stroke-[2] dark:stroke-white`;
  }

  return (
    <React.Fragment key={seatId}>
      {React.createElement(name, props, renderedChildren)}
      {isSelected && isDarkMode !== undefined && createCheckIcon(attributes, isDarkMode)}
    </React.Fragment>
  );
}

function renderGASection(
  name: string,
  props: SVGProps,
  sectionId: string,
  attributes: SvgAttributes,
  renderedChildren: React.ReactNode[],
  config: RenderConfig
) {
  const { onGASectionClick, gaSectionInventory } = config;
  const tierId = attributes['data-tier-id'];
  const sectionName = attributes['data-section-name'] ?? '';
  props.key = sectionId;
  props.className = 'cursor-pointer';

  const isUnavailable = gaSectionInventory?.get(sectionId) === 0;
  if (isUnavailable) {
    props.className = `${props.className} fill-neutral-300 stroke-none dark:fill-neutral-700 !cursor-not-allowed`;
    return React.createElement(name, props, renderedChildren);
  }

  if (onGASectionClick) {
    props.onClick = () => onGASectionClick(sectionId, tierId, sectionName);
  }

  return React.createElement(name, props, renderedChildren);
}
