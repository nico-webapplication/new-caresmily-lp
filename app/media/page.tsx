"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";

const mediaItems = [
  {
    date: "2025年4月9日",
    title: "「PR TIMES」に記事掲載",
    description: "CareSmily のリリース情報①が掲載されました。",
    source: "PR TIMES",
    link: "https://prtimes.jp/main/html/rd/p/000000001.000155002.html",
  },
  {
    date: "2025年5月8日",
    title: "「PR TIMES」に記事掲載",
    description: "CareSmily のリリース情報②が掲載されました。",
    source: "PR TIMES",
    link: "https://prtimes.jp/main/html/rd/p/000000004.000155002.html",
  },
];

function MediaItem({ date, title, description, source, link }) {
  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex gap-6">
        <div className="w-32 h-32 flex-shrink-0 bg-gray-50 flex items-center justify-center rounded-lg">
          <img
            src={`https://www.google.com/s2/favicons?domain=${new URL(link).hostname}&sz=64`}
            alt={title}
            className="w-16 h-16"
          />
        </div>
        <div className="flex-1">
          <div className="text-sm text-gray-500 mb-2">{date}</div>
          <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">{source}</span>
            <Button variant="outline" size="sm" asChild>
              <Link href={link} target="_blank" rel="noopener noreferrer">
                詳細を見る
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MediaPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(mediaItems.length / itemsPerPage);

  const paginatedItems = mediaItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="bg-gradient-to-r from-primary to-[#55C6F5] py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              メディア情報
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              CareSmily に関する報道・メディア掲載情報
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-primary hover:underline"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              ホームに戻る
            </Link>
          </div>

          <div className="space-y-6">
            {paginatedItems.map((item, index) => (
              <MediaItem key={index} {...item} />
            ))}
          </div>

          <div className="mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      onClick={() => setCurrentPage(i + 1)}
                      isActive={currentPage === i + 1}
                      className="cursor-pointer"
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
}
