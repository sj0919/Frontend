import IconSearchLocation from '../../assets/svgs/icn_search_location.svg?react';
import IconCalender from '../../assets/svgs/calender.svg?react';
import IconCalender2 from '../../assets/svgs/main_icn_cndin.svg?react';
import styled from 'styled-components';
import IconSearch from '../../assets/svgs/Property 1=Default.svg?react';
import { WrapSvgIcon } from '../../styles/Svg';

interface SearchProps {
  width?: string;
}
export default function Search({ width = '59rem' }: SearchProps) {
  return (
    <Container $width={width}>
      <TypoSearchLocation>
        <SearchLocationIcon />
        서울
      </TypoSearchLocation>
      <TypoSearchCal>
        <IconCalenderIn />
        2025.04.13
      </TypoSearchCal>
      <TypoSearchCal>
        <IconCalenderOut />
        2025.04.14
      </TypoSearchCal>
      <SearchIconWrapper />
    </Container>
  );
}

const Container = styled.div<{ $width: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.625rem;
  width: ${({ $width }) => $width};
  height: 2.88rem;
  margin-bottom: 1.75rem;

  gap: 2.5rem;

  border-radius: 6.25rem;
  border: 1px solid rgba(172, 172, 172, 1);
  background: var(--AGODA-White, #fff);
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
`;

const IconCalenderOut = WrapSvgIcon(IconCalender);
const IconCalenderIn = WrapSvgIcon(IconCalender2);
const SearchLocationIcon = WrapSvgIcon(IconSearchLocation);
const SearchIcon = WrapSvgIcon(IconSearch);

const TypoSearchLocation = styled.div`
  ${({ theme }) => theme.fonts.headline.sm};
  display: flex;
  padding-left: 0.625rem;
  align-items: center;
  gap: 0.5625rem;
`;

const TypoSearchCal = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  ${({ theme }) => theme.fonts.title.lg};
`;

const SearchIconWrapper = styled(SearchIcon)`
  display: flex;
  width: 2.875rem;
  height: 2.875rem;
  padding: 0.5rem;
  align-items: center;
  gap: 0.5rem;
  border-radius: 6.25rem;
  background: var(--AGODA-Primary, #006a71);
`;
