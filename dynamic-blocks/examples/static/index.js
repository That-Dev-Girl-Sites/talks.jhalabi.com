/**
 * Book Block, static version.
 */

import BookEdit from './edit.js';
import BookSave from './save.js';

const Book = ( () => {

  const { registerBlockType } = wp.blocks;

  registerBlockType( 'my/book', {
    title: 'Book',
    description: 'A simple book block.',
    category: 'text',
    icon: 'book-alt',

    attributes: {
      title: { type: 'text' },
      author: { type: 'text' }
    },

    edit: ( props ) => {
      return ( BookEdit( props ) );
    },

    save: ( props ) => {
      return ( BookSave( props ) );
    }

  } );

} )();

export default Book;
