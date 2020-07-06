# See What I Mean?
## Data Visualization in WordPress

---

# Expectation setting

* I will be glossing over basic Gutenberg block creation.
* I will be sharing some bits of block JS/React and some PHP code.
* There will be a little math.

---

> Without data you're just another person with an opinion.
>
> <cite>-- W. Edwards Deming</cite>

---

# A (fictional) request

Sam from the admissions office wants to show a chart of how many students from each department are returning to campus this fall.

Sam gives us... a giant spreadsheet.

---

# Our mission

Create a custom Gutenberg block to display this chart.

---

# Challenge accepted

1. Import the data into WordPress
2. Display a graph
3. Make the graph accessible and responsive

---

<!-- .slide: data-background="#483758" -->

# Import the data into WordPress

---

<section class="full-screen-img" data-background-image="images/example-google-sheet.jpg" data-background-size="contain" data-background-color="#222" aria-label="Screenshot of an example Google Sheet, containing student information, including name, gender, class level, home state, major, and extracurricular activity"></section>

---

# A couple of options

1. Have a content editor input all the data into a WordPress block.
2. Have WordPress read the spreadsheet for us.

---

# Google Integration!

* Data is dynamic, so when the source changes, the page changes automatically.
* _But_, there is now a second place we have to keep up with.

---

# Step 1

## Get API Key from Google

---

<section class="full-screen-img" data-background-image="images/settings-google-api-key.jpg" data-background-size="contain" data-background-color="#222" aria-label="Screenshot of a WordPress settings page with a single field for a Google API key"></section>

---

# Step 2

## Have your block store the URL of your Google sheet.

---

The `edit()` function should render this:

```
<TextControl
  label='Google Sheets URL'
  help='(Must be publicly viewable.)'
  value={ data }
  onChange={ onChangeData }
/>
```

---

* `data` is an attribute of the block. _(You can have more.)_
* `onChangeData` is the onChange function to store your attribute data:

```
const onChangeData = ( value ) => {
  setAttributes( { data: value } )
};
```

---

# Step 3

## Extract the data

* This happens when you render the block on the front end.
* Now is probably a good time to mention that this block is a dynamic block.

---

```
function besan_get_sheet_data( $attributes, $api_key ) {
  // Extract the Google sheet ID from the sheet URL.
  $sheet_id = preg_replace( '/(https:\/\/docs.google.com\/spreadsheets\/d\/)|\/edit.*/', '', $attributes['data'] );

  // Calculate the range of data to get.
  $range = $attributes['column'] . '2%3A' . $attributes['column'] . '1000';

  // Make the call to get the data from Google.
  $get_data = new WP_Http();
  $url = 'https://sheets.googleapis.com/v4/spreadsheets/'. $sheet_id . '/values/' . $range . '/?&key=' . $api_key;

  return $get_data -> get( $url );
}
```

---

# Resources

* [Besan Block](https://github.com/thatdevgirl/besan-block) (A custom plugin that I wrote to do a lot of what I spoke about here.)
* [Example Google Sheet you can play with](https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit#gid=0) (Public, view only)
