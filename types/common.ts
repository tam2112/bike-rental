import { Dispatch, SetStateAction } from 'react';

export type PaginationHooksType = {
    setCurrentPage: Dispatch<SetStateAction<number>>;
    triggerLoading: (callback: () => void) => void;
};
