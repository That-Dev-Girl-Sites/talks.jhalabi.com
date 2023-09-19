# Plot a course!

### Creating accessible SVG charts in WordPress

---

## Ahoy!

```
{
  "name":     "Joni Halabi",
  "role":     "Senior Web Developer @ Georgetown",
  "socials":  "@jonihalabi",
  "web":      "jhalabi.com"
}
```

---

<!-- .slide: data-background="var(--green)" -->

<div class="section-number"><span>0</span></div>

# Today's itinerary

---

<!-- .slide: data-layout="all-center" -->

## Admissions wants

A visualization on our website, displaying of how many students from each class are returning to campus this fall.

---

## Admissions has...

---

<section class="full-screen-img" data-background-image="images/example-google-sheet.jpg" data-background-size="contain" data-background-color="var(--black)" aria-label="Screenshot of an example Google Sheet, containing student information, including name, class level, home state, major, and extracurricular activity"></section>

---

<!-- .slide: data-layout="all-center" -->

# Our mission

Create a custom Gutenberg block to create this chart.

---

# Set a course!

1. Import data into WordPress
1. Process the data
1. Make an accessible and responsive visualization

---

<!-- .slide: data-background="var(--green)" -->

<div class="section-number"><span>1</span></div>

# Import data into WordPress

---

<section class="full-screen-img" data-background-image="images/fork-in-the-road.jpg" data-background-size="contain" data-background-color="var(--black)" aria-label="Google map of Manhattan, New York City, USA, showing a few different routes between Times Square and the Booklyn Bridge. One route is highlighted in green with a time estimate of 16 minutes and, for the purposes of this presentation, labelled as 'Automatically import from Google'. Another route is not highlighted with a joke time estimate of 916 minutes and, again, for this presentation, labelled as 'Manually enter data.'"></section>

---

# A fork in the road

1. Content editor enters data into fields of a block.
2. WordPress reads the spreadsheet for us.

---

# 

* Google Sheets integration.
* Dynamic data == page updates automatically.
* _But_, there is another data source to keep up with.

---

<!-- .slide: data-background="#483758" -->

# Step 1

## Get an API key from Google.

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
  value={ sheetUrl }
  onChange={ onChangeUrl }
