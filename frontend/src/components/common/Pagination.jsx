import { Button } from "./Button";

export function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="pagination">
      <Button variant="ghost" disabled={page === 1} onClick={() => onPageChange(page - 1)}>Previous</Button>
      <span>Page {page} of {totalPages}</span>
      <Button variant="ghost" disabled={page === totalPages} onClick={() => onPageChange(page + 1)}>Next</Button>
    </div>
  );
}
