import React, { useState } from "react";
import "./App.css";
import Button from "./components/ui/button";
import { Filter, FilterOption } from "./components/ui/filter";
import { SearchButton } from "./components/ui/search";
import {
  Pagination,
  PaginationItem,
  PaginationEllipsis,
  PaginationNext,
  PaginationPrevious,
} from "./components/ui/pagination";
import { Breadcrumb, BreadcrumbItem } from "./components/ui/breadcrumb";
function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;
  return (
    <>
      <div className="font-raleway bg-black">
        <h1 className="text-green-600">Hello World</h1>
        <Button>Contact Us</Button>
        <Filter>
          <FilterOption value="option1">Option 1</FilterOption>
          <FilterOption value="option2">Option 2</FilterOption>
          <FilterOption value="option3">Option 3</FilterOption>
        </Filter>
        <SearchButton />
        <Pagination>
          <PaginationPrevious
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          />
          <PaginationItem
            isActive={currentPage === 1}
            onClick={() => setCurrentPage(1)}
          >
            1
          </PaginationItem>
          <PaginationItem
            isActive={currentPage === 2}
            onClick={() => setCurrentPage(2)}
          >
            2
          </PaginationItem>
          <PaginationEllipsis />
          <PaginationItem
            isActive={currentPage === 5}
            onClick={() => setCurrentPage(5)}
          >
            5
          </PaginationItem>
          <PaginationNext
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          />
        </Pagination>
        <Breadcrumb>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/category">Category</BreadcrumbItem>
          <BreadcrumbItem href="/subcategory">Subcategory</BreadcrumbItem>
          <BreadcrumbItem>Current Page</BreadcrumbItem>
        </Breadcrumb>
      </div>
    </>
  );
}

export default App;
