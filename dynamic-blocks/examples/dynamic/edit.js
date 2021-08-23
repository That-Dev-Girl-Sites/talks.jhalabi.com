/**
 * EDIT: Book Block, dynamic version.
 */

const BookEdit = ( props ) => {

  const { RichText } = wp.blockEditor;
  const { TextControl } = wp.components;
  const { Fragment } = wp.element;

  const { setAttributes } = props;
  const { title, author, summary } = props.attributes;

  const onChangeTitle = ( value ) => { setAttributes( { title: value } ) };
  const onChangeAuthor = ( value ) => { setAttributes( { author: value } ) };
  const onChangeSummary = ( value ) => { setAttributes( { summary: value } ) };

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
