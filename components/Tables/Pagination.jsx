"use client";
import {MdChevronLeft, MdChevronRight} from "react-icons/md";

export default function Example({
                                    currentPage,
                                    setCurrentPage,
                                    itemsPerPage = 20,
                                    totalData,
                                    totalPages,
                                }) {
    const numPages = totalPages;

    const handlePrevious = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNext = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, numPages));
    };
    return (
        <div className="flex items-center bg-white px-4 py-3 sm:px-6 rounded-[16px]">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-end text-12 leading-16">
                <div>
                    <p className="text-sm text-secondary-500 border-r pr-2">
                        Showing{" "}
                        <span className="font-medium">
              {(currentPage - 1) * itemsPerPage + 1}
            </span>{" "}
                        -{" "}
                        <span className="font-medium">
              {totalData < 50
                  ? totalData
                  : Math.min((currentPage - 1) * itemsPerPage + 1) +
                  itemsPerPage -
                  1}
            </span>{" "}
                        of <span className="font-medium">{totalData}</span>
                    </p>
                </div>
                <div>
                    <nav
                        className="isolate inline-flex -space-x-px"
                        aria-label="Pagination"
                    >
                        <button
                            onClick={handlePrevious}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
                        >
                            <span className="sr-only">Previous</span>
                            <MdChevronLeft className={currentPage === 1 ? "h-5 w-5" : "h-5 w-5 text-primary-900"}
                                           aria-hidden="true"/>
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={currentPage === numPages}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
                        >
                            <span className="sr-only">Next</span>
                            <MdChevronRight
                                className={totalPages === 1 || currentPage === totalPages ? "h-5 w-5" : "h-5 w-5 text-primary-900"}
                                aria-hidden="true"
                            />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
}
