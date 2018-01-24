export const INIT_PAGE = 'INIT_PAGE';
export const initPageInfo = (params) => ({
    type: INIT_PAGE,
    ...params
});