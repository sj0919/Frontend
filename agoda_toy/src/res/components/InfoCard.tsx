import React from 'react';
import styled from 'styled-components';
import imgCard2 from '../assets/img_card2.png';
import StarIconPath from '../assets/icon_hotel_star1.svg'; // Import as a path

const CardContainer = styled.div`
  width: 368.2875px;
  height: 500.25px;
  border: 1px solid rgba(172, 172, 172, 1);
  border-radius: 20px;
  /* border-alignment: inside; // CSS 표준 미지원, Figma 전용 옵션 */
  padding: 16px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  box-sizing: border-box;
  margin-top: 48px;
`;

const HotelImage = styled.img`
  width: 82.8px; 
  height: 82.8px; 
  border-radius: 20px;
  margin-right: 12px;
  object-fit: cover;
`;

const HotelInfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const NameAndStarsWrapper = styled.div`
  display: flex;
  align-items: baseline; /* Aligns text baseline of name with stars */
  gap: 8px; /* Space between hotel name and stars */
  margin-bottom: 4px; /* Space before the rating text below */
`;

const HotelDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const HotelName = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 0; /* Original margin removed, NameAndStarsWrapper handles spacing */
  color: #1A1A1A;
`;

const HotelRating = styled.div`
  font-size: 14px;
  color: #4F4F4F;
  // TODO: Add star icons for rating
`;

const BookingDetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center; // Vertically align items
  font-size: 14px;
  margin-bottom: 20px;
  color: #000;
`;

const BookingLabel = styled.span`
 color: #000;
 font-size: 14px;
`;

const EditLink = styled.a`
  font-size: 14px;
  color: #000; // Change to black
  text-decoration: underline;
  cursor: pointer;
  font-weight: bold;
`;

const PriceSectionTitle = styled.h4`
  font-size: 20px;
  font-weight: bold;
  margin-top: 48px;
  margin-bottom: 28px;
  color: #1A1A1A;
  border-top: 1px solid #EAEAEA;
  padding-top: 20px;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 18px;
  color: #000;
`;

const TotalPriceRow = styled(PriceRow)`
  font-weight: bold;
  font-size: 20px;
  color: #1A1A1A;
  margin-top: 56px;
  text-decoration: underline;
`;

const InfoCard = () => {
  // Placeholder data - replace with actual props or state
  const hotelName = "롯데호텔 명동 ";
  const rating = "4.6 (990)"; // TODO: Parse and display stars
  const numericRatingString = rating.split(' ')[0];
  const numericRatingValue = parseFloat(numericRatingString);
  const numStars = Number.isFinite(numericRatingValue) ? Math.round(numericRatingValue / 2) : 0;
  const checkInDate = "2025년 6월 10일";
  const checkOutDate = "2025년 6월 12일";
  const roomType = "1 x Standard Room 1";
  const guests = "성인 2명 / 최대 성인 2명";

  const roomPrice = "₩ 80,000";
  const taxesAndFees = "₩ 15,000";
  const totalPrice = "₩ 95,000";
  // Placeholder image URL
  const imageUrl = imgCard2;


  return (
    <CardContainer>
      <HotelInfoContainer>
        <HotelImage src={imageUrl} alt={hotelName} />
        <HotelDetails>
          <NameAndStarsWrapper>
            <HotelName>{hotelName}</HotelName>
            {Array(numStars).fill(0).map((_, i) => (
              <img key={i} src={StarIconPath} alt="star" style={{ width: "1em", height: "1em", fill: "#3B7080", marginRight: '-5px' }} />
            ))}
          </NameAndStarsWrapper>
          <HotelRating>{rating}</HotelRating>
        </HotelDetails>
      </HotelInfoContainer>

      <BookingDetailRow>
        <BookingLabel>{`${checkInDate} - ${checkOutDate}`}</BookingLabel>
        <EditLink>수정</EditLink>
      </BookingDetailRow>
      <BookingDetailRow>
        <BookingLabel>{roomType}</BookingLabel>
        <EditLink>수정</EditLink>
      </BookingDetailRow>
      <BookingDetailRow>
        <BookingLabel>{guests}</BookingLabel>
        <EditLink>수정</EditLink>
      </BookingDetailRow>

      <PriceSectionTitle>가격 세부 정보</PriceSectionTitle>
      <PriceRow>
        <span>{hotelName}</span>
        <span>{roomPrice}</span>
      </PriceRow>
      <PriceRow>
        <span style={{ color: "#000" }}>1객실, 4박</span>
        <span /> 
      </PriceRow>
      <PriceRow>
        <span>세금 및 수수료</span>
        <span>{taxesAndFees}</span>
      </PriceRow>

      <TotalPriceRow>
        <span>총액 (KRW)</span>
        <span>{totalPrice}</span>
      </TotalPriceRow>
    </CardContainer>
  );
};

export default InfoCard; 