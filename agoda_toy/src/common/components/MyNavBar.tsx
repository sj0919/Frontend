import styled from 'styled-components';
import MyCnd from '../../assets/mynav/my_res_icn_cnd.svg?react';
import MyChat from '../../assets/mynav/my_rev_icn_chat.svg?react';
import MyReview from '../../assets/mynav/my_rev_icn_review.svg?react';
import MySet from '../../assets/mynav/my_rev_icn_set.svg?react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function MyNavBar() {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();

  return (
    <Container>
      <NavFrame
        onClick={() => navigate('/myres')}
        $isClicked={pathname.includes('myres')}
      >
        <MyCndIcon $isClicked={false} />
        <NavText>모든 예약</NavText>
      </NavFrame>
      <NavFrame
        onClick={() => navigate('/myrev')}
        $isClicked={pathname.includes('myrev')}
      >
        <MyReviewIcon $isClicked={pathname.includes('myrev')} />
        <NavText>이용 후기</NavText>
      </NavFrame>
      <NavFrame $isClicked={false}>
        <MyChatIcon $isClicked={false} />
        <NavText>메시지</NavText>
      </NavFrame>
      <NavFrame $isClicked={false}>
        <MySetIcon $isClicked={false} />
        <NavText>설정</NavText>
      </NavFrame>
    </Container>
  );
}

const Container = styled.nav`
  display: flex;
  width: 15.3rem;
  height: 13.3rem;
  padding: 1.5rem 0.75rem;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  border-radius: 1.25rem;
  border: 1px solid rgba(172, 172, 172, 1);
  background: var(--AGODA-White, #fff);
`;

const NavFrame = styled.div<{ $isClicked: boolean }>`
  list-style-type: none;
  display: flex;
  width: 10.8rem;
  height: 0 1.69rem;
  padding: 0.8125rem 2rem;
  align-items: center;
  gap: 1.5rem;
  flex-shrink: 0;

  border-radius: 0.5rem;

  background-color: ${({ $isClicked, theme }) =>
    $isClicked ? theme.colors.primary : theme.colors.white};
  color: ${({ $isClicked, theme }) =>
    $isClicked ? theme.colors.white : theme.colors.black};

  cursor: pointer;
`;

const NavText = styled.p`
  display: flex;
  width: 5.25rem;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  align-self: stretch;

  ${({ theme }) => theme.fonts.body.lg};
`;

const WrapSvgIcon = <T extends React.FC<React.SVGProps<SVGSVGElement>>>(
  IconComponent: T
) => styled(IconComponent)<{ $isClicked: boolean }>`
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  stroke: ${({ $isClicked }) => ($isClicked ? '#ffffff' : '#000000')};
`;
const MyCndIcon = WrapSvgIcon(MyCnd);
const MyReviewIcon = WrapSvgIcon(MyReview);
const MyChatIcon = WrapSvgIcon(MyChat);
const MySetIcon = WrapSvgIcon(MySet);
