import styled from 'styled-components';
import { Colors } from '../constants/Colors';
import Checkbox from '@mui/material/Checkbox';

function SideBar() {
  return (
    <StyledContainer>
      <Section>
        <SectionTitle>Event Type</SectionTitle>
        <Checkbox label="Label 1" defaultChecked />
      </Section>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  position: absolute;
  height: calc(100vh - 64px);
  width: 360px;
  padding: 23px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin: 22px 0;
`;

const SectionTitle = styled.h3`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: ${Colors.heydenGreyDark};
`;

export default SideBar;
