import styled from '@emotion/styled';
import { IcMenu, Logo } from '../assets/0_index';
import { useLocation, useNavigate } from 'react-router-dom';
import TradeNowBtn from '../../onboarding/Components/TradeNowBtn';
import ConnectWallet from '../../wallet/ConnectWallet';
import { transformStyles } from '../styles/transformStyles';
import useMobile from '../hooks/useMobile';
import MobileSideNav from './MobileSideNav';
import { useState } from 'react';

interface HeaderProps {
  pathname?: string;
  scrollToSection?: (ref: React.RefObject<HTMLDivElement>) => void;
  section2Ref?: React.RefObject<HTMLDivElement>;
  section3Ref?: React.RefObject<HTMLDivElement>;
  section4Ref?: React.RefObject<HTMLDivElement>;
  onClose?: () => void;
}

const Header = ({
  scrollToSection,
  section2Ref,
  section3Ref,
  section4Ref,
}: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <StContainer>
      <StWrapper>
        <StLogo onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />
        {isMobile ? (
          <>
            <IcMenu onClick={() => setIsMenuOpen(true)} />
            {isMenuOpen && (
              <MobileSideNav
                isOpen={isMenuOpen}
                onClose={() => {
                  setIsMenuOpen(false);
                }}
              >
                <HeaderNav
                  pathname={location.pathname}
                  scrollToSection={scrollToSection}
                  section2Ref={section2Ref}
                  section3Ref={section3Ref}
                  section4Ref={section4Ref}
                  onClose={() => setIsMenuOpen(false)}
                />
              </MobileSideNav>
            )}
          </>
        ) : location.pathname === '/onboarding' ? (
          <HeaderNav
            pathname={location.pathname}
            scrollToSection={scrollToSection}
            section2Ref={section2Ref}
            section3Ref={section3Ref}
            section4Ref={section4Ref}
          />
        ) : (
          <ConnectWallet />
        )}
      </StWrapper>
    </StContainer>
  );
};

const HeaderNav = ({
  pathname,
  scrollToSection,
  section2Ref,
  section3Ref,
  section4Ref,
  onClose,
}: HeaderProps) => {
  return (
    <StNav>
      <StNavItem
        onClick={() => {
          onClose && onClose();
          scrollToSection && section2Ref && scrollToSection(section2Ref);
        }}
      >
        About
      </StNavItem>
      <StNavItem
        onClick={() => {
          onClose && onClose();
          scrollToSection && section3Ref && scrollToSection(section3Ref);
        }}
      >
        Features
      </StNavItem>
      <StNavItem
        onClick={() => {
          onClose && onClose();
          scrollToSection && section4Ref && scrollToSection(section4Ref);
        }}
      >
        Process
      </StNavItem>
      <StNavItem
        onClick={() => window.open('https://blockwavelabs-1.gitbook.io/qve')}
      >
        Docs
      </StNavItem>
      {pathname === '/onboarding' ? <TradeNowBtn /> : <ConnectWallet />}
    </StNav>
  );
};

export default Header;

const StContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: linear-gradient(to bottom, #f8f2fc 80%, #f8f2fc 100%); */
  backdrop-filter: blur(15px);
  z-index: 1;
  padding: 0;
  margin: 0;
`;

const StWrapper = styled.div`
  position: relative;
  height: 4.6rem;
  width: 100%;
  max-width: 120rem;
  margin: 3.2rem 0rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${transformStyles}

  @media (${({ theme }) => theme.breakpoints.mobile}) {
    margin: 2.5rem 2rem;
  }
`;

const StLogo = styled(Logo)`
  width: 15.9rem;

  @media (${({ theme }) => theme.breakpoints.mobile}) {
    width: 14.4rem;
  }
`;

const StNav = styled.nav`
  display: flex;
  gap: 3.5rem;

  @media (${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    width: 100%;
    gap: 2rem;
    align-items: start;
    margin-top: 6rem;
  }
`;

const StNavItem = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.fonts.body_2m};

  &:hover {
    color: ${({ theme }) => theme.colors.pink_main};
  }
  @media (${({ theme }) => theme.breakpoints.mobile}) {
    &:nth-of-type(4) {
      margin-bottom: 6.4rem;
    }
  }
`;
