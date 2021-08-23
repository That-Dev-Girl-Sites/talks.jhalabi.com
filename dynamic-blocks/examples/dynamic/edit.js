/**
 * EDIT: Book Block, dynamic version.
 */

const BookEdit = ( props ) => {

  // Get WP packages.
  const { RichText } = wp.blockEditor;
  const { TextControl } = wp.components;
  const { Fragment } = wp.element;

  // Get block properties.
  const { setAttributes } = props;
  const { title, author, summary } = props.attributes;

  // Set on change callbacks.
  const onChangeTitle = ( value ) => { setAttributes( { title: value } ) };
  const onChangeAuthor = ( value ) => { setAttributes( { author: value } ) };
  const onChangeSummary = ( value ) => { setAttributes( { summary: value } ) };

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

      <RichText
        placeholder='Book summary goes here.'
        value={ summary }
        onChange={ onChangeSummary }
        allowedFormats={ [ 'core/bold', 'core/italic' ] }
      />
    </Fragment>
  );

}

export default BookEdit;
