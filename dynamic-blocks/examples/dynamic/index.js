/**
 * Book Block, dynamic version.
 */

import BookEdit from './edit.js';

const Book = ( () => {

  const { registerBlockType } = wp.blocks;

  registerBlockType( 'my/book', {
    title: 'Book',
    description: 'A simple book block.',
    category: 'text',
    icon: 'book-alt',

    edit: ( props ) => {
      return ( BookEdit( props ) );
    },

    save: () => {
      return null;
    }

  } );

} )();

export default Book;
