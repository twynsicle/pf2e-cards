import { CardList } from './components/CardList/CardList';
import { IStackItemStyles, Stack } from '@fluentui/react';
import { Sidebar } from './components/Sidebar/Sidebar';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { setIconOptions } from '@fluentui/react/lib/Styling';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import styled from '@emotion/styled';
import * as Sentry from '@sentry/react';

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

    @media only screen and (max-width: 799px) {
        width: 100%;
    }
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

    @media only screen and (max-width: 799px) {
        display: none;
    }
`;

function App() {
    const persistedStore = persistStore(store);

    Sentry.init({
        dsn: 'https://3ca38ff429aa40e6bd78167b5e8b0c15@o4504935193837568.ingest.sentry.io/4504935195344896',
        integrations: [new Sentry.BrowserTracing()],
        tracesSampleRate: 0.0,
    });

    return (
        <>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistedStore}>
                    <CardListWrapper>
                        <CardList />
                    </CardListWrapper>
                    <SidebarWrapper>
                        <Sidebar />
                    </SidebarWrapper>
                </PersistGate>
            </Provider>
        </>
    );
}

export default App;
