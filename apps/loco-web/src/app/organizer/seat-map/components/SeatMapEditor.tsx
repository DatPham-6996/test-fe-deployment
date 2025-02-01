'use client';

import { Button } from '@/components/shadcn/ui/button';
import { Card } from '@/components/shadcn/ui/card';
import {
  useUpdateEventHoldSeatsRulesMutation,
  useUpdateTicketTierInventoryAndHoldMutation,
} from '@/lib/__generated__/graphql';
import { toastError, toastSuccess } from '@/lib/utils/toast';
import { useLocale } from '@/locale/intl-provider-wrapper';
import { format } from 'date-fns';
import { enUS, vi } from 'date-fns/locale';
import { RefreshCcwIcon, SlashIcon, ZoomIn, ZoomOut } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import Selecto from 'react-selecto';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

interface GeneratedRowRule {
  from: string;
  to: string;
  step: number;
  seat: {
    from: string;
    to: string;
    step: number;
    tier: string;
  };
}

interface GeneratedSectionRules {
  rows: GeneratedRowRule[];
  metadata?: {
    sectionName: string;
  };
}

interface Seat {
  id: string;
  tier?: string;
}

interface Tier {
  id: string;
  name: string;
  background: string;
  border: string;
  seatCount: number;
}

const isNumericString = (str: string): boolean => /^\d+$/.test(str);

interface PrefixSuffix {
  prefix: string;
  suffix: string;
}

function splitPrefixAndSuffix({ char }: { char: string }): PrefixSuffix {
  const match = char.match(/^(.*?)(\d+)$/);
  const lastChar = char.charAt(char.length - 1);

  return {
    prefix: match?.[1] ?? char.slice(0, -1),
    suffix: match?.[2] ?? lastChar,
  };
}

function getNextValue({ char, step }: { char: string; step: number }): string {
  const { prefix, suffix } = splitPrefixAndSuffix({ char });

  if (isNumericString(suffix)) {
    const nextNumber = (parseInt(suffix, 10) + step).toString();
    return prefix + nextNumber;
  }

  return prefix + String.fromCharCode(suffix.charCodeAt(0) + step);
}

function compareValues(a: string, b: string): number {
  if (isNumericString(a) && isNumericString(b)) {
    return parseInt(a) - parseInt(b);
  }

  return a < b ? -1 : a > b ? 1 : 0;
}

function canMergeRules(rule1: GeneratedRowRule, rule2: GeneratedRowRule): boolean {
  return (
    rule1.seat.from === rule2.seat.from &&
    rule1.seat.to === rule2.seat.to &&
    rule1.seat.step === rule2.seat.step &&
    rule1.seat.tier === rule2.seat.tier
  );
}

function areRowsConsecutive(row1: string, row2: string): boolean {
  if (isNumericString(row1) && isNumericString(row2)) {
    return parseInt(row2) - parseInt(row1) === 1;
  }
  return row2.charCodeAt(0) - row1.charCodeAt(0) === 1;
}

// Add this helper function to check if all seats have tiers assigned
const areAllSeatsAssigned = (seats: Seat[]): boolean => {
  return seats.length !== 0 && seats.every((seat) => seat.tier !== undefined);
};

// Add these interfaces near your other interfaces
interface HoldSeat {
  id: string;
  isHeld?: boolean;
}

interface GeneratedHoldRule {
  from: string;
  to: string;
  step: number;
  seat: {
    from: string;
    to: string;
    step: number;
  };
}

interface GeneratedHoldSectionRules {
  rows: GeneratedHoldRule[];
}

interface SeatMapEditorProps {
  initialSvgUrl?: string;
  tierRules?: Record<string, GeneratedSectionRules>;
  holdSeatRules?: Record<string, GeneratedHoldSectionRules>;
  tiers: Tier[];
  eventName: string;
  cover: string;
  startAt: Date;
  endAt: Date;
  eventId: string;
  organizationId: string;
  refetchSeatMap: () => void;
  reservingSeats?: string[];
  soldSeats?: string[];
}

const formatDate = (date: string, locale: string = 'en') => {
  const dateObj = new Date(date);
  const dateLocale = locale === 'vi' ? vi : enUS;

  return format(dateObj, 'HH:mm - dd MMMM, yyyy', { locale: dateLocale });
};

// Add new interface for hold seat counts by tier
interface HoldSeatTierCount {
  tierId: string;
  count: number;
}

