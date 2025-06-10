import React, { useState, useEffect, useRef } from 'react';
import styled, { type DefaultTheme } from 'styled-components';
import SearchInput from './SearchInput';
import SearchSummary from './SearchSummary';
import { LuMapPin, LuCalendarDays, LuUsers, LuBedDouble } from 'react-icons/lu';
import PersonnelSelectionPopover from './PersonnelSelectionPopover';
import RoomSelectionPopover from './RoomSelectionPopover';
import Calendar, { type CalendarRef } from './Calendar';

interface SearchWidgetProps {}

const formatDateToString = (date: Date | null): string => {
  if (!date) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

const parseDateFromString = (dateStr: string): Date | null => {
  const parts = dateStr.match(/(\d{4})\.(\d{2})\.(\d{2})/);
  if (parts) {
    return new Date(
      parseInt(parts[1], 10),
      parseInt(parts[2], 10) - 1,
      parseInt(parts[3], 10)
    );
  }
  return null;
};

// Helper function to parse personnel string
const parsePersonnel = (
  personnelStr: string
): { adults: number; children: number } => {
  const adultsMatch = personnelStr.match(/성인 (\d+)명/);
  const childrenMatch = personnelStr.match(/어린이 (\d+)명/);
  return {
    adults: adultsMatch ? parseInt(adultsMatch[1], 10) : 0,
    children: childrenMatch ? parseInt(childrenMatch[1], 10) : 0,
  };
};

// Helper function to parse rooms string
const parseRooms = (roomsStr: string): number => {
  const roomsMatch = roomsStr.match(/객실 (\d+)개?/);
  return roomsMatch ? parseInt(roomsMatch[1], 10) : 0;
};

export default function SearchWidget(props: SearchWidgetProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today's date
  const defaultCheckOutDate = new Date(today);
  defaultCheckOutDate.setDate(today.getDate() + 2); // Default 2-night stay

  const initialSearchData = {
    destination: '도쿄',
    // checkInDate and checkOutDate will be set by useState using formatted dates
    personnel: '성인 0명', // Default to 0, will show placeholder
    rooms: '객실 0', // Default to 0, will show placeholder
  };

  const [destination, setDestination] = useState(initialSearchData.destination);
  const [checkInDate, setCheckInDate] = useState(formatDateToString(today));
  const [checkOutDate, setCheckOutDate] = useState(
    formatDateToString(defaultCheckOutDate)
  );
  const [hasUserSelectedDates, setHasUserSelectedDates] = useState(false);

  const initialPersonnel = parsePersonnel(initialSearchData.personnel);
  const [adults, setAdultsState] = useState(initialPersonnel.adults);
  const [children, setChildrenState] = useState(initialPersonnel.children);
  const [rooms, setRoomsState] = useState(parseRooms(initialSearchData.rooms));

  const [isPersonnelPopoverOpen, setIsPersonnelPopoverOpen] = useState(false);
  const [isRoomPopoverOpen, setIsRoomPopoverOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const [personnelInteracted, setPersonnelInteracted] = useState(false);
  const [roomInteracted, setRoomInteracted] = useState(false);

  const personnelRef = useRef<HTMLDivElement>(null);
  const roomRef = useRef<HTMLDivElement>(null);
  const dateInputsWrapperRef = useRef<HTMLDivElement>(null); // Renamed from calendarRef for clarity
  const calendarComponentRef = useRef<CalendarRef>(null); // Ref for Calendar component instance

  const handleAdultsChange = (count: number) => {
    setAdultsState(count);
    setPersonnelInteracted(true);
  };

  const handleChildrenChange = (count: number) => {
    setChildrenState(count);
    setPersonnelInteracted(true);
  };

  const handleRoomsChange = (count: number) => {
    setRoomsState(count);
    setRoomInteracted(true);
  };

  const personnelSummary =
    adults === 0 && children === 0
      ? '인원 선택'
      : `성인 ${adults}명${children > 0 ? `, 어린이 ${children}명` : ''}`;
  const roomsSummary = rooms === 0 ? '객실 선택' : `객실 ${rooms}개`;

  const isPersonnelActive = personnelInteracted && (adults > 0 || children > 0);
  const isRoomActive = roomInteracted && rooms > 0;

  // Close popovers and calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        personnelRef.current &&
        !personnelRef.current.contains(event.target as Node)
      ) {
        setIsPersonnelPopoverOpen(false);
      }
      if (roomRef.current && !roomRef.current.contains(event.target as Node)) {
        setIsRoomPopoverOpen(false);
      }
      if (
        isCalendarOpen &&
        dateInputsWrapperRef.current &&
        !dateInputsWrapperRef.current.contains(event.target as Node)
      ) {
        // Check if the click is outside the calendar popup itself too
        const calendarPopupElement = document.querySelector(
          '.calendar-popup-container'
        );
        if (
          calendarPopupElement &&
          !calendarPopupElement.contains(event.target as Node)
        ) {
          if (calendarComponentRef.current) {
            const selection = calendarComponentRef.current.getSelection();
            if (selection.start) {
              // Only update if at least a start date is selected
              setCheckInDate(formatDateToString(selection.start));
              setCheckOutDate(formatDateToString(selection.end)); // selection.end can be null
              setHasUserSelectedDates(true);
            } else {
              // If no date was selected in the calendar, revert to original or do nothing
              // For now, let's assume if nothing selected, we keep existing dates.
              // Or, reset to default if that's desired.
            }
          }
          setIsCalendarOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCalendarOpen]);

  return (
    <MainFlexWrapper>
      <FormCard>
        <FormSection>
          <SearchInput
            icon={<LuMapPin />}
            value={destination}
            placeholder="어디로 떠나시나요?"
            onClick={() => {
              setIsPersonnelPopoverOpen(false);
              setIsRoomPopoverOpen(false);
              setIsCalendarOpen(false);
            }}
          />
          <DateInputsWrapper ref={dateInputsWrapperRef}>
            <SearchInput
              icon={<LuCalendarDays />}
              value={checkInDate}
              placeholder="날짜 선택"
              isDateField={true}
              onClick={() => {
                setIsCalendarOpen(!isCalendarOpen);
                setIsPersonnelPopoverOpen(false);
                setIsRoomPopoverOpen(false);
              }}
              isActiveSelection={hasUserSelectedDates}
            />
            <SearchInput
              icon={<LuCalendarDays />}
              value={checkOutDate}
              placeholder="날짜 선택"
              isDateField={true}
              onClick={() => {
                setIsCalendarOpen(!isCalendarOpen);
                setIsPersonnelPopoverOpen(false);
                setIsRoomPopoverOpen(false);
              }}
              isActiveSelection={hasUserSelectedDates}
            />
            {isCalendarOpen && (
              <Calendar
                ref={calendarComponentRef}
                initialStartDate={parseDateFromString(checkInDate)}
                initialEndDate={parseDateFromString(checkOutDate)}
              />
            )}
          </DateInputsWrapper>
          {/* OccupancyInputsWrapper and SearchSummary remain the same */}
          <OccupancyInputsWrapper>
            <PopoverWrapper ref={personnelRef}>
              <SearchInput
                icon={<LuUsers />}
                value={
                  adults === 0 && children === 0 && !personnelInteracted
                    ? ''
                    : personnelSummary
                }
                placeholder="인원 선택"
                onClick={() => {
                  setIsPersonnelPopoverOpen(!isPersonnelPopoverOpen);
                  setIsRoomPopoverOpen(false);
                  setIsCalendarOpen(false);
                }}
                isActiveSelection={isPersonnelActive}
              />
              {isPersonnelPopoverOpen && (
                <PersonnelSelectionPopover
                  adults={adults}
                  children={children}
                  onAdultsChange={handleAdultsChange}
                  onChildrenChange={handleChildrenChange}
                />
              )}
            </PopoverWrapper>
            <PopoverWrapper ref={roomRef}>
              <SearchInput
                icon={<LuBedDouble />}
                value={rooms === 0 && !roomInteracted ? '' : roomsSummary}
                placeholder="객실 선택"
                onClick={() => {
                  setIsRoomPopoverOpen(!isRoomPopoverOpen);
                  setIsPersonnelPopoverOpen(false);
                  setIsCalendarOpen(false);
                }}
                isActiveSelection={isRoomActive}
              />
              {isRoomPopoverOpen && (
                <RoomSelectionPopover
                  rooms={rooms}
                  onRoomsChange={handleRoomsChange}
                />
              )}
            </PopoverWrapper>
          </OccupancyInputsWrapper>
        </FormSection>
      </FormCard>
      <SearchSummary
        destination={destination}
        dateRange={
          checkInDate && checkOutDate
            ? `${checkInDate} - ${checkOutDate}`
            : checkInDate || '날짜 미정'
        }
        rooms={roomsSummary}
        personnel={personnelSummary}
      />
    </MainFlexWrapper>
  );
}

const MainFlexWrapper = styled.div`
  display: flex;
  width: 81.25rem;
  gap: 0rem;
`;

const FormCard = styled.div<{ theme: DefaultTheme }>`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 70px 20px 20px 20px;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.15);
  overflow: visible;
  flex: 1;
  display: flex;
  align-items: center;
`;

const FormSection = styled.section`
  flex-grow: 1;
  padding: 4.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 45rem;
  width: 100%;
  margin: 0 auto;
`;

const DateInputsWrapper = styled.div<{ theme: DefaultTheme }>`
  display: flex;
  gap: 0;
  position: relative;
  margin-top: 1.5rem;

  & > *:not(:last-child) {
    position: relative;
    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 2.2rem;
      width: 0.1rem;
      background-color: ${({ theme }) => theme.colors.gray300};
    }
  }

  & > * {
    flex: 1;
    border-radius: 20px 0 0 20px;
  }

  & > *:last-child {
    border-radius: 0 20px 20px 0;
    margin-left: -0.1rem;
    border-left: none;
    &::after {
      content: none;
    }
  }

  &:focus-within {
    & > * {
      border-radius: 20px;
    }
  }
`;

const OccupancyInputsWrapper = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  & > * {
    flex: 1;
  }
`;

const PopoverWrapper = styled.div`
  position: relative;
  flex: 1;
`;
