import React from 'react';
import styled from 'styled-components';

export default function Price() {
  return (
    <Container>
      <BeforeFrame>
        <BeforeSale>￦ 100,000</BeforeSale>
        <SalePrice>-20%</SalePrice>
      </BeforeFrame>
      <AfterSaleFrame>
        <AfterSale>￦ 80,000</AfterSale>
        <Text>1박당 요금</Text>
      </AfterSaleFrame>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 16.9375rem;
  flex-direction: column;
  align-items: flex-start;

  height: 6.63rem;
  margin-top: 1.75rem;
  margin-bottom: 0.56rem;
`;

const BeforeFrame = styled.div`
  display: flex;
  align-items: center;

  width: 14.6rem;
  height: 2.38rem;

  justify-content: space-between;
`;

const BeforeSale = styled.h2`
  color: var(--AGODA-Gray900, #535762);
  text-decoration-line: line-through;
  ${({ theme }) => theme.fonts.display.sm};
`;

const AfterSale = styled.h1`
  color: var(--AGODA-Black, #23262c);
  ${({ theme }) => theme.fonts.display.lg};
`;

const SalePrice = styled.p`
  ${({ theme }) => theme.fonts.headline.lg};
  color: ${({ theme }) => theme.colors.warning};
  align-self: flex-end;
`;

const Text = styled.p`
  margin-right: 0.5rem;
  ${({ theme }) => theme.fonts.title.md};
`;

const AfterSaleFrame = styled.div`
  display: flex;
  width: 22.1rem;

  align-items: end;
  justify-content: space-between;
`;
