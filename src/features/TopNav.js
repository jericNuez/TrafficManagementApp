import styled from 'styled-components';
import tmsLogo from '../assets/images/tms-topbar-logo.png';

function TopNav() {
  return (
    <StyledContainer>
      <StyledLogo alt="tmsLogo" src={tmsLogo} />
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 64px;
  filter: drop-shadow(0px 1px 1px rgba(70, 70, 70, 0.1));
`;

const StyledLogo = styled.img`
  margin: 16px 21px;
  height: 34px;
`;

export default TopNav;
