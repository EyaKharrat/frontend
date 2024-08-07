import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import { styled } from '@mui/system';

const FooterContainer = styled(Box)({
  backgroundColor: '#333',
  color: 'white',
  padding: '20px 0',
  marginTop: '20px',
});

const Footer = () => (
  <FooterContainer>
    <Container>
      <Typography variant="body2" align="center">
        &copy; {new Date().getFullYear()} Your Store. All rights reserved.
      </Typography>
      <Typography variant="body2" align="center">
        <Link href="/terms" color="inherit">
          Terms
        </Link>{' '}
        |{' '}
        <Link href="/privacy" color="inherit">
          Privacy
        </Link>
      </Typography>
    </Container>
  </FooterContainer>
);

export default Footer;
