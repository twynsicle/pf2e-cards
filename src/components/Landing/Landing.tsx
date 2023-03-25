import styled from '@emotion/styled';

const LandingWrapper = styled.div`
    position: relative;
    height: 100vh;
    box-sizing: border-box;
    overflow-y: scroll;
    color: #666;
    text-align: center;
    padding: 200px 20px 0;
`;
const Pathfinder = styled.h1`
    position: relative;
    z-index: 1;
    font-size: 60px;
`;
const PrintableCards = styled.h1`
    position: relative;
    z-index: 1;
    font-size: 40px;
    color: #777;
`;
const Logo = styled.div`
    margin-top: -150px;
`;

const Content = styled.div`
    margin-top: -60px;
`;

const Instructions = styled.div`
    font-size: 20px;
    padding: 0 20% 20px;

    @media only screen and (max-width: 799px) {
        display: none;
    }
`;

const MobileUnfriendly = styled.div`
    font-size: 25px;
    margin-top: -60px;
    display: block;
    @media only screen and (min-width: 800px) {
        display: none;
    }
`;

const BottomSection = styled.div`
    position: absolute;
    padding: 0 5% 20px;
    bottom: 0;
    @media only screen and (min-width: 800px) {
        padding: 0 20% 20px;
    }
`;

const Contact = styled.div`
    margin-bottom: 20px;
    a {
        font-weight: bold;
        color: #777;
        text-decoration: none;
    }
    a:hover {
        color: #555;
    }
`;

const LegalNotice = styled.p`
    font-size: 12px;
    line-height: 14px;
    color: #888;
`;

export const Landing = () => {
    return (
        <LandingWrapper>
            <Pathfinder>Pathfinder 2e</Pathfinder>
            <PrintableCards>Printable Cards</PrintableCards>
            <Logo>
                <img src="logo.png" title="logo" alt="logo" className="logo" />
            </Logo>

            <Content>
                <MobileUnfriendly>Sorry, this website is not supported at this resolution.</MobileUnfriendly>
                <Instructions>
                    Select your items in the sidebar. Use the settings tab to adjust the number of cards per page. You
                    may be able to fit more cards on each page by printing in landscape.
                </Instructions>
            </Content>

            <BottomSection>
                <Contact>
                    If you spot any mistakes, or want to get in touch, flick me an email at{' '}
                    <a href="mailto: pf2eprintablecards@gmail.com">pf2eprintablecards@gmail.com</a>.
                </Contact>
                <LegalNotice>
                    This website uses trademarks and/or copyrights owned by Paizo Inc., which are used under Paizo's
                    Community Use Policy. We are expressly prohibited from charging you to use or access this content.
                    This website is not published, endorsed, or specifically approved by Paizo Inc. For more information
                    about Paizo's Community Use Policy, please visit paizo.com/communityuse. For more information about
                    Paizo Inc. and Paizo products, please visit paizo.com.
                </LegalNotice>
            </BottomSection>
        </LandingWrapper>
    );
};
