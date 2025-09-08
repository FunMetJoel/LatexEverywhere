# Function design


## Feature list
I want the code to be able to render as latex if the user has the extention enabled, but render as unicode representation if the extention is not enabled.
We can split this up in to some parts

### Detecting the LatexEverywhere block
We should be able to delete the unicode representation of the formula if the extention is enabled. So we should recognize where a block starts. 

### Showing the unicode representation
We should have a function that can generate a unicode representation of a latex function

### Hiding the latex if extention disabled
When the extention is disabled, the latex should be present, but not visible

### Rendering the latex representation
If the extention is enabled, the unicode representation should be hidden and the latex representation should be shown

### Optional link to extention
There should be an option to send a link to the extention so other can render the latex

## LatexEverywhere block
The latexeverywhere block should have a format like this
```
{startIndicator} {visibeUnicodeRepresentation} {middleIndicator} {invisibleLatexRepresentation} {endIndicator}
```
The start, middle and end indicators should be unique to this extention, so the extention does't start a block unintentionally

lets start with the invisible representation of 00000001, which is the SOH controll caracter in ASCII, so it won't be in any latex code

We can end with 00000011, which is EXT in ASCII.
