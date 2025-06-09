import React, { useState } from 'react';
import styled from 'styled-components';
import StepIndicator from './StepIndicator';
import InfoCard from './InfoCard';
import LockIcon from '../imgs/icon_lock.svg';
import LockIconRed from '../imgs/icon_lock_red.svg';
import LockIconGreen from '../imgs/icon_lock_green.svg';

import { createReservation } from '@src/api/res';
import { useResStore } from '@src/stores/resStore';
import { useNavigate } from 'react-router-dom';

const FormContainer = styled.div`
  width: 100%;
  max-width: 680px;
  display: flex;
  flex-direction: column;
`;

const Section = styled.section`
  background-color: #fff;
  border: 1px solid rgba(172, 172, 172, 1);
  border-radius: 20px;
  padding: 24px 32px;
  margin-bottom: 20px;
  box-shadow: none;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #3D8587;
  margin-top: 0;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
`;

const FormGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 0;
`;

const Label = styled.label`
  font-size: 14px;
  color: #4F4F4F;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid #D6DADE;
  border-radius: 16px;
  font-size: 16px;
  background-color: #fff;
  color: #1A1A1A;
  width: 450px;
  height: 71px;
  box-sizing: border-box;
  &::placeholder {
    color: #C4C4C4;
    font-size: 16px;
  }
  &:focus {
    border-color: #3D8587;
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 124, 238, 0.15);
    background-color: #fff;
  }
`;

const SubmitButton = styled.button<{ enabled: boolean }>`
  width: 514px;
  height: 72px;
  border-radius: 20px;
  padding: 21px 212px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: ${({ enabled }) => (enabled ? '#3D8587' : '#D6DADE')};
  color: white;
  font-size: 24px;
  font-weight: normal;
  border: none;
  cursor: ${({ enabled }) => (enabled ? 'pointer' : 'not-allowed')};
  margin-top: 24px;
  margin-bottom: 32px;
  transition: background 0.2s;
  white-space: nowrap;
  &:hover {
    background-color: ${({ enabled }) => (enabled ? '#2e6e6e' : '#D6DADE')};
  }
`;

const PageTitle = styled.h1`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 32px;
  color: #3D8587;
  align-self: flex-start;
`;

const CouponInputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-top: 16px;
`;

const CouponInput = styled.input`
  width: 100%;
  height: 71px;
  border: 1px solid #D6DADE;
  border-radius: 16px;
  font-size: 16px;
  line-height: 71px;
  padding: 0 75px 0 12px;
  background: #fff;
  color: #1A1A1A;
  box-sizing: border-box;
  &::placeholder {
    color: #C4C4C4;
    font-size: 16px;
    line-height: 71px;
  }
  &:focus {
    outline: none;
    box-shadow: none;
    border-color: #3D8587;
    background: #fff;
  }
`;

const CouponLabel = styled.label`
  position: absolute;
  top: -12px;
  left: 16px;
  background: #fff;
  padding: 0 8px;
  font-size: 14px;
  color: #BDBDBD;
  font-weight: bold;
  z-index: 2;
  pointer-events: none;
`;

const CouponButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 63px;
  height: 32px;
  border-radius: 8px;
  background: #3D8587;
  color: #fff;
  border: none;
  font-size: 16px;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const RequiredAsterisk = styled.span<{ color?: string }>`
  color: ${({ color }) => color || '#1A1A1A'};
  margin-left: 2px;
  font-weight: bold;
`;

const ErrorText = styled.span`
  font-size: 12px;
  color: #FF6651;
  margin-top: 4px;
`;

const CardNumberInputWrapper = styled.div`
  position: relative;
  width: 450px;
  height: 71px;
  display: flex;
  align-items: center;
`;

const LockIconImg = styled.img`
  position: absolute;
  right: 16px;
  width: 24px;
  height: 24px;
`;

const MaskedCardNumber = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 12px;
  font-size: 16px;
  font-family: inherit;
  color: #1A1A1A;
  letter-spacing: 2px;
  pointer-events: none;
  user-select: none;
  z-index: 1;
`;

const MaskedCardPassword = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 12px;
  font-size: 16px;
  font-family: inherit;
  color: #1A1A1A;
  letter-spacing: 2px;
  pointer-events: none;
  user-select: none;
  z-index: 1;
`;