/>
```

---

* `sheetUrl` is one attribute of the block.
* `onChangeUrl` is the `onChange` function to store your attribute data:

```
const onChangeUrl = ( value ) => {
  setAttributes( { sheetUrl: value } )
};
```

---

<!-- .slide: data-background="#483758" -->

# Step 3

## Extract the data.

* We need PHP to extract and process the data.
* This is a __dynamic__ block!
* Function called by the render callback.

---

The first step is to get the ID from the Sheet URL.

```
function get_sheet_data( $attributes, $api_key ) {
  // Extract the Google sheet ID
  $sheet_id = preg_replace(
    '/(https:\/\/docs.google.com\/spreadsheets\/d\/)|\/edit.*/',
    '',
    $attributes['sheetUrl']
  );
```

---

The block has another attribute for the column we want from the chart.

```
  // Calculate the range of data to get.
  $range = $attributes['column'];
  $range .= '2%3A';
  $range .= $attributes['column'];
  $range .= '1000';
```

---

Call the Google API and get the data.

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

<!-- .slide: data-background="var(--green)" -->

<div class="section-number"><span>2</span></div>

# Process the data

---

<!-- .slide: data-background="#483758" -->

# Step 1

Convert the data into something PHP can read.

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
  [range] => 'Class Data'!C2:C101
  [majorDimension] => ROWS
  [values] => Array(
    [0] => Array(
      [0] => 1. Freshman
    )

    [1] => Array(
      [0] => 4. Senior
    )

    [2] => Array(
      [0] => 1. Freshman
    )
    ...
)
```

---

<!-- .slide: data-background="#483758" -->

# Step 2

Remember our problem: We need to count the number of students from each major.

---

<section class="full-screen-img" data-background-image="images/example-google-sheet.jpg" data-background-size="contain" data-background-color="#291f32" aria-label="Screenshot of an example Google Sheet, containing student information, including name, gender, class level, home state, major, and extracurricular activity"></section>

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

Now we have an array that looks something like this:

```
Array(
  ['1. Freshman'] => '8',
  ['2. Sophomore'] => '8',
  ['3. Junior'] => '12',
  ['4. Senior'] => '8'
)
```

---

<!-- .slide: data-background="var(--green)" -->

<div class="section-number"><span>1</span></div>

# Make an accessible and responsive graph.

---

# Horizontal bar chart

We have a bunch of options, but let's make this example simple.

---

<section class="full-screen-img" data-background-image="images/example-bar-chart.jpg" data-background-size="contain" data-background-color="#291f32" aria-label="Screenshot our example bar chart of student class levels"></section>

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

<small>(Yup. Axes is the plural of "axis". Chop chop.)<small>

---

<section class="full-screen-img" data-background-image="images/example-bar-chart.jpg" data-background-size="contain" data-background-color="#291f32" aria-label="Screenshot our example bar chart of student class levels"></section>

---

# Y axis

```
<line
   role="presentation"
   x1="OFFSET%" y1="0"
   x2="OFFSET%" y2="HEIGHT_IN_PX"
   stroke="#000" stroke-width="2" />
```

---

# X axis

```
<line
   role="presentation"
   x1="OFFSET%" y1="HEIGHT_IN_PX"
   x2="100%"    y2="HEIGHT_IN_PX"
   stroke="#000" stroke-width="2" />
```

---

# Scale along X axis

```
<text
  role="presentation"
  x="OFFSET%"
  y="HEIGHT_IN_PX + A_LITTLE_MORE"
  fill="#000" font-size="14">

  0

</text>
```

---

# Scale along X axis

```
<text
  role="presentation"
  x="96%"
  y="HEIGHT_IN_PX + A_LITTLE_MORE"
  fill="#000" font-size="14">

  MAX_VALUE

</text>
```

---

# Group

Put all of that code inside a SVG group, so user agents know that code belongs together.

```
<g class="chart_setup">
  ...
</g>
```

---

# All together now

```
<g class="chart_setup">
  <line role="presentation" x1="OFFSET%" y1="0" x2="OFFSET%" y2="HEIGHT_IN_PX" stroke="#000" stroke-width="2" />
  <line role="presentation" x1="OFFSET%" y1="HEIGHT_IN_PX" x2="100%" y2="HEIGHT_IN_PX" stroke="#000" stroke-width="2" />
  <text role="presentation" x="OFFSET%" y="HEIGHT_IN_PX + A_LITTLE_MORE" fill="#000" font-size="14">0</text>
  <text role="presentation" x="96%" y="HEIGHT_IN_PX + A_LITTLE_MORE" fill="#000" font-size="14">MAX_VALUE</text>
</g>
```

---

<!-- .slide: data-background="#483758" -->

# Step 3

Create the bars!

<small>(a.k.a. the fun part.)</small>

---

# Start a group for all bars

```
<g role="list" aria-label="Bar graph">
  BARS GO HERE.
</g>
```

---

# Bar creation

* Loop through your array of data.
* Create a group for each bar, containing
   * The bar itself
   * The text label for that bar
   * (optional) Description

---

```
<g
  role="listitem" aria-label="LABEL, DATA"
  tabindex="0">
    <desc>
      The number of LABEL students
      returning is DATA
    </desc>
    BAR ELEMENT
    LABEL ELEMENT
</g>
```

---

# Bar element

```
<rect
  role="presentation"
  x="OFFSET%"
  y="NUMBER_OF_BARS_SO_FAR * (BAR_HEIGHT + GAP)"
  width="THIS_BARS_WIDTH%"
  height="BAR_HEIGHT"
  fill="#00f" />
```

---

# The bar's width

The width of the current bar is the value of the bar (how many students in this class level) as a __percentage__.

```
VALUE / MAX_VALUE * 100
```

---

# Bar label

```
<text
  role="presentation"
  x="0"
  y="NUMBER_OF_BARS_SO_FAR * (BAR_HEIGHT + GAP)"
  fill="#000"
  font-size="16">

  LABEL

</text>
```

---

# All together now

```
<g role="list" aria-label="Bar graph">

  <g role="listitem" aria-label="LABEL, DATA" tabindex="0">
    <desc>Optional description for this bar</desc>
    <rect role="presentation" x="OFFSET%" y="NUMBER_OF_BARS_SO_FAR * (BAR_HEIGHT + GAP)" width="THIS_BARS_WIDTH%" height="30" fill="#00f" />
    <text role="presentation" x="0" y="NUMBER_OF_BARS_SO_FAR * (BAR_HEIGHT + GAP)" fill="#000" font-size="16">LABEL</text>
  </g>

  ...
</g>
```

---

<section class="full-screen-img" data-background-image="images/example-bar-chart.jpg" data-background-size="contain" data-background-color="#291f32" aria-label="Screenshot our example bar chart of student class levels"></section>

---

# Thank you!!

https://talks.thatdevgirl.com/datavis/

* Follow me at [@jonihalabi](https://twitter.com/jonihalabi)
* https://thatdevgirl.com
* https://jhalabi.com

---

<!-- .slide: data-background="#444054" -->

# Reference: General

* [Besan Block](https://github.com/thatdevgirl/besan-block) (custom plugin; examples are from here)
* [Example Google Sheet](https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit#gid=0) (public, view only)

---

<!-- .slide: data-background="#444054" -->

# Reference: SVGs

* [SVG Tutorial | W3Schools](https://www.w3schools.com/graphics/svg_intro.asp)
* [Tips for Creating Accessible SVG | Sitepoint](https://www.sitepoint.com/tips-accessible-svg/)
* [Accessible SVGs | CSS-Tricks](https://css-tricks.com/accessible-svgs/)

---

<!-- .slide: data-background="#444054" -->

# Google API <small>(1/2)</small>

<small>
* To get this key, go to the [Google APIs Dashboard](https://console.developers.google.com/apis/dashboard). You should have a Google account to access this dashboard.
* Inside the dashboard, go to "Select a Project" at the top of the page and click on "New Project".
* Give your project a name and click the "Create" button.
* From the [Library](https://console.developers.google.com/apis/library) page, search for the "Google Sheets API" and click the blue "Enable" button.
</small>

---

<!-- .slide: data-background="#444054" -->

# Google API <small>(2/2)</small>

<small>
* From the [Credentials](https://console.developers.google.com/apis/credentials) page, click "Create credentials" and select "API key" in the drop-down menu that appears.
* A pop-up window with your API key will appear. Copy the key, then click "Restrict Key".
* Under the "API restrictions" heading, check "Restrict Key", then select the "Google Sheets API" from the drop down menu.
* Click "Save".
</small>


---

<!-- .slide: data-background="#444054" -->

> Without data you're just another person with an opinion.
>
> <cite>-- W. Edwards Deming</cite>
