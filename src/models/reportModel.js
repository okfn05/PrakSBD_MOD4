import { pool } from '../config/db.js';

export const ReportModel = {
  async getLibraryStats() {
    const [totalBooks, totalAuthors, totalCategories, activeBorrows] = await Promise.all([
      pool.query('SELECT COUNT(*) FROM books'),
      pool.query('SELECT COUNT(*) FROM authors'),
      pool.query('SELECT COUNT(*) FROM categories'),
      pool.query(`SELECT COUNT(*) FROM loans WHERE status = 'BORROWED'`),
    ]);

    return {
      total_books: parseInt(totalBooks.rows[0].count),
      total_authors: parseInt(totalAuthors.rows[0].count),
      total_categories: parseInt(totalCategories.rows[0].count),
      active_borrows: parseInt(activeBorrows.rows[0].count),
    };
  }
};