export default function SeatMapEditor({
  initialSvgUrl,
  tierRules: initialTierRules,
  holdSeatRules: initialHoldSeatRules,
  tiers: initialTiers,
  eventName,
  startAt,
  endAt,
  eventId,
  organizationId,
  refetchSeatMap,
  reservingSeats = [],
  soldSeats = [],
}: SeatMapEditorProps) {
  const [svgContent, setSvgContent] = useState<string>('');
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const [disablePanning, setDisablePanning] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { locale } = useLocale();
  const { formatMessage } = useIntl();

  const [updateHoldSeatRules] = useUpdateEventHoldSeatsRulesMutation();
  const [updateTicketTierInventoryAndHold] = useUpdateTicketTierInventoryAndHoldMutation();

  // Sample tiers - in real application, these might come from an API
  const [tiers, setTiers] = useState<Tier[]>([]);

  // Update the component state
  const [holdSeats, setHoldSeats] = useState<HoldSeat[]>([]);

  // First useEffect to handle initial SVG content
  useEffect(() => {
    if (!svgContainerRef.current || !svgContent) return;
    const container = svgContainerRef.current;
    container.innerHTML = svgContent;
  }, [svgContent]);

  useEffect(() => {
    setTiers(initialTiers);
  }, [initialTiers]);

  // Update the useEffect that handles click events
  useEffect(() => {
    if (!svgContainerRef.current) return;
    const container = svgContainerRef.current;

    const handleSeatClick = (e: MouseEvent) => {
      const seatElement = (e.target as HTMLElement).closest('[data-entity-type="seat"]') as SVGElement;

      if (!seatElement) return;

      const seatId = seatElement.id;

      // Prevent interaction with reserved or sold seats
      if (reservingSeats?.includes(seatId) || soldSeats?.includes(seatId)) {
        return;
      }

      setSelectedSeats((prev) => {
        if (prev.includes(seatId)) {
          // Check if seat is held
          const isHeld = holdSeats.some((seat) => seat.id === seatId);

          if (isHeld) {
            // If seat is held, restore to hold styling
            seatElement.setAttribute('stroke', '#000000');
            seatElement.setAttribute('fill', '#000000');
          } else {
            // Reset to tier's border color when deselected
            const tierId = seatElement.getAttribute('data-tier-id');
            const tier = tiers.find((t) => t.id === tierId);
            const borderColor = tier ? tier.border : '#D4D4D4';
            const backgroundColor = tier ? tier.background : '#E5E5E5';
            seatElement.setAttribute('stroke', borderColor);
            seatElement.setAttribute('stroke-width', '1');
            seatElement.setAttribute('fill', backgroundColor);
          }
          return prev.filter((id) => id !== seatId);
        } else {
          // Add black border when selected
          seatElement.setAttribute('stroke', '#000000');
          seatElement.setAttribute('stroke-width', '1');
          seatElement.setAttribute('fill', '#FFFFFF');
          return [...prev, seatId];
        }
      });
    };

    const seatElements = container.querySelectorAll('[data-entity-type="seat"]');
    seatElements.forEach((element) => {
      element.addEventListener('click', handleSeatClick as EventListener);
    });

    // Cleanup function to remove event listeners
    return () => {
      seatElements.forEach((element) => {
        element.removeEventListener('click', handleSeatClick as EventListener);
      });
    };
  }, [tiers, holdSeats, reservingSeats, soldSeats]); // Add holdSeats to dependencies

  const clearSelection = () => {
    // Reset visual appearance of all selected seats
    selectedSeats.forEach((seatId) => {
      const seatElement = svgContainerRef.current?.querySelector(`#${seatId}`);
      if (seatElement) {
        const isHeld = holdSeats.some((seat) => seat.id === seatId);

        if (isHeld) {
          // Keep hold seat styling when in holds tab
          seatElement.setAttribute('stroke', '#000000');
          seatElement.setAttribute('fill', '#000000');
        } else {
          // Normal tier styling
          const tierId = seatElement.getAttribute('data-tier-id');
          const tier = tiers.find((t) => t.id === tierId);
          const borderColor = tier ? tier.border : '#D4D4D4';
          const backgroundColor = tier ? tier.background : '#E5E5E5';
          seatElement.setAttribute('stroke', borderColor);
          seatElement.setAttribute('stroke-width', '1');
          seatElement.setAttribute('fill', backgroundColor);
        }
      }
    });
    setSelectedSeats([]);
  };

  const generateTierRules = (seats: Seat[]): Record<string, GeneratedSectionRules> => {
    const seatsBySection: Record<string, Seat[]> = {};

    seats.forEach((seat) => {
      if (!seat.tier) return;
      const [section] = seat.id.split('-row_');
      if (!seatsBySection[section]) {
        seatsBySection[section] = [];
      }
      seatsBySection[section].push(seat);
    });

    const rules: Record<string, GeneratedSectionRules> = {};

    const optimizeRules = (rules: GeneratedRowRule[]): GeneratedRowRule[] => {
      rules.sort((a, b) => {
        const patternA = `${a.seat.from}-${a.seat.to}-${a.seat.step}-${a.seat.tier}`;
        const patternB = `${b.seat.from}-${b.seat.to}-${b.seat.step}-${b.seat.tier}`;
        if (patternA === patternB) {
          return compareValues(a.from, b.from);
        }

        return compareValues(patternA, patternB);
      });

      const optimizedRules: GeneratedRowRule[] = [];
      let currentRule: GeneratedRowRule | null = null;

      for (const rule of rules) {
        if (!currentRule) {
          currentRule = { ...rule };
          continue;
        }

        if (canMergeRules(currentRule, rule)) {
          if (areRowsConsecutive(currentRule.to, rule.from)) {
            currentRule.to = rule.from;
          } else if (currentRule.from !== rule.from || currentRule.to !== rule.to) {
            optimizedRules.push(currentRule);
            currentRule = { ...rule };
          }
        } else {
          optimizedRules.push(currentRule);
          currentRule = { ...rule };
        }
      }

      if (currentRule) {
        optimizedRules.push(currentRule);
      }

      return optimizedRules;
    };

    Object.entries(seatsBySection).forEach(([sectionId, sectionSeats]) => {
      const rowGroups = sectionSeats.reduce(
        (groups, seat) => {
          const [, rowPart] = seat.id.split('-row_');
          const [row] = rowPart.split('-seat_');

          if (!groups[row]) {
            groups[row] = {};
          }
          if (!groups[row][seat.tier!]) {
            groups[row][seat.tier!] = [];
          }
          groups[row][seat.tier!].push(seat);
          return groups;
        },
        {} as Record<string, Record<string, Seat[]>>
      );

      const sectionRules: GeneratedRowRule[] = [];

      Object.entries(rowGroups).forEach(([row, tierGroups]) => {
        Object.entries(tierGroups).forEach(([tier, seats]) => {
          const seatIds = seats.map((s) => s.id.split('-seat_')[1]).sort(compareValues);

          let start = seatIds[0];
          let currentStep = 0;
          let currentSequence = [start];

          for (let i = 1; i < seatIds.length; i++) {
            const current = seatIds[i];
            const previous = seatIds[i - 1];

            let diff: number;
            if (isNumericString(current) && isNumericString(previous)) {
              diff = parseInt(current) - parseInt(previous);
            } else {
              diff = 1; // Default step for non-numeric sequences
            }

            if (currentStep === 0) {
              currentStep = diff;
              currentSequence.push(current);
            } else if (diff === currentStep) {
              currentSequence.push(current);
            } else {
              sectionRules.push({
                from: row,
                to: row,
                step: 1,
                seat: {
                  from: currentSequence[0],
                  to: currentSequence[currentSequence.length - 1],
                  step: currentStep,
                  tier,
                },
              });

              start = current;
              currentSequence = [start];
              currentStep = 0;
            }
          }

          if (currentSequence.length > 0) {
            sectionRules.push({
              from: row,
              to: row,
              step: 1,
              seat: {
                from: currentSequence[0],
                to: currentSequence[currentSequence.length - 1],
                step: currentStep || 1,
                tier,
              },
            });
          }
        });
      });

      rules[sectionId] = {
        rows: optimizeRules(sectionRules),
      };
    });

    return rules;
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);

      const holdSeatRules = generateHoldSeatRules(holdSeats);

      // Call mutation to update hold rules
      await updateHoldSeatRules({
        variables: {
          input: {
            eventId,
            holdSeatRules,
          },
        },
      });

      // Calculate hold seats by tier
      const ticketTiers = tiers.map((tier) => ({
        id: tier.id,
        totalHeld: holdSeats.filter((seat) => {
          const seatElement = svgContainerRef.current?.querySelector(`#${seat.id}`);
          return seatElement?.getAttribute('data-tier-id') === tier.id;
        }).length,
      }));

      // Call API to update total hold seats
      await updateTicketTierInventoryAndHold({
        variables: {
          input: {
            organizationId,
            eventId,
            ticketTiers,
          },
        },
      });

      toastSuccess('Seat map saved successfully');
      refetchSeatMap();
    } catch (error) {
      console.error('Error saving seatmap:', error);
      toastError(`Error saving seatmap: ${error}`);
    } finally {
      setIsSaving(false);
    }
  };

  // Update the useEffect for initial SVG loading
  useEffect(() => {
    const loadInitialSvg = async () => {
      if (initialSvgUrl) {
        try {
          const response = await fetch(initialSvgUrl);
          const content = await response.text();

          setSvgContent(content);

          const parser = new DOMParser();
          const svgDoc = parser.parseFromString(content, 'image/svg+xml');
          const seatElements = svgDoc.querySelectorAll('[data-entity-type="seat"]');

          // Create a count map for tiers
          const tierCounts: Record<string, number> = {};
          const initialHoldSeats: HoldSeat[] = [];

          // Process seats for both tiers and hold status
          const newSeats: Seat[] = Array.from(seatElements).map((element) => {
            const seatId = element.id;
            const tierId = element.getAttribute('data-tier-id');

            // Check if this seat should be held based on initialHoldSeatRules
            let isHeld = false;
            if (initialHoldSeatRules) {
              Object.entries(initialHoldSeatRules).forEach(([sectionId, sectionRules]) => {
                sectionRules.rows.forEach((rowRule) => {
                  const [seatSection, rowPart] = seatId.split('-row_');
                  const [row, seatPart] = rowPart.split('-seat_');
                  const seat = seatPart;

                  // Check if the section matches
                  if (sectionId !== seatSection) return;

                  // Check if the row is within range and matches the step pattern
                  let currentRow = rowRule.from;
                  while (compareValues(currentRow, rowRule.to) <= 0) {
                    if (row === currentRow) {
                      // Check if the seat is within range and matches the step pattern
                      let currentSeat = rowRule.seat.from;
                      while (compareValues(currentSeat, rowRule.seat.to) <= 0) {
                        if (seat === currentSeat) {
                          isHeld = true;
                          return;
                        }
                        // Move to next seat using step
                        currentSeat = isNumericString(currentSeat)
                          ? (parseInt(currentSeat) + rowRule.seat.step).toString()
                          : getNextValue({ char: currentSeat, step: rowRule.seat.step });
                      }
                    }
                    // Move to next row using step
                    currentRow = isNumericString(currentRow)
                      ? (parseInt(currentRow) + rowRule.step).toString()
                      : getNextValue({ char: currentRow, step: rowRule.step });
                  }
                });
              });
            }

            // Update tier counts
            if (tierId) {
              tierCounts[tierId] = (tierCounts[tierId] || 0) + 1;
            }

            // Add to hold seats if needed
            if (isHeld) {
              initialHoldSeats.push({ id: seatId, isHeld: true });
              // Apply hold styling
              element.setAttribute('stroke', '#000000');
              element.setAttribute('fill', '#000000');
            }

            return {
              id: seatId,
              tier: tierId || undefined,
            };
          });

          setSeats(newSeats);
          setHoldSeats(initialHoldSeats);

          // Update tier counts
          setTiers((prev) =>
            prev.map((tier) => ({
              ...tier,
              seatCount: tierCounts[tier.id] || 0,
            }))
          );
        } catch (error) {
          console.error('Error loading initial SVG:', error);
        }
      }
    };

    loadInitialSvg();
  }, [initialSvgUrl, initialHoldSeatRules, initialTiers]); // Add dependencies

  // Add these helper functions
  function canMergeHoldRules(rule1: GeneratedHoldRule, rule2: GeneratedHoldRule): boolean {
    return (
      rule1.seat.from === rule2.seat.from && rule1.seat.to === rule2.seat.to && rule1.seat.step === rule2.seat.step
    );
  }

  // Update the generateHoldSeatRules function
  function generateHoldSeatRules(seats: HoldSeat[]): Record<string, GeneratedHoldSectionRules> {
    const seatsBySection: Record<string, HoldSeat[]> = {};

    seats.forEach((seat) => {
      if (!seat.isHeld) return;
      const [section] = seat.id.split('-row_');
      if (!seatsBySection[section]) {
        seatsBySection[section] = [];
      }
      seatsBySection[section].push(seat);
    });

    const rules: Record<string, GeneratedHoldSectionRules> = {};

    const optimizeRules = (rules: GeneratedHoldRule[]): GeneratedHoldRule[] => {
      rules.sort((a, b) => {
        const patternA = `${a.seat.from}-${a.seat.to}-${a.seat.step}`;
        const patternB = `${b.seat.from}-${b.seat.to}-${b.seat.step}`;
        if (patternA === patternB) {
          return compareValues(a.from, b.from);
        }

        return compareValues(patternA, patternB);
      });

      const optimizedRules: GeneratedHoldRule[] = [];
      let currentRule: GeneratedHoldRule | null = null;

      for (const rule of rules) {
        if (!currentRule) {
          currentRule = { ...rule };
          continue;
        }

        if (canMergeHoldRules(currentRule, rule)) {
          if (areRowsConsecutive(currentRule.to, rule.from)) {
            currentRule.to = rule.from;
          } else if (currentRule.from !== rule.from || currentRule.to !== rule.to) {
            optimizedRules.push(currentRule);
            currentRule = { ...rule };
          }
        } else {
          optimizedRules.push(currentRule);
          currentRule = { ...rule };
        }
      }

      if (currentRule) {
        optimizedRules.push(currentRule);
      }

      return optimizedRules;
    };

    // Apply optimization to each section's rules
    Object.entries(seatsBySection).forEach(([sectionId, sectionSeats]) => {
      const rowGroups = sectionSeats.reduce(
        (groups, seat) => {
          const [, rowPart] = seat.id.split('-row_');
          const [row] = rowPart.split('-seat_');

          if (!groups[row]) {
            groups[row] = [];
          }
          groups[row].push(seat);
          return groups;
        },
        {} as Record<string, HoldSeat[]>
      );

      const sectionRules: GeneratedHoldRule[] = [];

      Object.entries(rowGroups).forEach(([row, seats]) => {
        const seatIds = seats.map((s) => s.id.split('-seat_')[1]).sort(compareValues);

        let start = seatIds[0];
        let currentStep = 0;
        let currentSequence = [start];

        for (let i = 1; i < seatIds.length; i++) {
          const current = seatIds[i];
          const previous = seatIds[i - 1];

          let diff: number;
          if (isNumericString(current) && isNumericString(previous)) {
            diff = parseInt(current) - parseInt(previous);
          } else {
            diff = 1;
          }

          if (currentStep === 0) {
            currentStep = diff;
            currentSequence.push(current);
          } else if (diff === currentStep) {
            currentSequence.push(current);
          } else {
            sectionRules.push({
              from: row,
              to: row,
              step: 1,
              seat: {
                from: currentSequence[0],
                to: currentSequence[currentSequence.length - 1],
                step: currentStep,
              },
            });

            start = current;
            currentSequence = [start];
            currentStep = 0;
          }
        }

        if (currentSequence.length > 0) {
          sectionRules.push({
            from: row,
            to: row,
            step: 1,
            seat: {
              from: currentSequence[0],
              to: currentSequence[currentSequence.length - 1],
              step: currentStep || 1,
            },
          });
        }
      });

      rules[sectionId] = {
        rows: optimizeRules(sectionRules),
      };
    });

    return rules;
  }

  // Update this useEffect
  useEffect(() => {
    if (!svgContainerRef.current) return;

    // First, reset all seats to their tier colors
    const allSeatElements = svgContainerRef.current.querySelectorAll('[data-entity-type="seat"]');
    allSeatElements.forEach((element) => {
      // Apply tier colors for non-reserved seats
      const tierId = element.getAttribute('data-tier-id');
      const tier = tiers.find((t) => t.id === tierId);
      const borderColor = tier ? tier.border : '#D4D4D4';
      const backgroundColor = tier ? tier.background : '#E5E5E5';
      element.setAttribute('stroke', borderColor);
      element.setAttribute('fill', backgroundColor);
    });

    // Then, apply hold styling to all held seats
    holdSeats.forEach((holdSeat) => {
      const seatElement = svgContainerRef.current?.querySelector(`#${holdSeat.id}`);
      if (seatElement && !reservingSeats.includes(holdSeat.id) && !soldSeats.includes(holdSeat.id)) {
        seatElement.setAttribute('stroke', '#000000');
        seatElement.setAttribute('fill', '#000000');
      }
    });

    [...reservingSeats, ...soldSeats].forEach((seatId) => {
      const seatElement = svgContainerRef.current?.querySelector(`#${seatId}`);
      if (seatElement) {
        // Get the parent group element
        const groupElement = seatElement.parentElement;
        if (groupElement) {
          // Find and hide the seat label within the same group
          const seatLabel = groupElement.querySelector('[data-entity-type="seat-label"]');
          if (seatLabel) {
            seatLabel.setAttribute('visibility', 'hidden');
          }
        }

        // Set the base seat styling
        seatElement.setAttribute('fill', '#d4d4d4');
        seatElement.setAttribute('stroke', '#d4d4d4');
        seatElement.setAttribute('style', 'cursor: not-allowed;');

        // Create and add the slash line
        const bbox = (seatElement as SVGGraphicsElement).getBBox();
        const slash = document.createElementNS('http://www.w3.org/2000/svg', 'line');

        // Calculate line coordinates for a diagonal slash
        slash.setAttribute('x1', String(bbox.x + bbox.width * 0.7));
        slash.setAttribute('y1', String(bbox.y + bbox.height * 0.3));
        slash.setAttribute('x2', String(bbox.x + bbox.width * 0.3));
        slash.setAttribute('y2', String(bbox.y + bbox.height * 0.7));

        // Style the slash - thinner line and slightly darker color to match image
        slash.setAttribute('stroke', '#a3a3a3');
        slash.setAttribute('stroke-width', '1');
        slash.setAttribute('pointer-events', 'none');

        // Add a unique ID to prevent duplicate slashes
        slash.setAttribute('id', `slash-${seatId}`);

        // Remove existing slash if any
        const existingSlash = svgContainerRef.current?.querySelector(`#slash-${seatId}`);
        if (existingSlash) {
          existingSlash.remove();
        }

        // Add the new slash
        seatElement.parentNode?.appendChild(slash);
      }
    });
  }, [holdSeats, tiers, reservingSeats, soldSeats]);

  const handleHoldSeats = () => {
    if (!selectedSeats.length) return;

    if (svgContainerRef.current) {
      setHoldSeats((prev) => {
        const updatedHoldSeats = [...prev];

        selectedSeats.forEach((seatId) => {
          // Only add if not already held
          if (!updatedHoldSeats.some((s) => s.id === seatId)) {
            updatedHoldSeats.push({ id: seatId, isHeld: true });
          }
        });

        // Move the visual update after state update
        requestAnimationFrame(() => {
          selectedSeats.forEach((seatId) => {
            const seatElement = svgContainerRef.current?.querySelector(`#${seatId}`);
            if (seatElement) {
              seatElement.setAttribute('stroke', '#000000');
              seatElement.setAttribute('fill', '#000000');
            }
          });
        });

        return updatedHoldSeats;
      });

      clearSelection();
    }
  };

  const handleOpenSeats = () => {
    if (!selectedSeats.length) return;

    if (svgContainerRef.current) {
      setHoldSeats((prev) => {
        const updatedHoldSeats = prev.filter((seat) => !selectedSeats.includes(seat.id));

        // Restore original tier styling for unheld seats
        selectedSeats.forEach((seatId) => {
          const seatElement = svgContainerRef.current?.querySelector(`#${seatId}`);
          if (seatElement) {
            const tierId = seatElement.getAttribute('data-tier-id');
            const tier = tiers.find((t) => t.id === tierId);
            const borderColor = tier ? tier.border : '#D4D4D4';
            const backgroundColor = tier ? tier.background : '#E5E5E5';
            seatElement.setAttribute('stroke', borderColor);
            seatElement.setAttribute('fill', backgroundColor);
          }
        });

        return updatedHoldSeats;
      });

      clearSelection();
    }
  };

  // Add this function to handle save with validation
  const handleSaveWithValidation = async () => {
    const tierRules = generateTierRules(seats);
    const holdRules = generateHoldSeatRules(holdSeats);
    let tierMismatches = 0;
    let holdMismatches = 0;
    let tierSeatsChecked = 0;
    let holdSeatsChecked = 0;
    let invalidTiers = new Set<string>();

    // Tier validation
    Object.entries(tierRules).forEach(([sectionId, sectionRules]) => {
      sectionRules.rows.forEach((rowRule) => {
        const tierExists = tiers.some((tier) => tier.id === rowRule.seat.tier);
        if (!tierExists) {
          invalidTiers.add(rowRule.seat.tier);
          tierMismatches++;
          return;
        }

        let currentRow = rowRule.from;
        while (compareValues(currentRow, rowRule.to) <= 0) {
          let currentSeat = rowRule.seat.from;
          while (compareValues(currentSeat, rowRule.seat.to) <= 0) {
            const seatId = `${sectionId}-row_${currentRow}-seat_${currentSeat}`;
            tierSeatsChecked++;

            const seatElement = svgContainerRef.current?.querySelector(`#${seatId}`);
            if (seatElement) {
              const actualTierId = seatElement.getAttribute('data-tier-id');
              if (actualTierId !== rowRule.seat.tier) {
                tierMismatches++;
              }
            }

            currentSeat = isNumericString(currentSeat)
              ? (parseInt(currentSeat) + rowRule.seat.step).toString()
              : getNextValue({ char: currentSeat, step: rowRule.seat.step });
          }

          currentRow = isNumericString(currentRow)
            ? (parseInt(currentRow) + rowRule.step).toString()
            : getNextValue({ char: currentRow, step: rowRule.step });
        }
      });
    });

    // Hold seats validation
    Object.entries(holdRules).forEach(([sectionId, sectionRules]) => {
      sectionRules.rows.forEach((rowRule) => {
        let currentRow = rowRule.from;
        while (compareValues(currentRow, rowRule.to) <= 0) {
          let currentSeat = rowRule.seat.from;
          while (compareValues(currentSeat, rowRule.seat.to) <= 0) {
            const seatId = `${sectionId}-row_${currentRow}-seat_${currentSeat}`;
            holdSeatsChecked++;

            const isHeldInRules = holdSeats.some((seat) => seat.id === seatId && seat.isHeld);
            const seatElement = svgContainerRef.current?.querySelector(`#${seatId}`);

            if (seatElement) {
              const actuallyHeld = holdSeats.some((seat) => seat.id === seatId);
              if (isHeldInRules !== actuallyHeld) {
                holdMismatches++;
              }
            }

            currentSeat = isNumericString(currentSeat)
              ? (parseInt(currentSeat) + rowRule.seat.step).toString()
              : getNextValue({ char: currentSeat, step: rowRule.seat.step });
          }

          currentRow = isNumericString(currentRow)
            ? (parseInt(currentRow) + rowRule.step).toString()
            : getNextValue({ char: currentRow, step: rowRule.step });
        }
      });
    });

    const validationPassed = tierMismatches === 0 && holdMismatches === 0;

    if (!validationPassed) {
      toastError(formatMessage({ id: 'organizer.seatMap.validationError' }));
      return;
    }

    // If validation passes, proceed with save
    await handleSave();
  };

  // Create a separate component for the hold seats section
  const HoldSeatsSection = () => (
    <div className="space-y-4 pb-6 border-b">
      <div>
        <h2 className="text-lg lg:text-xl font-semibold mb-2">
          {formatMessage({ id: 'organizer.seatMap.holdSeats' })}
        </h2>
        <p className="text-sm text-gray-500 mb-4 hidden lg:block">
          {formatMessage({ id: 'organizer.seatMap.holdSeatsDescription' })}
        </p>

        {/* Updated Legend with title, vertical layout and background */}
        <div className="space-y-2 pb-3">
          <h3 className="text-sm font-medium">{formatMessage({ id: 'organizer.seatMap.legendTitle' })}</h3>
          <div className="flex flex-col gap-2 mb-4 text-sm text-gray-600 dark:text-gray-300 bg-white p-3 rounded-lg border">
            <div className="flex items-center gap-2">
              <div className="flex h-4 w-4 sm:w-5 sm:h-5 rounded-full items-center place-content-center bg-black"></div>
              <p className="text-xs sm:text-base text-black">
                {formatMessage({ id: 'organizer.seatMap.holdSeatsLegend' })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative flex h-4 w-4 sm:w-5 sm:h-5 rounded-full items-center justify-center bg-neutral-300">
                <SlashIcon className="absolute fill-neutral-400 stroke-neutral-400" size={'50%'} strokeWidth={3} />
              </div>
              <p className="text-xs sm:text-base text-black">
                {formatMessage({ id: 'organizer.seatMap.reservedSoldSeatsLegend' })}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-2">
          <Button className="w-full" onClick={handleHoldSeats} disabled={selectedSeats.length === 0}>
            {formatMessage({ id: 'organizer.seatMap.holdSeatsButton' })}
          </Button>
          <Button variant="outline" className="w-full" onClick={handleOpenSeats} disabled={selectedSeats.length === 0}>
            {formatMessage({ id: 'organizer.seatMap.openSeatsButton' })}
          </Button>
        </div>
      </div>
      <div className="flex justify-between text-sm">
        <span>{formatMessage({ id: 'organizer.seatMap.holdSeatsCount' })}</span>
        <span>{holdSeats.length}</span>
      </div>

      <Button
        variant="outline"
        onClick={handleSaveWithValidation}
        className={`w-full ${areAllSeatsAssigned(seats)
            ? 'bg-green-500 hover:bg-green-600 border-green-500 text-white hover:text-white'
            : ''
          }`}
        disabled={!areAllSeatsAssigned(seats) || isSaving}
      >
        {isSaving ? formatMessage({ id: 'common.saving' }) : formatMessage({ id: 'common.saveChanges' })}
      </Button>
    </div>
  );

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <style>
        {`
          [data-entity-type="seat"] {
            cursor: ${disablePanning ? 'default' : 'pointer'};
          }
          [data-entity-type="seat-label"] {
            pointer-events: none;
          }
        `}
      </style>

      <div className="flex flex-col lg:flex-row gap-4 flex-1">
        {/* Sidebar for desktop */}
        <Card className="hidden lg:block p-4 w-[350px] min-w-[350px] overflow-y-auto">
          {/* <div className="mb-4 pb-4 border-b">
            <h2 className="text-3xl font-bold mb-2">{eventName}</h2>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">
                <span className="font-semibold">{formatMessage({ id: 'common.start' })}:</span>{' '}
                {formatDate(String(startAt), locale)}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-semibold">{formatMessage({ id: 'common.end' })}:</span>{' '}
                {formatDate(String(endAt), locale)}
              </p>
            </div>
          </div> */}

          <div className="space-y-6">
            <HoldSeatsSection />
            {/* Tiers section */}
            <div className="space-y-4">
              <h2 className="text-lg lg:text-xl font-semibold mb-2">
                {formatMessage({ id: 'organizer.seatMap.tiers' })}
              </h2>
              <div className="space-y-2 lg:space-y-0 lg:block overflow-x-auto">
                <div className="flex lg:block gap-2 pb-2 lg:pb-0">
                  {tiers.map((tier) => (
                    <div
                      key={tier.id}
                      className="flex items-center gap-6 p-4 rounded-lg border min-w-[280px] lg:min-w-0 lg:mb-2"
                    >
                      <div className="cursor-move">=</div>
                      <div className="w-10 h-10 rounded-full" style={{ backgroundColor: tier.background }} />
                      <div className="flex-1">
                        <div className="font-medium">{tier.name}</div>
                        <div className="text-sm text-gray-500">{tier.seatCount} seats</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Mobile header and tiers */}
        <Card className="lg:hidden p-4">
          {/* Event Info */}
          <div className="mb-6 pb-6 border-b">
            <h2 className="text-2xl font-bold mb-2">{eventName}</h2>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">
                <span className="font-semibold">{formatMessage({ id: 'common.start' })}:</span>{' '}
                {formatDate(String(startAt), locale)}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-semibold">{formatMessage({ id: 'common.end' })}:</span>{' '}
                {formatDate(String(endAt), locale)}
              </p>
            </div>
          </div>

          {/* Tiers section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-2">{formatMessage({ id: 'organizer.seatMap.tiers' })}</h2>
            <div className="flex gap-2 pb-2 overflow-x-auto">
              {tiers.map((tier) => (
                <div key={tier.id} className="flex items-center gap-6 p-4 rounded-lg border min-w-[280px]">
                  <div className="cursor-move">=</div>
                  <div className="w-10 h-10 rounded-full" style={{ backgroundColor: tier.background }} />
                  <div className="flex-1">
                    <div className="font-medium">{tier.name}</div>
                    <div className="text-sm text-gray-500">{tier.seatCount} seats</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Seatmap section */}
        <Card
          className="flex-1 p-2 lg:p-4 flex flex-col overflow-hidden max-h-[60vh] lg:max-h-[100vh]"
          style={{
            background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
          }}
        >
          <TransformWrapper
            wheel={{ step: 0.9, smoothStep: 0.01 }}
            doubleClick={{ disabled: true }}
            initialScale={0.8}
            minScale={0.1}
            maxScale={10}
            centerOnInit={true}
            panning={{ disabled: disablePanning, velocityDisabled: true }}
            limitToBounds={false}
            onInit={(ref) => {
              setTimeout(() => {
                ref.centerView(0.8);
              }, 500);
            }}
          >
            {({ zoomIn, zoomOut, centerView }) => {
              // Disable panning when shift is pressed
              window.addEventListener('keydown', (e) => {
                if (e.shiftKey) {
                  setDisablePanning(true);
                }
              });

              window.addEventListener('keyup', (e) => {
                if (!e.shiftKey) {
                  setDisablePanning(false);
                }
              });

              return (
                <>
                  <div className="flex gap-1 lg:gap-2 mb-2 lg:mb-4">
                    <Button size="sm" variant="outline" onClick={() => zoomIn()}>
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => zoomOut()}>
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => centerView(0.8)}>
                      <RefreshCcwIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={clearSelection}
                      disabled={selectedSeats.length === 0}
                      className={`${selectedSeats.length > 0
                          ? 'bg-red-400 hover:bg-red-500 border-red-400 text-white hover:text-white'
                          : ''
                        }`}
                    >
                      {formatMessage({ id: 'common.unselectAll' })}
                    </Button>
                    <div className="flex-1" />
                  </div>
                  <TransformComponent
                    wrapperClass="!flex-1 !h-full !w-full overflow-hidden"
                    contentClass="!w-full !h-full flex items-center justify-center"
                  >
                    <div
                      ref={svgContainerRef}
                      className="w-fit h-fit flex items-center justify-center"
                      style={{ minHeight: '100%', minWidth: '100%' }}
                    />
                  </TransformComponent>
                </>
              );
            }}
          </TransformWrapper>

          <Selecto
            dragContainer={svgContainerRef.current}
            selectableTargets={['[data-entity-type="seat"]']}
            hitRate={0}
            selectByClick={false}
            selectFromInside={false}
            keyContainer={window}
            dragCondition={(e) => {
              return e.inputEvent.shiftKey ? true : false;
            }}
            onSelectEnd={(e) => {
              const selectedElements = e.selected as SVGElement[];
              // Filter out sold and reserving seats
              const validSelectedElements = selectedElements.filter((el) => {
                const seatId = el.id;
                return !reservingSeats.includes(seatId) && !soldSeats.includes(seatId);
              });

              const newSelectedSeats = validSelectedElements.map((el) => el.id);
              setSelectedSeats((prev) => {
                const updatedSelection = Array.from(new Set([...prev, ...newSelectedSeats]));

                // Update visual appearance of only valid selected seats
                validSelectedElements.forEach((seatElement) => {
                  seatElement.setAttribute('stroke', '#000000');
                  seatElement.setAttribute('stroke-width', '1');
                  seatElement.setAttribute('fill', '#FFFFFF');
                });

                return updatedSelection;
              });
            }}
          />
        </Card>

        {/* Mobile hold seats section */}
        <Card className="lg:hidden p-4">
          <HoldSeatsSection />
        </Card>
      </div>
    </div>
  );
}
