import { useEffect, useState } from 'react';
import { Book } from '../../data/bible/models/Book';
import { BibleRepository } from '../../data/bible/repositories/BibleRepository';

export function useBibleViewModel() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const repo = new BibleRepository();
    repo.getBooks()
      .then(setBooks)
      .finally(() => setLoading(false));
  }, []);

  return { books, loading };
}