const PaymentForm = () => {
  const [cardName, setCardName] = useState('');
  const [cardNameError, setCardNameError] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardPassword, setCardPassword] = useState('');
  const [email, setEmail] = useState('');
  const [coupon, setCoupon] = useState('');

  const validateCardName = (value: string) => /^[a-zA-Z]{1,30}$/.test(value);
  const validateEmail = (value: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
  const isCardNumberValid = (value: string) => value.length === 16;
  const isCardPasswordValid = (value: string) => value.length === 4;

  const isFormValid =
    cardName &&
    !cardNameError &&
    isCardNumberValid(cardNumber) &&
    isCardPasswordValid(cardPassword) &&
    validateEmail(email);

  const maskCardNumber = (value: string) => {
    if (!value) return '';
    const masked = value
      .split('')
      .map((char, idx) => (idx === value.length - 1 ? char : '*'))
      .join('');
    // Add space every 4 chars from the left
    return masked.replace(/(.{4})/g, '$1 ').trim();
  };

  const maskCardPassword = (value: string) => {
    if (!value) return '';
    const masked = value
      .split('')
      .map((char, idx) => (idx === value.length - 1 ? char : '*'))
      .join('');
    return masked;
  };

  const { resInfo, guestInfo, resetResInfo } = useResStore();
  console.log('resInfo inside PaymentForm:', resInfo);

  const nav = useNavigate();

  const handleSubmit = async () => {
    if (!resInfo || !guestInfo) {
      alert("예약 정보가 누락되었습니다.");
      return;
    }

    const fullResInfo = {
      ...resInfo,
      ...guestInfo,
    };

    try {
      const result = await createReservation(fullResInfo);
      console.log('예약 성공:', result);
      resetResInfo();
      nav(`/reservation-complete`);
    } catch (error) {
      console.error('예약 실패:', error);
      console.log(fullResInfo);
      alert("예약 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <FormContainer>
      <PageTitle>2. 결제 정보</PageTitle>
      <Section>
        <SectionTitle>
          * 결제 방법 선택
        </SectionTitle>
        <FormGroup style={{ marginBottom: '16px'}}>
          <Label
            htmlFor="cardName"
            style={{ color: cardNameError ? '#FF6651' : cardName ? '#3D8587' : '#4F4F4F' }}
          >
            카드 명의자 이름
            <RequiredAsterisk color={cardNameError ? '#FF6651' : cardName ? '#3D8587' : '#1A1A1A'}>*</RequiredAsterisk>
          </Label>
          <Input
            type="text"
            id="cardName"
            placeholder="영문으로 작성해 주세요"
            value={cardName}
            maxLength={30}
            onChange={e => {
              const value = e.target.value;
              setCardName(value);
              setCardNameError(!!value && !validateCardName(value));
            }}
            style={{
              borderColor: cardNameError
                ? '#FF6651'
                : cardName && cardName.length > 0
                ? '#3D8587'
                : '#D6DADE',
            }}
          />
          {cardNameError && (
            <ErrorText>영문 알파벳 대문자(A-Z) 또는 소문자(a-z)만을 사용해 입력해 주세요</ErrorText>
          )}
        </FormGroup>
        <FormGroup style={{ marginBottom: '16px'}}>
          <Label htmlFor="cardNumber" style={{ color: cardNumber.length === 16 ? '#3D8587' : '#1A1A1A' }}>
            카드 번호
            <RequiredAsterisk color={cardNumber.length === 16 ? '#3D8587' : '#1A1A1A'}>*</RequiredAsterisk>
          </Label>
          <CardNumberInputWrapper>
            <MaskedCardNumber aria-hidden="true">{maskCardNumber(cardNumber)}</MaskedCardNumber>
            <Input
              type="text"
              id="cardNumber"
              aria-label="카드 번호"
              placeholder=""
              maxLength={16}
              value={cardNumber}
              onChange={e => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                if (value.length <= 16) setCardNumber(value);
              }}
              style={{
                position: 'relative',
                zIndex: 2,
                background: 'transparent',
                color: 'transparent',
                letterSpacing: '2px',
                fontSize: '16px',
                fontFamily: 'inherit',
                padding: '0 12px',
                width: '100%',
                height: '100%',
                border: `1px solid ${cardNumber.length > 0 && !isCardNumberValid(cardNumber) ? '#FF6651' : cardNumber.length === 16 ? '#3D8587' : '#D6DADE'}`,
                borderRadius: '16px',
                caretColor: '#1A1A1A',
              }}
              autoComplete="off"
              inputMode="numeric"
            />
            <LockIconImg
              src={
                cardNumber.length === 0
                  ? LockIcon
                  : !isCardNumberValid(cardNumber)
                  ? LockIconRed
                  : LockIconGreen
              }
              alt="lock"
            />
          </CardNumberInputWrapper>
          {cardNumber.length > 0 && !isCardNumberValid(cardNumber) && (
            <ErrorText>카드 번호 16자리를 올바른 형식으로 입력해 주세요</ErrorText>
          )}
        </FormGroup>
        <FormGroup style={{ marginBottom: '16px'}}>
          <Label htmlFor="cardPassword" style={{ color: cardPassword.length === 4 ? '#3D8587' : '#1A1A1A' }}>
            카드 비밀번호
            <RequiredAsterisk color={cardPassword.length === 4 ? '#3D8587' : '#1A1A1A'}>*</RequiredAsterisk>
          </Label>
          <CardNumberInputWrapper style={{ marginBottom: 0 }}>
            <MaskedCardPassword aria-hidden="true">{maskCardPassword(cardPassword)}</MaskedCardPassword>
            <Input
              type="text"
              id="cardPassword"
              aria-label="카드 비밀번호"
              placeholder=""
              maxLength={4}
              value={cardPassword}
              onChange={e => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                if (value.length <= 4) setCardPassword(value);
              }}
              style={{
                position: 'relative',
                zIndex: 2,
                background: 'transparent',
                color: 'transparent',
                letterSpacing: '2px',
                fontSize: '16px',
                fontFamily: 'inherit',
                padding: '0 12px',
                width: '100%',
                height: '100%',
                border: `1px solid ${cardPassword.length > 0 && !isCardPasswordValid(cardPassword) ? '#FF6651' : cardPassword.length === 4 ? '#3D8587' : '#D6DADE'}`,
                borderRadius: '16px',
                caretColor: '#1A1A1A',
              }}
              autoComplete="off"
              inputMode="numeric"
            />
            <LockIconImg
              src={
                cardPassword.length === 0
                  ? LockIcon
                  : !isCardPasswordValid(cardPassword)
                  ? LockIconRed
                  : LockIconGreen
              }
              alt="lock"
            />
          </CardNumberInputWrapper>
          {cardPassword.length > 0 && !isCardPasswordValid(cardPassword) && (
            <ErrorText>카드 비밀번호 숫자 4자리를 올바른 형식으로 입력해 주세요</ErrorText>
          )}
        </FormGroup>
        <FormGroup style={{ marginBottom: '16px'}}>
          <Label htmlFor="email" style={{ color: validateEmail(email) ? '#3D8587' : '#1A1A1A' }}>
            결제 확인 이메일
            <RequiredAsterisk color={validateEmail(email) ? '#3D8587' : '#1A1A1A'}>*</RequiredAsterisk>
          </Label>
          <Input
            type="email"
            id="email"
            placeholder="username@domain.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              borderColor: validateEmail(email)
                ? '#3D8587'
                : email && email.length > 0
                ? '#FF6651'
                : '#D6DADE',
            }}
          />
          {email && !validateEmail(email) && (
            <ErrorText>이메일 주소를 정확히 입력해 주세요</ErrorText>
          )}
        </FormGroup>
      </Section>
      <Section>
        <SectionTitle>예약 혜택 (선택)</SectionTitle>
        <CouponInputWrapper>
          <CouponLabel htmlFor="coupon">할인코드</CouponLabel>
          <CouponInput
            id="coupon"
            placeholder="할인코드 입력"
            value={coupon}
            onChange={e => setCoupon(e.target.value)}
          />
          <CouponButton>적용</CouponButton>
        </CouponInputWrapper>
      </Section>
      <SubmitButton type="button" enabled={!!isFormValid} disabled={!isFormValid} onClick={handleSubmit}>
        예약 확정
      </SubmitButton>
    </FormContainer>
  );
};

export default PaymentForm; 