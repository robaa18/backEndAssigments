import React, { useRef, useState } from 'react';
import { BookCard3D } from './BookCard3D';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

export const BookScrollFolio = ({ 
  books = [], 
  onUpdateYear, 
  onAddLog, 
  onDelete, 
  onSelectGenre,
  borrowedBookIds
}) => {
  // Chunk books into shelves of maximum 4 books per row
  const SHELF_SIZE = 4;
  const shelves = [];
  for (let i = 0; i < books.length; i += SHELF_SIZE) {
    shelves.push(books.slice(i, i + SHELF_SIZE));
  }

  return (
    <div className="relative w-full my-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#2C64AC]" />
          <h3 className="font-showcard text-lg sm:text-xl text-[#2C64AC] tracking-wide flex items-center gap-2">
            <span>BOOK SHELF</span>
            <span className="text-xs font-papabear font-bold text-[#595667] bg-[#EAEAEF] px-2 py-0.5 rounded-full">
              {books.length} {books.length === 1 ? 'Book' : 'Books'} {shelves.length > 1 ? `• ${shelves.length} Shelves` : ''}
            </span>
          </h3>
        </div>
      </div>

      {/* Multi-Tier Bookshelf */}
      {shelves.length > 0 ? (
        <div className="space-y-6">
          {shelves.map((shelfBooks, shelfIdx) => (
            <div key={shelfIdx} className="relative">
              {/* Shelf Tier Tag if multiple shelves */}
              {shelves.length > 1 && (
                <div className="flex items-center gap-2 mb-2 px-1">
                  <span className="text-[11px] font-showcard uppercase tracking-wider text-[#2C64AC] bg-[#EAEAEF] px-2.5 py-0.5 rounded-full">
                    SHELF {shelfIdx + 1}
                  </span>
                  <div className="h-[1px] flex-1 bg-[#E2E2E6]" />
                  <span className="text-[10px] font-papabear font-bold text-[#595667]">
                    {shelfBooks.length} / 4 Books
                  </span>
                </div>
              )}

              {/* Books Row: Maximum 4 books per row with generous spacing without losing book shape */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7 justify-items-center pt-2 pb-2">
                {shelfBooks.map((book, index) => (
                  <div 
                    key={book._id ? String(book._id) : index} 
                    className="transition-all duration-300 hover:-translate-y-2 flex justify-center w-full"
                  >
                    <BookCard3D
                      book={book}
                      isBorrowed={borrowedBookIds ? borrowedBookIds.has(String(book._id || book.id || book.title)) : undefined}
                      onUpdateYear={onUpdateYear}
                      onAddLog={onAddLog}
                      onDelete={onDelete}
                      onSelectGenre={onSelectGenre}
                    />
                  </div>
                ))}
              </div>

              {/* Storybook Shelf Wooden Ledge for this row */}
              <div className="relative z-0 px-1 mt-1">
                <div className="w-full h-3.5 bg-gradient-to-r from-[#D6D0C2] via-[#ECE8DE] to-[#D6D0C2] rounded-md shadow-md border-b-2 border-[#BEB8AA]" />
                <div className="w-full h-2 bg-gradient-to-b from-black/15 to-transparent rounded-full blur-[2px]" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full text-center py-10 bg-white rounded-3xl p-6 border border-dashed border-[#D5D5D8] shadow-notebook">
          <BookOpen className="w-10 h-10 text-[#2C64AC]/40 mx-auto mb-2" />
          <p className="font-showcard text-lg text-[#2C64AC]">NO BOOKS ON THE SHELF</p>
          <p className="font-papabear text-xs sm:text-sm text-[#595667] max-w-sm mx-auto mt-1">
            Your library is currently empty. Add your first book above or use starter books.
          </p>
        </div>
      )}
    </div>
  );
};
