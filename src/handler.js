/* eslint-disable object-shorthand */
import { nanoid } from "nanoid";
import books from "./books.js";

const addbookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    publisher,
    pageCount,
    readPage,
    reading,
    summary,
  } = request.payload;

  if (name == null) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  const newbook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    insertedAt,
    updatedAt,
  };

  books.push(newbook);
  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Buku gagal ditambahkan",
  });
  response.code(500);
  return response;
};

const getAllbooksHandler = (request, h) => {
  const { reading, name, finished } = request.query;
  const data = books
    .filter((value) => {
      console.log(
        `value : ${value.name} ${value.name.includes(name)} , ${name}`
      );
      if (
        typeof name !== "undefined" &&
        name !== null &&
        value.name.toLowerCase().includes(name.toLowerCase()) === false
      ) {
        return false;
      }
      if (
        typeof reading !== "undefined" &&
        reading !== null &&
        value.reading !== (reading === "0" ? false : true)
      ) {
        return false;
      }
      if (
        typeof finished !== "undefined" &&
        finished !== null &&
        value.finished !== (finished === "0" ? false : true)
      ) {
        return false;
      }
      return true;
    })
    .map((value) => ({
      id: value.id,
      name: value.name,
      publisher: value.publisher,
    }));

  return {
    status: "success",
    data: {
      books: data,
    },
  };
};

const getbookByIdHandler = (request, h) => {
  const { id } = request.params;

  const book = books.filter((n) => n.id === id)[0];

  if (book !== undefined) {
    const response = h.response({
      status: "success",
      data: {
        book: book,
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};

const editbookByIdHandler = (request, h) => {
  const { id } = request.params;

  const {
    name,
    year,
    author,
    publisher,
    pageCount,
    readPage,
    reading,
    summary,
  } = request.payload;

  if (name == null) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  const updatedAt = new Date().toISOString();
  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      publisher,
      pageCount,
      summary,
      readPage,
      reading,
      updatedAt,
    };

    const response = h.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui buku. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

const deletebookByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

export {
  addbookHandler,
  getAllbooksHandler,
  getbookByIdHandler,
  editbookByIdHandler,
  deletebookByIdHandler,
};
