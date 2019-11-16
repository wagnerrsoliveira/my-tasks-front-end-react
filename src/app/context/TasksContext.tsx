import React from 'react';

export interface ITasksContext {
    setIsAuthenticated: (isAuthenticated: boolean) => void,
    getIsAuthenticated: () => boolean,
    setLoading: (loading: boolean) => void,
    getLoading: () => boolean,
}

export default React.createContext<ITasksContext>({} as ITasksContext);