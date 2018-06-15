## Classes

<dl>
<dt><a href="#wordMatch">wordMatch</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#isNode">isNode(o)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Check if is DOM Node</p>
</dd>
<dt><a href="#isElement">isElement(o)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Check if is HTMLELement</p>
</dd>
<dt><a href="#getParent">getParent(el, className)</a> ⇒ <code>HTMLElement</code></dt>
<dd><p>Get first parent to have a give className</p>
</dd>
</dl>

<a name="wordMatch"></a>

## wordMatch
**Kind**: global class
<a name="new_wordMatch_new"></a>

### new wordMatch()
Create a word match game

<a name="isNode"></a>

## isNode(o) ⇒ <code>Boolean</code>
Check if is DOM Node

**Kind**: global function
**Returns**: <code>Boolean</code> - true if is DOM Node

| Param | Type |
| --- | --- |
| o | <code>\*</code> |

<a name="isElement"></a>

## isElement(o) ⇒ <code>Boolean</code>
Check if is HTMLELement

**Kind**: global function
**Returns**: <code>Boolean</code> - true if is Element

| Param | Type |
| --- | --- |
| o | <code>\*</code> |

<a name="getParent"></a>

## getParent(el, className) ⇒ <code>HTMLElement</code>
Get first parent to have a give className

**Kind**: global function
**Returns**: <code>HTMLElement</code> - parent element having the className

| Param | Type | Description |
| --- | --- | --- |
| el | <code>HTMLElement</code> | child element |
| className | <code>String</code> | className to look for |