/**
 * SAVE: Book Block, static version.
 */

const BookSave = ( props ) => {

  const { title, author } = props.attributes;

  return (
    <div class="my-book-block">
      <p>{ title }</p>
      <p>{ author }</p>
    </div>
  );

}

export default BookSave;
