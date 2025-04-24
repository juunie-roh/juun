---
"@pkg/ui": patch
---

Refactor Component

refactor(component): Fix logo avatar component

* Fix props type.  
Now extends `HTMLProps`.  
`color` props now accepts `false` value, to explicitly disable the coloring.  
`children` is required.  

* Change the way of receiving element.  
Instead of receiving the element as a prop, now the component uses the children directly.  

* Fix coloring principle.  
The default color is applied only for svg elements.  
Color can be disabled for already colored svgs.
