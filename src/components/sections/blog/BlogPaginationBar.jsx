import React from "react";
import { classNames } from "../../../utils/classNames";
import {
  Pagination,
  PaginationItem,
  PaginationEllipsis,
  PaginationNext,
} from "../../ui/pagination";
import Button from "../../ui/button";

const BlogPaginationBar = React.forwardRef(({
  currentPage = 1,
  totalPages = 20,
  totalResults = 200,
  resultsPerPage = 12,
  visibleResults,
  onPageChange,
  onLoadMore,
  onShowLess,
  className = "",
  ...props
}, ref) => {
  const startResult = 1;
  const endResult = visibleResults != null
    ? Math.min(visibleResults, totalResults)
    : Math.min(currentPage * resultsPerPage, totalResults);

  const getVisiblePages = () => {
    const pages = [1];
    if (currentPage > 3) pages.push("ellipsis-start");
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 2); i++) {
      if (!pages.includes(i)) pages.push(i);
    }
    if (currentPage < totalPages - 3) pages.push("ellipsis-end");
    if (totalPages > 1 && !pages.includes(totalPages)) pages.push(totalPages);
    return pages;
  };

  return (
    <div
      ref={ref}
      className={classNames("flex flex-col items-center gap-md", className)}
      {...props}
    >
      {/* Load More / Show Less buttons */}
      {(onLoadMore || onShowLess) && (
        <div className="flex flex-wrap items-center justify-center gap-3">
          {onShowLess && (
            <Button
              variant="secondaryOutline"
              shape="pill"
              size="small"
              className="h-[40px] bg-primary-light-default! px-[24px]"
              onClick={onShowLess}
            >
              Show Less
            </Button>
          )}
          {onLoadMore && (
            <Button
              variant="secondaryOutline"
              shape="pill"
              size="small"
              className="h-[40px] bg-primary-light-default! px-[24px]"
              onClick={onLoadMore}
            >
              Load More
            </Button>
          )}
        </div>
      )}

      {/* Pagination */}
      <Pagination>
        {getVisiblePages().map((page, i) => {
          if (typeof page === "string") {
            return <PaginationEllipsis key={page} />;
          }
          return (
            <PaginationItem
              key={page}
              isActive={page === currentPage}
              onClick={() => onPageChange?.(page)}
            >
              {page}
            </PaginationItem>
          );
        })}
        <PaginationNext
          onClick={() => onPageChange?.(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        />
      </Pagination>

      {/* Results text */}
      <p className="font-raleway font-normal text-[13px] leading-[18px] text-primary-dark-darker">
        Showing results <span className="font-semibold text-secondary-normal-active">{startResult}-{endResult}</span> of <span className="font-semibold text-secondary-normal-active">{totalResults}</span>
      </p>
    </div>
  );
});

BlogPaginationBar.displayName = "BlogPaginationBar";
export default BlogPaginationBar;
