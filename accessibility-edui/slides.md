# Accessible Development
# For All!

---

## Hello! My name is Joni.

* Sr. Javascript front-end dev @ Georgetown
* Pseudo-avid Tweeter: [@jonihalabi](https://twitter.com/jonihalabi)

---

## Accessibility
## Is
## User Experience

Note:
Making an accessible website takes the entire team.  It is our collective job to ensure that our sites are usable by the most number of people.  Users with different needs are still users.

---

## Users have different needs.

* Device needs
* Visual needs
* Motor needs
* Cognitive needs

---

## This is where standards come in:

* __WCAG__: Web Content Accessibility Guidelines
* __Section 508__

Note:
Section 508 was updated to more closely mirror WCAG 2.0 in 2016.

Standards include both design and development elements.

Sites that get federal funding need to be WCAG AA compliant by Jan 18, 2018.

---

### Accessibility is not a separate project that you tackle every once in a while.

Note:
We don't develop websites and then think about the mobile experience. Responsiveness is now a part of the typical web development process.  Accessibility needs to be just as typical.

---

* Clean markup
* Know your HTML5 tags
* Be **SEMANTIC**
* Use ARIA and role attributes when necessary

Note:
All HTML tags have specific semantic meaning - i.e. b vs. strong; i vs em

---

## A Quintessential Example

---

```
<img src="kitten.jpg">
```

---

```
<img 
  src="kitten.jpg"
  alt="A kitten wearing a fez because fezzes are cool">
```

![A kitten wearing a fez because fezzes are cool](images/kitten.jpg)

---

## Making Your Sites More Accessible
A 5-Part Primer

---

## Part 1: Landmarks

---

## Landmarks are your (and your users') friends.

Landmarks allow users to navigate through the major sections of a site.

---

| HTML 5 Tag | Role |
| ------ | ------ |
| `<header>` | banner |
| `<nav>` | navigation |
| `<main>` | main |
| `<aside>` | complementary |
| `<section>` | region |
| `<article>` | article |
| `<footer>` | contentinfo |
| `<form>` | form |

---

```
<header>
  <!-- Logo, etc. go here -->
  <nav> <!-- Site navigation --> </nav>
</header>

<main>
  <section> <!-- Important stuff goes here --> </section>
  <section> <!-- More stuff goes here --> </section>
  <aside> <!-- Incidental information goes here --> </aside>
</main>

<footer>
  <!-- Footer info goes here -->
</footer>
```

---

Landmarks are great... but they're kind of useless without names.

---

* The `aria-label` attribute gives your landmark a name!
* You can also use `aria-labelledby` to specify an ID of another element that can be used as a label.

---

```
<header aria-labelledby="site-name">
  <h1 id="site-name">Georgetown University</h1>
  <nav aria-label="Full site navigation"> ... </nav>
</header>

<main>
  <section aria-label="Important content"> ... </section>
  <section aria-label="More important content"> ... </section>
  <aside> ... </aside>
</main>

<footer> ... </footer>
```

---

## One more thing about landmarks

All content on the page must be inside some sort of landmark container.

---

## Part 2: Headings

---

Headings help users figure out the major themes of a page and the sub-topics for each theme.

*Sounds like a term paper, right?*

---

* H1 = Doctor Who
    * H2 = Doctors
    * H2 = Companions
        * H3 = Human companions
        * H3 = Not-so-human companions
            * H4 = K-9!
    * H2 = Enemies

---

## Headings dos and don'ts

* Make sure your headings are in a logical order.
* It is OK to have more than 1 `<h1>` tag on the page!
* **DO NOT** use a `<h*>` tag just because it looks pretty.

---

## Part 3: Skip links

Allows keyboard users skip all of your navigation so they can go straight to the content.

---

## Skip links HTML

```
<body>
  <nav aria-label="Skip links">
    <a href="#main-content" class="skip-link">
      Skip to main content
    </a>
  </nav>

  ...

  <main id="main-content">
    All the important stuff!
  </main>
</body>
```

---

## Skip links Sass

```
.skip-link {
  /* Make it pretty */
  background: #333;
  color: #fff;
  padding: 0.5rem;

  /* Make it hidden */
  position: absolute !important;
  clip: rect(1px,1px,1px,1px);
  overflow: hidden;
  height: 1px;

  /* Show it on focus */
  &:focus {
    clip: auto;
    overflow: visible;
    height: auto;
  }
}
```

---

## While we are on the subject of keyboard users and links...

**DO NOT** turn off the outline around your links.

```
a {
  outline: 0; /* This is really bad */
}
```

---

## Part 4: Hidden content (and transitions)

---

## Actually hide things.

* It really is OK to hide things _(like your off-canvas navigation)_.
* However, you need to provide a clear action to display that information.

---

Hiding content by moving it off the screen or giving it no height or width only hides that content from sighted users.

Screen readers still read that "hidden" (not really hidden) content.

---

I mean, we've all done this at some point in our lives:

```
.my-hidden-thing {
  height: 0;
  width: 0;
  overflow: hidden;
  position: absolute;
  right: -500000000;
}
```

---

This actually hides things:

```
.my-hidden-thing {
  display: none;
}
```

---

If you still want transitions:

```
.my-hidden-thing {
  display: none;
  width: 0;
  transition: all 2s ease;

  &.show {
    display: inline-block;
    width: 500px;
  }
}
```

---

## Part 5: Testing your stuff!

---

## Step into your users' shoes!

You already test different browsers and screen sizes. Testing with your keyboard or screen reader also needs to be part of the QA process.

---

### Testing for keyboard ability?

### _Ignore your mouse/trackpad!_

---

## Keyboard navigation

* Keyboard users expect to be able to tab through the page from left to right, top to bottom.
* This order is determined by your DOM.
* Make sure that any item that has focus is _visibly focused_.

---

### Testing for screen reader usability?

### _Close your eyes!_

---

## Screen reader testing

* Actually test with a screen reader
  * Mac users: VoiceOver
  * PC users: JAWS or NVDA
* Make sure everything is read correctly.

---

## To sum up:

* Know the semantic meaning behind the code you write.
* Ask yourself: Does what I'm creating really make sense?
* Remember about all of the different kinds of users who can visit your site.

---

# Thank you!

http://talks.thatdevgirl.com/accessibility-edui/

---

## Accessibility guideline documentation

* [W3C](http://www.w3c.com)
* [Section 508](http://www.section508.gov)
* [WCAG](https://www.w3.org/WAI/intro/wcag)
* [WAI-ARIA](https://www.w3.org/WAI/intro/aria)
* [Roles Specification](https://www.w3.org/TR/wai-aria/roles)
* [Siteimprove](www.siteimprove.com)

---

## References

* [Accessibility statistics](http://www.interactiveaccessibility.com/accessibility-statistics)
* [Accessibility and phone number formatting](https://thatdevgirl.com/blog/accessibility-phone-number-formatting)
* [I thought title text improved accessibility](https://silktide.com/i-thought-title-text-improved-accessibility-i-was-wrong/)
* [Semantic differences between &lt;b&gt;, &lt;strong&gt;, &lt;i&gt;, and &lt;em&gt;](http://html5doctor.com/i-b-em-strong-element/)
* [Testing with a screen reader](https://thatdevgirl.com/blog/accessibility-screen-reader)
* [Accessibility: Bold and italic formatting in HTML](http://accessibility.psu.edu/boldfacehtml/)
