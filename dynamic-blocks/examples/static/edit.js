/**
 * EDIT: Book Block, static version.
 */

const BookEdit = ( props ) => {

  // Get WP packages.
  const { TextControl } = wp.components;
  const { Fragment } = wp.element;

  // Get block properties.
  const { setAttributes } = props;
  const { title, author } = props.attributes;

  // Set on change callbacks.
  const onChangeTitle = ( value ) => { setAttributes( { title: value } ) };
  const onChangeAuthor = ( value ) => { setAttributes( { author: value } ) };

  // Return the edit markup.
  return (
    <Fragment>
      <TextControl
        label='Title'
        value={ title }
        onChange={ onChangeTitle }
      />

      <TextControl
        label='Author'
        value={ author }
        onChange={ onChangeAuthor }
      />
    </Fragment>
  );

}

export default BookEdit;
