# Accessible Development
# For All!

---

## Hello! My name is Joni.

* Sr. Javascript front-end dev @ Georgetown
* Pseudo-avid Tweeter: [@jonihalabi](https://twitter.com/jonihalabi)
* More-than-occasional runner
* Baker of a mean oatmeal chocolate chip cookie

---

## P.S. All of these slides are online

https://talks/thatdevgirl.com/accessibility/

---

## Accessible development is just as important as responsive development.

Note:
Responsive dev caters to users of different screen sizes.

Accessible dev caters to users of different browsing tools.

Our responsibility (and goal) as developers is to make sites that everyone can use.

---

## Users browse with more than just their eyes

* Screen readers
* Keyboard-only
* Braille readers

Note:
Screen readers: JAWS, VoiceOver, NVIDIA, WindowsEyes

Readers all read sites slightly differently from each other

---

## Accessibility Standards

* _WCAG_: Web Content Accessibility Guidelines
* _Section 508_

Note:
Section 508 was updated to more closely mirror WCAG 2.0 in 2016.

Standards include both design and development elements.

Sites that get federal funding need to be WCAG AA compliant by Jan 18, 2018.

---

### This talk is really about
## ~~Accessible development~~
## Development!

Note:
We have been developing the wrong way if our code is not accessible.

Accessible development practices should be baked into our regular development practices.

---

```
<img src="kitten.jpg">
```

---

```
<img src="kitten.jpg" alt="A kitten wearing a fez because fezzes are cool">
```

![A kitten wearing a fez because fezzes are cool](images/kitten.jpg)

---

### What do we want?
## *Accessible websites!*
### When do we want it?
## *Right from the start!*

Note:
Accessibility is a process, not a project.

Requirements -> UX -> design -> development -> testing -> release

Story time! Talk about the accessibility retro-fit at GU.

---

We have our design and UX direction from the team.

We know what experience we want all users to have.

How do we start coding?

---

## K.I.S.S.

```
<!DOCTYPE html>
<html>

<head>
  <title>This is an accessible website</title>
</head>

<body>
  <main>
    <h1>This is an accessible website!</h1>
  </main>
</body>

</html>
```

[For example...](https://talks.thatdevgirl.com/accessibility/examples/kiss)

Note:
Keep your HTML code to the basics.

---

* Clean markup
* Use HTML5 tags
* Be **SEMANTIC**
* ARIA and role attributes are mostly used for support

Note:
Good code = accessible code

ARIA = Accessible Rich Internet Applications

---

## Navigating your website

Note:
Users navigate a website like tourists navigate a city.

Places you want to go need to be labeled and specific.

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

![GU McCourt site](images/mccourt-plain.jpg)

---

![GU McCourt site, annotated version](images/mccourt-annotated.jpg)

Note:
Live VoiceOver demo of McCourt

---

## Basic landmark example

```
<header>
  <h1>My site header!</h1>
</header>

<section>
  <p>All the things about my site</p>
</section>
```

---

## Landmarks and Labels

A landmark isn't very useful if you can't tell one from another.

Note:
All duplicate landmark roles need labels!

---

## This is *not* OK:

```
<section>
  <p>All the things about my site</p>
</section>

<section>
  <p>More things about my site</p>
</section>
```

---

## The fix!

```
<section aria-label="All the things">
  <p>All the things about my site</p>
</section>

<section aria-label="Even more things!">
  <p>More things about my site</p>
</section>
```

Note:
aria-labelledby: Works in JAWS, but for some reason not in VoiceOver.

---

## Don't forget about the little details

Random pieces of accessibility information we learned along the way.

Note:
There are lots of large-scale development practices that you need to keep in mind, but don't forget about the little "gotchas" too.

---

## Phone numbers are a giant pain

---

## First and foremost, use a `tel:` link

```
<a href="tel:7035551212">(703) 555-1212</a>
```

---

## (703) 555-1212

Note:
Read as "seven hundred three (pause) five hundred fifty-five minus one thousand two hundred twelve" in JAWS

Read as digits in VoiceOver

---

## 703.555.1212

Note:
Read as "seven hundred three (pause) five hundred fifty-five (pause) one thousand two hundred twelve" in JAWS

Read as "seven zero three dot five five five dot one two one two" in VoiceOver

---

## A workaround

```
<span>7</span> <span>0</span> <span>3</span> 
<span>5</span> <span>5</span> <span>5</span> -
<span>1</span> <span>2</span> 
<span>1</span> <span>2</span>
```

Note:
OMG no.

---

## A better solution

```
<a 
  href="tel:7035551212" 
  aria-label="7 0 3. 5 5 5. 1 2 1 2.">
  (703) 555-1212
</a>
```

---

## Link `title` attribute does not do what you think it does

Screen readers are inconsistent with the `title`.

Note:
Even if there is an image, screen readers will read the image's alt text, still not the link's title text.

Screen readers only read `title` text if there is **no** link text.

---

## Semantic differences between `<b>` and `<strong>`

`<b>` is for stylistically offset text; i.e. keywords or anything typographically bold.

`<strong>` is for text with strong importance

---

## Semantic differences between `<i>` and `<em>`

`<i>` is for text in an alternative voice; i.e. foreign words or technical terms.

`<em>` is for text that has stress emphasis; i.e. something you would pronounce differently.

---

## Sadly, it doesn't really matter

* Screen readers could read text in these tags differently, but they don't.  These tags are ignored unless the user specifies otherwise.
* No accessibility specifications require the elimination of `<b>` or `<i>`, but they need to be used correctly.

Note:
Mainstream screen readers currently treat B/I tags identically to STRONG/EM tags. That is, they are ignored unless a user specifies that they be indicated. Some users report that announcing changes can be distracting.

---

## Accessible forms

* Logical structure
* Navigable with the keyboard
* Translates to correct HTML code

Note:
Forms by default are navigable by keyboard if you code them correctly and don't do weird things.

---

## Labels

```
<label>
  <input placeholder="Your Name">
  Your Name
</label>
```

or

```
<label for="yourname">Your Name</label>
<input id="yourname" placeholder="Your Name">
```

---

## Make sure your error notifications are correct and useful

---

![Inaccessible form error example](images/form-inaccessible.jpg)

---

![Accessible form error example](images/form-accessible.gif)

---

# Questions?

---

## Thank you!

* Slides: https://talks.thatdevgirl.com/accessibility/
* Twitter: [@jonihalabi](https://twitter.com/jonihalabi)

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

* [Accessibility and phone number formatting](https://thatdevgirl.com/blog/accessibility-phone-number-formatting)
* [I thought title text improved accessibility](https://silktide.com/i-thought-title-text-improved-accessibility-i-was-wrong/)
* [Semantic differences between &lt;b&gt;, &lt;strong&gt;, &lt;i&gt;, and &lt;em&gt;](http://html5doctor.com/i-b-em-strong-element/)
* [Testing with a screen reader](https://thatdevgirl.com/blog/accessibility-screen-reader)
* [Accessibility: Bold and italic formatting in HTML](http://accessibility.psu.edu/boldfacehtml/)
