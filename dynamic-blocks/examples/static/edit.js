/**
 * EDIT: Book Block, static version.
 */

const BookEdit = ( props ) => {

  const { TextControl } = wp.components;
  const { Fragment } = wp.element;

  const { setAttributes } = props;
  const { title, author } = props.attributes;

  const onChangeTitle = ( value ) => { setAttributes( { title: value } ) };
  const onChangeAuthor = ( value ) => { setAttributes( { author: value } ) };

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
