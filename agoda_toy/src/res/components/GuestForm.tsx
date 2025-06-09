import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useResStore } from '@src/stores/resStore';

const FormContainer = styled.div`
  width: 100%;
  max-width: 680px; // Slightly adjusted
  display: flex;
  flex-direction: column;
`;

const Section = styled.section`
  background-color: #fff;
  border: 1px solid rgba(172, 172, 172, 1); // Lighter border
  border-radius: 20px; // Slightly smaller radius
  padding: 24px 32px; // Adjusted padding
  margin-bottom: 20px; // Adjusted margin
  box-shadow: none; // Removed box-shadow for a flatter look as in image
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

const RequiredAsterisk = styled.span<LabelProps>`
  color: ${({ color }) => color || '#FF6651'};
  margin-left: 2px;
  font-weight: bold;
`;

const FormRow = styled.div`
  display: flex;
  margin-bottom: 16px;
  gap: 16px;
`;

const FormGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 0; // Removed default bottom margin, will control with FormRow or inline style
`;

interface LabelProps {
  color?: string;
}

const Label = styled.label<LabelProps>`
  font-size: 14px;
  color: ${({ color }) => color || '#4F4F4F'};
  margin-bottom: 8px;
  display: flex;
  align-items: center;
`;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = styled.input<InputProps>`
  padding: 10px 12px;
  border: 1px solid
    ${({ error, value }) =>
      error ? '#FF6651' : value && String(value).length > 0 ? '#3D8587' : '#D6DADE'};
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
    border-color: ${({ error }) => (error ? '#FF6651' : '#3D8587')};
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 124, 238, 0.15);
    background-color: #fff;
  }
  &:not(:focus) {
    border-color: ${({ value }) => value && String(value).length > 0 ? '#3D8587' : '#D6DADE'};
  }
`;

const Select = styled.select`
  padding: 10px 12px;
  border: 1px solid rgba(172, 172, 172, 1);
  border-radius: 16px;
  font-size: 16px;
  background-color: #fff;
  color: #1A1A1A;
  width: 450px;
  height: 71px;
  box-sizing: border-box;
  &:focus {
    border-color: #3D8587;
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 124, 238, 0.15);
    background-color: #fff;
  }
  &:not(:focus) {
    border-color: ${({ value }) => value && String(value).length > 0 ? '#3D8587' : '#D6DADE'};
  }
`;

const Textarea = styled.textarea`
  width: 450px;
  height: 114px;
  min-height: 114px;
  border: 1px solid rgba(172, 172, 172, 1);
  border-radius: 12px;
  font-size: 16px;
  padding: 16px 218px 78px 24px;
  resize: none;
  overflow-y: hidden;
  background-color: #fff;
  color: #1A1A1A;
  box-sizing: border-box;
  &::placeholder {
    color: #C4C4C4;
    font-size: 14px;
    white-space: nowrap;
  }
  &:focus {
    border-color: #3D8587;
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 124, 238, 0.15);
    background-color: #fff;
  }
`;

const CheckboxGroup = styled.div`
  margin-bottom: 10px; // Increased margin
  &:last-child {
    margin-bottom: 0;
  }
`;

const CheckboxLabel = styled.label<{ checked?: boolean }>`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: ${({ checked }) => (checked ? '#3D8587' : '#C4C4C4')};
  cursor: pointer;
  line-height: 1.5;
`;

const CheckboxInput = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 10px; // Increased margin
  width: 18px; // Slightly larger
  height: 18px;
  accent-color: #3D8587
`;

const TermsSection = styled(Section)`
  background-color: #F7F9FA; // Light grey background for this inner section
  padding: 16px; // Adjusted padding
  margin-top: 12px; // Add some space above this section
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

const ErrorText = styled.span`
  font-size: 12px;
  color: #FF6651;
  margin-top: 4px;
`;

const PhoneRow = styled.div`
  display: flex;
  gap: 26px;
`;

const CountryCodeSelect = styled(Select)`
  width: 135px;
  height: 69px;
`;

const PhoneInput = styled(Input)`
  width: 289px;
  height: 69px;
`;

