// Subtract.svg를 ReactComponent가 아닌 img 태그로 사용하도록 수정한 버전
import React from 'react';
import styled from 'styled-components';
import Subtract from '../../assets/main/Subtract.svg';
import { postLogout } from '@src/api/auth';

const MyModal: React.FC = () => {
  const createLogout = async () => {
    try {
      const result = await postLogout();
      if (result) {
        localStorage.removeItem('access_token');
        window.location.href = '/main';
      }
    } catch (err) {
      console.error('로그아웃 실패:', err);
    }
  };

  return (
    <ModalWrapper>
      <StyledSubtractImg src={Subtract} alt="pointer" />
      <ModalContainer>
        <MenuItemContainer>
          <MenuItem>마이 페이지</MenuItem>
          <MenuItem>위시리스트</MenuItem>
          <MenuItem>숙소 등록</MenuItem>
          <MenuItem>여행 가이드</MenuItem>
          <MenuItem>eSIM</MenuItem>
          <MenuItem>고객센터</MenuItem>
          <MenuItem onClick={createLogout}>로그아웃</MenuItem>
        </MenuItemContainer>
      </ModalContainer>
    </ModalWrapper>
  );
};

export default MyModal;

const ModalWrapper = styled.div`
  position: absolute;
  top: 6rem;
  right: 51rem;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledSubtractImg = styled.img`
  width: 20px;
  height: 8px;
  margin-bottom: -4px;
`;

const ModalContainer = styled.div`
  display: flex;
  width: 164px;
  height: 293px;
  padding: 0px 30px
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 28px;
  flex-shrink: 0;
  border-radius: 0px 0px 20px 20px;
  background: rgba(255, 255, 255, 0.3);
`;
const MenuItemContainer = styled.div`
  display: flex;
  width: 84px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
`;
const MenuItem = styled.span`
  display: flex;
  height: 23px;
  flex-direction: column;
  justify-content: center;
  align-self: stretch;
  color: #ffffff;

  /* AGODA/Body/Large */
  font-family: SUIT;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 133.333% */
  cursor: pointer;
`;
