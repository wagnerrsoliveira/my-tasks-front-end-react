import React from 'react';
import { EMessage } from '../../components/Message/types';

export interface ITasksContext {
    setIsAuthenticated: (isAuthenticated: boolean) => void,
    getIsAuthenticated: () => boolean,
    setLoading: (loading: boolean) => void,
    getLoading: () => boolean,
    handleOpenMessage: (message: string, typeMessage: EMessage) => void
}

export default React.createContext<ITasksContext>({} as ITasksContext);