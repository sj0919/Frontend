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

        <Input
          type="email"
          placeholder="id@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <DisabledButton disabled>로그인</DisabledButton>

        <Divider>또는</Divider>

        <SocialButton bg="#FEE500" color="#3C1E1E" onClick={handleKakaoLogin}>
          <SiKakaotalk size={18} />
          카카오 계정으로 로그인
        </SocialButton>

        <SocialButton
          bg="#FFFFFF"
          color="#000000"
          border="1px solid #ddd"
          onClick={() => alert('구글 로그인')}
        >
          <FaGoogle size={18} />
          구글 계정으로 로그인
        </SocialButton>

        <SocialButton
          bg="#1877F2"
          color="#FFFFFF"
          onClick={() => alert('페이스북 로그인')}
        >
          <FaFacebookF size={18} />
          페이스북 계정으로 로그인
        </SocialButton>

        <SocialButton
          bg="#000000"
          color="#FFFFFF"
          onClick={() => alert('애플 로그인')}
        >
          <FaApple size={18} />
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
  top: 0;
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
  height: 760px;
  padding: 50px;
  background: #fff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 18px;
  color: #1d3557;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
`;

const DisabledButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #e0e0e0;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  cursor: not-allowed;
`;

const Divider = styled.div`
  margin: 20px 0;
  font-size: 14px;
  color: #888;
`;

const SocialButton = styled.button<{
  bg: string;
  color: string;
  border?: string;
}>`
  width: 100%;
  padding: 12px;
  background-color: ${(props) => props.bg};
  color: ${(props) => props.color};
  border: ${(props) => props.border || 'none'};
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const SignupLink = styled.div`
  margin-top: 16px;
  font-size: 14px;
  color: #007aff;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
`;
