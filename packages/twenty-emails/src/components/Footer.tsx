import { type I18n } from '@lingui/core';
import { Container } from 'react-email';
import { ShadowText } from 'src/components/ShadowText';

const footerContainerStyle = {
  marginTop: '12px',
};

type FooterProps = {
  i18n: I18n;
};

export const Footer = (_props: FooterProps) => {
  return (
    <Container style={footerContainerStyle}>
      <ShadowText>CloseAI · Agens</ShadowText>
    </Container>
  );
};
