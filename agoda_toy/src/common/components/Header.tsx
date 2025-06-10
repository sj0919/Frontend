import React, { useState } from 'react';
import AgodaLogoIcon from '../../assets/img_gnb_logo.png';
import styled from 'styled-components';
import ProfileIcon from '../../assets/pro_small.svg?react';
import GlobalIcon from '../../assets/icn_gnb_lang.svg?react';
import MyModal from '@src/common/components/MyModal';

const HEADER_LIST = ['교통', '숙소', '엑티비티', '프로모션'];

interface HeaderProps {
  isMainPage?: boolean;
}

export default function Header({ isMainPage }: HeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <HeaderContainer isMainPage={isMainPage}>
      <Frame>
        <HeaderLeft>
          <AgodaLogo />
          {HEADER_LIST.map((text) => (
            <HeaderText key={text} isMainPage={isMainPage}>
              {text}
            </HeaderText>
          ))}
        </HeaderLeft>
        <HeaderRight>
          <Global isMainPage={isMainPage} />
          <Profile isMainPage={isMainPage} onClick={toggleModal} />
          {isModalOpen && <MyModal />}
        </HeaderRight>
      </Frame>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header<HeaderProps>`
  display: flex;
  height: 4rem;
  padding: 1.0625rem 8.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.5rem;
  align-self: stretch;
  background-color: ${({ isMainPage }) =>
    isMainPage ? 'rgba(255, 255, 255, 0.5)' : 'white'};

  ${({ isMainPage }) =>
    isMainPage &&
    `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000; // Ensure header stays on top
  `}
`;

const Frame = styled.div`
  display: flex;
  width: 103rem;
  justify-content: space-between;
  align-items: flex-start;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 4.875rem;
`;

const HeaderRight = styled.div`
  display: flex;
  padding: 0.125rem 0rem;
  align-items: center;
  gap: 1.5rem;
`;

const AgodaLogo = styled.div`
  width: 4.60606rem;
  height: 2.375rem;
  aspect-ratio: 73.7/38;
  background: url(${AgodaLogoIcon}) center / cover no-repeat;
`;

interface HeaderTextProps {
  isMainPage?: boolean;
}

const HeaderText = styled.div<HeaderTextProps>`
  ${({ theme }) => theme.fonts.headline.sm};
  display: flex;
  height: 1.4375rem;
  flex-direction: column;
  justify-content: center;
  color: ${({ isMainPage, theme }) =>
    isMainPage ? 'white' : theme.colors.black};
`;

interface IconProps {
  isMainPage?: boolean;
}

const Global = styled(GlobalIcon)<IconProps>`
  width: 1.625rem;
  height: 1.625rem;
  aspect-ratio: 1/1;
  path {
    fill: white;
  }
`;

const Profile = styled(ProfileIcon)<IconProps>`
  width: 2.3125rem;
  height: 2.3125rem;
  path {
    fill: white;
  }
`;