const GuestForm = () => {
  // State for input values
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // State for error
  const [lastNameError, setLastNameError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  // Add state for country and countryCode
  const [country, setCountry] = useState('KR');
  const [countryCode, setCountryCode] = useState('+82');

  // Checkbox state
  const [agreeAll, setAgreeAll] = useState(false);
  const [agePolicy, setAgePolicy] = useState(false);
  const [thirdPartyPolicy, setThirdPartyPolicy] = useState(false);

  // Validation functions
  const validateName = (value: string) => /^[a-zA-Z]{1,30}$/.test(value);
  const validateEmail = (value: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
  const validatePhone = (value: string) => /^01[016789]-?\d{3,4}-?\d{4}$/.test(value);

  // Validation for enabling the button
  const isFormValid =
    lastName &&
    firstName &&
    !lastNameError &&
    !firstNameError &&
    email &&
    !emailError &&
    country &&
    countryCode &&
    phoneNumber &&
    !phoneError &&
    agePolicy &&
    thirdPartyPolicy;

  // 전체 동의 체크박스 동기화
  const handleAgreeAllChange = (checked: boolean) => {
    setAgreeAll(checked);
    setAgePolicy(checked);
    setThirdPartyPolicy(checked);
  };
  // 개별 체크박스 동기화
  const handleAgePolicyChange = (checked: boolean) => {
    setAgePolicy(checked);
    if (checked && thirdPartyPolicy) {
      setAgreeAll(true);
    } else {
      setAgreeAll(false);
    }
  };
  const handleThirdPartyPolicyChange = (checked: boolean) => {
    setThirdPartyPolicy(checked);
    if (checked && agePolicy) {
      setAgreeAll(true);
    } else {
      setAgreeAll(false);
    }
  };

  const navigate = useNavigate();

  const { setGuestInfo } = useResStore();
  const [guestRequest, setGuestRequest] = useState('');

  return (
    <FormContainer>
      <PageTitle>1. 투숙객 정보</PageTitle>
      <Section>
        <SectionTitle>
        * 필수 입력 정보 
            <span style={{fontSize: '12px', color: '#828282', fontWeight: 'normal', marginLeft: 'auto'}}>
                 * 표시는 필수 정보입니다.
            </span>
        </SectionTitle>
        <FormGroup style={{ marginBottom: '16px'}}>
          <Label
            htmlFor="lastName"
            color={lastNameError ? '#FF6651' : lastName ? '#3D8587' : '#4F4F4F'}
          >
            성
            <RequiredAsterisk color={lastNameError ? '#FF6651' : lastName ? '#3D8587' : '#4F4F4F'}>*</RequiredAsterisk>
          </Label>
          <Input
            type="text"
            id="lastName"
            placeholder="영문으로 작성해 주세요"
            value={lastName}
            maxLength={30}
            onChange={e => {
              const value = e.target.value;
              setLastName(value);
              setLastNameError(!!value && !validateName(value));
            }}
            error={lastNameError}
          />
          {lastNameError && (
            <ErrorText>영문 알파벳 대문자(A-Z) 또는 소문자(a-z)만을 사용해 입력해 주세요</ErrorText>
          )}
        </FormGroup>
        <FormGroup style={{ marginBottom: '16px'}}>
          <Label
            htmlFor="firstName"
            color={firstNameError ? '#FF6651' : firstName ? '#3D8587' : '#4F4F4F'}
          >
            이름
            <RequiredAsterisk color={firstNameError ? '#FF6651' : firstName ? '#3D8587' : '#4F4F4F'}>*</RequiredAsterisk>
          </Label>
          <Input
            type="text"
            id="firstName"
            placeholder="영문으로 작성해 주세요"
            value={firstName}
            maxLength={30}
            onChange={e => {
              const value = e.target.value;
              setFirstName(value);
              setFirstNameError(!!value && !validateName(value));
            }}
            error={firstNameError}
          />
          {firstNameError && (
            <ErrorText>영문 알파벳 대문자(A-Z) 또는 소문자(a-z)만을 사용해 입력해 주세요</ErrorText>
          )}
        </FormGroup>
        <FormGroup style={{ marginBottom: '16px'}}>
          <Label
            htmlFor="email"
            color={emailError ? '#FF6651' : email ? '#3D8587' : '#4F4F4F'}
          >
            이메일
            <RequiredAsterisk color={emailError ? '#FF6651' : email ? '#3D8587' : '#4F4F4F'}>*</RequiredAsterisk>
          </Label>
          <Input
            type="email"
            id="email"
            placeholder="username@domain.com"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              setEmailError(!!e.target.value && !validateEmail(e.target.value));
            }}
            error={emailError}
          />
          {emailError && (
            <ErrorText>이메일 주소를 정확히 입력해 주세요</ErrorText>
          )}
        </FormGroup>
        <FormGroup  style={{ marginBottom: '16px'}}>
          <Label
            htmlFor="country"
            color={country ? '#3D8587' : '#4F4F4F'}
          >
            거주 국가/지역
            <RequiredAsterisk color={country ? '#3D8587' : '#4F4F4F'}>*</RequiredAsterisk>
          </Label>
          <Select
            id="country"
            value={country}
            onChange={e => setCountry(e.target.value)}
          >
            <option value="KR">대한민국</option>
            {/* TODO: Add more countries */}
          </Select>
        </FormGroup>
        <PhoneRow>
          <FormGroup style={{ flex: '0 0 135px' }}>
            <Label
              htmlFor="countryCode"
              color={countryCode ? '#3D8587' : '#4F4F4F'}
            >
              국가 코드
              <RequiredAsterisk color={countryCode ? '#3D8587' : '#4F4F4F'}>*</RequiredAsterisk>
            </Label>
            <CountryCodeSelect
              id="countryCode"
              value={countryCode}
              onChange={e => setCountryCode(e.target.value)}
            >
              <option value="+82">+82</option>
              {/* TODO: Add more country codes */}
            </CountryCodeSelect>
          </FormGroup>
          <FormGroup>
            <Label
              htmlFor="phoneNumber"
              color={phoneError ? '#FF6651' : phoneNumber ? '#3D8587' : '#4F4F4F'}
            >
              전화번호
              <RequiredAsterisk color={phoneError ? '#FF6651' : phoneNumber ? '#3D8587' : '#4F4F4F'}>*</RequiredAsterisk>
            </Label>
            <PhoneInput
              type="tel"
              id="phoneNumber"
              placeholder="입력해 주세요"
              value={phoneNumber}
              onChange={e => {
                setPhoneNumber(e.target.value);
                setPhoneError(!!e.target.value && !validatePhone(e.target.value));
              }}
              error={phoneError}
            />
            {phoneError && (
              <ErrorText>올바른 전화번호 형식으로 입력해 주세요</ErrorText>
            )}
          </FormGroup>
        </PhoneRow>
      </Section>

      <Section>
        <SectionTitle>별도 요청 (선택)</SectionTitle>
        <p style={{fontSize: '13px', color: '#C4C4C4', marginTop: '-15px', marginBottom: '15px', lineHeight: '1.6'}}>
숙소는 최선을 다해 요청 사항을 제공해 드릴 수 있도록 최선을 다하겠습니다.<br />
다만, 사정에 따라 제공 여부가 보장되지 않을 수 있습니다.
</p>
        <Textarea 
          placeholder="여기에 요청 사항을 입력하세요 (선택)" 
          value={guestRequest}
          onChange={(e) => setGuestRequest(e.target.value)}
        />
      </Section>

      <Section>
        <SectionTitle>이용 약관</SectionTitle>
        <CheckboxGroup>
          <CheckboxLabel checked={agreeAll}>
            <CheckboxInput
              name="agreeAll"
              checked={agreeAll}
              onChange={e => handleAgreeAllChange(e.target.checked)}
            />
            <strong>전체 동의</strong>
          </CheckboxLabel>
        </CheckboxGroup>
        <TermsSection> {/* Inner section with different background */}
          <CheckboxGroup>
            <CheckboxLabel checked={agePolicy}>
              <CheckboxInput
                name="agePolicy"
                checked={agePolicy}
                onChange={e => handleAgePolicyChange(e.target.checked)}
              />
              18세 이상 및 이용약관 동의 (필수)
            </CheckboxLabel>
          </CheckboxGroup>
          <CheckboxGroup>
            <CheckboxLabel checked={thirdPartyPolicy}>
              <CheckboxInput
                name="thirdPartyPolicy"
                checked={thirdPartyPolicy}
                onChange={e => handleThirdPartyPolicyChange(e.target.checked)}
              />
              개인정보 제3자 제공동의 (필수)
            </CheckboxLabel>
          </CheckboxGroup>
        </TermsSection>
      </Section>
      
      <SubmitButton
        type="button"
        enabled={!!isFormValid}
        disabled={!isFormValid}
        onClick={() => {
          if (isFormValid) {
            setGuestInfo({
              guest_first: firstName,
              guest_last: lastName,
              guest_email: email,
              guest_phone: `${countryCode}${phoneNumber}`,
              guest_request: guestRequest,
            });
            navigate('/payment');
          }
        }}
      >
        다음 단계
      </SubmitButton>
    </FormContainer>
  );
};

export default GuestForm; 