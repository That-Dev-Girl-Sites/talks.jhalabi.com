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

http://thatdevgirl.com/talks/accessibility/

---

## Accessible development is just as important as responsive development.

Note:
Responsive dev caters to users of different screen sizes.
Accessible dev caters to users of different browsing tools.
Our responsibility (and goal) as developers is to make sites that everyone can use.

---

## This talk is really about
### ~~Accessible development~~
### Development!

Note:
We have been developing the wrong way if our code is not accessible.
Accessible development practices should be baked into our regular development practices.

---

`<img src="kitten.jpg">`

![Frowning face](images/frown.png)

---

`<img src="kitten.jpg" alt="A kitten wearing a fez because fezzes are cool">`

![Smiling face](images/smile.png)

---

## How do we start?

---

## K.I.S.S.

[For example...](http://thatdevgirl.com/talks/accessibility/examples/kiss)

---

## What do we want?
## *Accessible websites!*
## When do we want it?
## *Right from the start!*

Note:
Process = Requirements -> UX -> design -> development -> testing -> release
Story time! Talk about the accessibility retro-fit at GU.

---

## Good code = accessible code

---

* Clean markup
* Use HTML5 tags
* Be **SEMANTIC**
* Use as few ARIA and role attributes as possible.

Note:
ARIA and role attributes are there to help, not to use exclusively.

---

## Landmarks are your (and your users') friends.

Landmarks allow users to navigate through the major sections of a site.

---

![GU McCourt site](images/mccourt-plain.jpg)

---

![GU McCourt site, annotated version](images/mccourt-annotated.jpg)

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

## Landmarks and Labels

A landmark isn't very useful if you can't tell one from another
All duplicate landmark roles need labels!

---

## Accessible forms

---

## Accessible phone numbers

---

## Accessibility weirdness: `title` attribute does nothing!

---

## Thank you!

* Slides: http://thatdevgirl.com/talks/accessibility/
* Twitter: [@jonihalabi](https://twitter.com/jonihalabi)
