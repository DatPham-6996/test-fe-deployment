import { createContext, ReactNode, useContext, useReducer } from 'react';
import { isMobile } from 'react-device-detect';

interface OrganizerState {
    isSidenavCollapsed: boolean;
}

interface OrganizerContextType {
    state: OrganizerState;
    toggleSidenav: () => void;
}

type OrganizerAction = { type: 'TOGGLE_SIDENAV' };

const OrganizerContext = createContext<OrganizerContextType | undefined>({
    state: {
        isSidenavCollapsed: !isMobile
    },
    toggleSidenav: () => { }
});

const useOrganizerContext = () => {
    const context = useContext(OrganizerContext);
    if (!context) {
        throw new Error('useOrganizerContext must be used within an OrganizerProvider');
    }
    return context;
};

const OrganizerProvider = ({ children }: { children: ReactNode; }) => {
    const reducer = (state: OrganizerState, action: OrganizerAction): OrganizerState => {
        switch (action.type) {
            case 'TOGGLE_SIDENAV':
                return {
                    ...state,
                    isSidenavCollapsed: !state.isSidenavCollapsed
                };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, {
        isSidenavCollapsed: false
    });

    const toggleSidenav = () => {
        dispatch({ type: 'TOGGLE_SIDENAV' });
    };

    return (
        <OrganizerContext.Provider value={{ state, toggleSidenav }}>
            {children}
        </OrganizerContext.Provider>
    );
};

export { OrganizerProvider, useOrganizerContext };
