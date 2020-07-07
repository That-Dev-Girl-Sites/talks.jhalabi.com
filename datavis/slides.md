# See What I Mean?
## Data Visualization in WordPress

---

# Expectation setting

* Technical talk for developers.
* Knowledge of dynamic Gutenberg block creation.
* There will be _(some)_ math.

---

> Without data you're just another person with an opinion.
>
> <cite>-- W. Edwards Deming</cite>

---

# Once upon a time...

Sam from the admissions office wants to show a chart of how many students from each class are returning to campus this fall.

Sam gives us... a giant spreadsheet.

---

# What is our quest?

Create a custom Gutenberg block to display this chart.

---

# Challenge accepted

1. Import the data into WordPress.
2. Process the data.
3. Make an accessible and responsive graph.

---

<!-- .slide: data-background="#c45131" -->

# Chapter 1
## Import the data into WordPress

---

<section class="full-screen-img" data-background-image="images/example-google-sheet.jpg" data-background-size="contain" data-background-color="#291f32" aria-label="Screenshot of an example Google Sheet, containing student information, including name, gender, class level, home state, major, and extracurricular activity"></section>

---

# A couple of options

1. Content editor enters data into fields of a block.
2. WordPress reads the spreadsheet for us.

---

# Lazy wins!

* Google Sheets integration.
* Dynamic data == page updates automatically.
* _But_, there is another data source to keep up with.

---

<!-- .slide: data-background="#483758" -->

# Step 1

## Get API Key from Google

---

<section class="full-screen-img" data-background-image="images/settings-google-api-key.jpg" data-background-size="contain" data-background-color="#291f32" aria-label="Screenshot of a WordPress settings page with a single field for a Google API key"></section>

---

<!-- .slide: data-background="#483758" -->

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

<!-- .slide: data-background="#483758" -->

# Step 3

## Extract the data

* We need a bunch of PHP to extract and process the data.
* This is a __dynamic__ block!
* Function called by the render callback.

---

```
function get_sheet_data( $attributes, $api_key ) {
  // Extract the Google sheet ID
  $sheet_id = preg_replace(
    '/(https:\/\/docs.google.com\/spreadsheets\/d\/)|\/edit.*/',
    '',
    $attributes['data']
  );
```

---

```
  // Calculate the range of data to get.
  $range = $attributes['column'];
  $range .= '2%3A';
  $range .= $attributes['column'];
  $range .= '1000';
```

---

```
  $get_data = new WP_Http();
  $url = 'https://sheets.googleapis.com/v4/spreadsheets/';
  $url .= $sheet_id;
  $url .= '/values/' . $range;
  $url .= '/?&key=' . $api_key;

  return $get_data->get( $url );
}
```

---

<!-- .slide: data-background="#c45131" -->

# Chapter 2
## Process the data

---

<!-- .slide: data-background="#483758" -->

# Step 1

Convert the data into something we can read (JSON).

```
$data_body = json_decode(
  $raw_data['body'],
  true
);
```

---

Then our data will look something like this:

```
Array(
  [range] => 'Class Data'!E2:E101
  [majorDimension] => ROWS
  [values] => Array(
    [0] => Array(
      [0] => English
    )

    [1] => Array(
      [0] => Math
    )

    [2] => Array(
      [0] => English
    )
    ...
)
```

---

<!-- .slide: data-background="#483758" -->

# Step 2

Remember our problem: We need to count the number of students from each major.

---

```
$data = array();
foreach ( $data_body['values'] as $d ) {
  if ( array_key_exists( $d[0], $data ) ) {
    // If the value already exists
    $data[ $d[0] ]++;
  } else {
    // Otherwise, create new item
    $data[ $d[0] ] = 1;
  }
}
```

---

<!-- .slide: data-background="#c45131" -->

# Chapter 3
## Make an accessible and responsive graph

---

# Horizontal bar chart

We have lots of options, but let's make this example simple.

---

<section class="full-screen-img" data-background-image="images/example-bar-chart.jpg" data-background-size="contain" data-background-color="#291f32" aria-label="Screenshot of a WordPress settings page with a single field for a Google API key"></section>

---

# Homegrown SVG or D3.js?

---

<!-- .slide: data-background="#483758" -->

# Step 1

Let's set up our SVG.

---

# SVG overview

```
<svg xmlns="http://www.w3.org/2000/svg"
    width="100%" height="">

  <title>My Chart</title>
  <desc>What my chart is about!</desc>

  <!-- Shapes go here! -->

</svg>
```

---

# SVG height

The SVG needs to account for the height of the sum of the bars in the chart.

```
$svg_height =
  sizeof($data) * ( BAR_HEIGHT + BAR_GAP )

```

---

# SVG declaration

## (with height)

```
'<svg
   xmlns="http://www.w3.org/2000/svg"
   width="100%"
   height="' . $svg_height . '">'
```

---

<!-- .slide: data-background="#483758" -->

# Step 2

Create the X and Y axes.

<small>(Yes, axes is the plural of "axis". Chop chop.)<small>

---

<!-- .slide: data-background="#483758" -->

# Step 3

Create the bars!

<small>(a.k.a. the fun part.)</small>

---

<section class="full-screen-img" data-background-image="images/example-bar-chart.jpg" data-background-size="contain" data-background-color="#291f32" aria-label="Screenshot of a WordPress settings page with a single field for a Google API key"></section>

---

# Thank you!!

* All example code: https://github.com/thatdevgirl/besan-block
* These slides: https://talks.thatdevgirl.com/datavis/
  * More resources in the following slides.

---

<!-- .slide: data-background="#444054" -->

# Resources

* [Besan Block](https://github.com/thatdevgirl/besan-block) (custom plugin; examples are from here)
* [Example Google Sheet](https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit#gid=0) (public, view only)

---

<!-- .slide: data-background="#444054" -->

# Accessible SVGs

* [SVG Tutorial | W3Schools](https://www.w3schools.com/graphics/svg_intro.asp)
* [Tips for Creating Accessible SVG | Sitepoint](https://www.sitepoint.com/tips-accessible-svg/)
* [Accessible SVGs | CSS-Tricks](https://css-tricks.com/accessible-svgs/)
