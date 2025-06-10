import React, { useState } from 'react';
import styled from 'styled-components';
import { FaGoogle, FaFacebookF, FaApple } from 'react-icons/fa';
import { SiKakaotalk } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
type LoginModalProps = {
  closeModal: () => void;
};

const LoginModal: React.FC<LoginModalProps> = ({ closeModal }) => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    const kakaoAuthUrl = `${import.meta.env.VITE_BASE_URL}/login`;
    const width = 500;
    const height = 700;
    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;

    window.open(
      kakaoAuthUrl,
      'KakaoLogin',
      `width=${width},height=${height},left=${left},top=${top}`
    );
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== `${import.meta.env.VITE_BASE_URL}`) return;

      const data = event.data;

      if (data?.access_token) {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        console.log('로그인 성공:', data);

        closeModal();
        navigate('/main');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <Overlay>
      <ModalBox>
        <Title>로그인 또는 회원가입</Title>
        <InputContainer>
          <Email>이메일</Email>
          <Input
            type="email"
            placeholder="id@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputContainer>

        <DisabledButton disabled>로그인</DisabledButton>

        <Divider>또는</Divider>

        <SocialButton bg="#FEE500" color="#3C1E1E" onClick={handleKakaoLogin}>
          <SiKakaotalk size={25} style={{ marginLeft: '42px' }} />
          카카오 계정으로 로그인
        </SocialButton>

        <SocialButton
          bg="#FFFFFF"
          color="#000000"
          border="1px solid #ddd"
          onClick={() => alert('구글 로그인')}
        >
          <FaGoogle size={25} style={{ marginLeft: '42px' }} />
          구글 계정으로 로그인
        </SocialButton>

        <SocialButton
          bg="#1877F2"
          color="#FFFFFF"
          onClick={() => alert('페이스북 로그인')}
        >
          <FaFacebookF size={25} style={{ marginLeft: '42px' }} />
          페이스북 계정으로 로그인
        </SocialButton>

        <SocialButton
          bg="#000000"
          color="#FFFFFF"
          onClick={() => alert('애플 로그인')}
        >
          <FaApple size={25} style={{ marginLeft: '42px' }} />
          애플 계정으로 로그인
        </SocialButton>

        <SignupLink>회원가입</SignupLink>
      </ModalBox>
    </Overlay>
  );
};

export default LoginModal;

const Overlay = styled.div`
  position: fixed;
  top: 40;
  left: 0;
  width: 1920px;
  height: 1080px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

// 모달 박스
const ModalBox = styled.div`
  width: 629px;
  height: 700px;
  padding: 50px;
  background: #fff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  color: var(--AGODA-Primary, #006a71);
  text-align: center;
  margin: 30px 0px 60px 0px;
  /* AGODA/Headline/Large */
  font-family: SUIT;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const InputContainer = styled.div`
  display: flex;
  padding: 8px 14px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid var(--AGODA-Secondary, #55a3b5);
`;
const Email = styled.span`
  color: var(--AGODA-Primary, #006a71);

  /* AGODA/Caption/Large */
  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 5px;
`;
const Input = styled.input`
  color: var(--AGODA-Secondary, #55a3b5);

  /* AGODA/Caption/Medium */
  font-family: SUIT;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 171.429% */
  border: none;
  &::placeholder {
    color: var(--AGODA-Secondary, #55a3b5);
  }
`;

const DisabledButton = styled.button`
  display: flex;
  height: 56px;
  padding: 20px 50px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  margin-top: 10px;
`;

const Divider = styled.div`
  margin: 36px 0;
  font-size: 14px;
  color: #888;
`;

const SocialButton = styled.button<{
  bg: string;
  color: string;
  border?: string;
}>`
  display: flex;
  height: 56px;
  padding: 20px 50px;
  background-color: ${(props) => props.bg};
  color: ${(props) => props.color};
  border: ${(props) => props.border || 'none'};
  border-radius: 6px;
  font-weight: 600;
  font-size: 18px;
  display: flex;
  align-items: center;
  align-self: stretch;
  gap: 100px;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const SignupLink = styled.div`
  color: var(--AGODA-Gray600, #858c9d);
  text-align: center;

  /* AGODA/Caption/Large */
  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin: 50px;
`;
