import styled from 'styled-components';

const GradientGlow = styled.div`
  position: relative;

  &:hover::after {
    content: '';
    position: absolute;
    bottom: 0; /* Place the glow beneath the image */
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to top,
      #FFB08E 0%,
      #B19CD9 50%,
      #FFD3B5 80%,
      white 100%
    );
    opacity: 0.8; /* Adjust opacity as needed */
    filter: blur(20px); /* Adjust blur radius as needed */
    margin-bottom: 5px;
}
`;

export default GradientGlow;
