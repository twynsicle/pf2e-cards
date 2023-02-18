import { CardList } from './components/CardList/CardList';
import { IStackItemStyles, Stack } from '@fluentui/react';
import { Sidebar } from './components/Sidebar/Sidebar';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { setIconOptions } from '@fluentui/react/lib/Styling';
import styled from '@emotion/styled';

initializeIcons(/* optional base url */);
setIconOptions({
    disableWarnings: true,
});

const stackStyles: IStackItemStyles = {
    root: {
        width: '100%',
        alignItems: 'stretch',
    },
};

const CardListWrapper = styled.div`
    @media print {
        width: 100%;
    }
    //width: 75%;
    background-color: #f8f7f6;
    width: calc(100% - 350px);
    float: left;

    box-sizing: border-box;
`;

const SidebarWrapper = styled.div`
    @media print {
        display: none;
    }
    width: 350px;
    float: right;
    //background-color: white;
    box-shadow: rgb(0, 0, 0, 0.22) 0 25.6px 57.6px 0, rgb(0, 0, 0, 0.18) 0 4.8px 14.4px;

    box-sizing: border-box;
`;

function App() {
    return (
        <>
            <Provider store={store}>
                <CardListWrapper>
                    <CardList />
                </CardListWrapper>
                <SidebarWrapper>
                    <Sidebar />
                </SidebarWrapper>
                {/*<Stack horizontal horizontalAlign={'stretch'} styles={stackStyles}>*/}
                {/*    <Stack.Item grow={5}>*/}
                {/*        <CardList />*/}
                {/*    </Stack.Item>*/}
                {/*    <Stack.Item className="sidebar">*/}
                {/*        <Sidebar />*/}
                {/*    </Stack.Item>*/}
                {/*</Stack>*/}
            </Provider>
        </>
    );
}

export default App;
