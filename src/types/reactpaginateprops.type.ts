export interface ReactPaginateProps {
    pageCount: number;
    pageRangeDisplayed: number;
    marginPagesDisplayed: number;
    previousLabel?: React.ReactNode | undefined;
    nextLabel?: React.ReactNode | undefined;
    breakLabel?: string | React.ReactNode | undefined;
    breakClassName?: string | undefined; /** The classname on tag `li` of the ellipsis element. */
    breakLinkClassName?: string | undefined; /*The classname on tag `a` of the ellipsis element. */
    onPageChange?(selectedItem: { selected: number }): void;
    onPageActive?(selectedItem: { selected: number }): void; /*The method to call when an active page is clicked. Exposes the active page object as an argument.*/
    initialPage?: number | undefined;
    forcePage?: number | undefined;
    disableInitialCallback?: boolean | undefined;
    containerClassName?: string | undefined;
    pageClassName?: string | undefined;
    pageLinkClassName?: string | undefined;
    pageLabelBuilder?: ((page: number) => string) | undefined;
    activeClassName?: string | undefined;
    activeLinkClassName?: string | undefined;
    previousClassName?: string | undefined;
    nextClassName?: string | undefined;
    previousLinkClassName?: string | undefined;
    nextLinkClassName?: string | undefined;
    disabledClassName?: string | undefined;
    hrefBuilder?(pageIndex: number): void;
    extraAriaContext?: string | undefined;
    ariaLabelBuilder?: ((pageIndex: number, selected: boolean) => string) | undefined;
    eventListener?: string | undefined;
}

declare const ReactPaginate: React.ComponentClass<ReactPaginateProps>;
export default ReactPaginate;
