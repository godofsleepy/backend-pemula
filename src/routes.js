/* eslint-disable import/named */
import {
  addbookHandler, getAllbooksHandler, getbookByIdHandler, editbookByIdHandler,
  deletebookByIdHandler,
} from './handler.js';

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addbookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllbooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getbookByIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editbookByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deletebookByIdHandler,
  },
];

export default routes;
