# frontJ

## Install

```bash
npm install -D frontj
```

## Example

```javascript
import { writeFileSync } from 'fs'
import { createElement } from 'frontj'
import { build } from '@frontj/builder'

const html = createElement('html')
const head = createElement('head')
const title = createElement('title')
const body = createElement('body')
const h1 = createElement('h1')
const p = createElement('p')
const br = createElement('br', { children: false })
const input = createElement('input', { children: false })
const div = createElement('div')

const text = (...contents) => p.$`.text`(
  ...contents
)

const contents = html(
  head(
    title('frontJ example.'),
  ),
  body(
    h1.$`.heading`('Hello!'),
    text('foo', br(), 'bar'),
    input.$`[type="checkbox"][checked]`(),
    div.$`#id.class1.class2`()
  )
)

build({
  routes: {
    '/': contents
  }
})
```

HTML(整形後):

```html
<!DOCTYPE html>
<html>
  <head>
    <title>frontJ example.</title>
  </head>
  <body>
    <h1 class="heading">Hello!</h1>
    <p class="text">foo<br>bar</p>
    <input type="checkbox" checked>
    <div id="id" class="class1 class2"></div>
  </body>
</html>
```

[`createElement`](#createelement)メソッドで各要素を生成する代わりに、[@frontj/elements](https://github.com/frontJ/elements)パッケージからimportすることを推奨します。
HTMLファイルの出力には[@frontj/builder](https://github.com/frontJ/builder)を使用することを推奨します。

## Documentation

### Methods

#### `_if`

`condition`引数の値によって`value`または`elseValue`の値を返します。
[`FrontJElement`](#frontjelement)関数内で値を出し分ける際に有用です。

```typescript
_if(condition: boolean, value: string, elseValue = ''): string
```

| 引数 | 説明 |
| --- | --- |
| condition | この値が`true`の場合は`value`の値、`false`の場合は`elseValue`の値が返されます。 |
| value | `condition`が`true`の場合に返される値。 |
| elseValue | `condition`が`false`の場合に返される値。初期値は空文字です。 |

```typescript
const hasPosts = false

div(
  h2('関連記事'),
  _if(hasPosts,
    article(/* ... */),
    p('記事が見つかりませんでした。')
  )
)

/*
<div>
  <h2>関連記事</h2>
  <p>記事が見つかりませんでした。</p>
</div>
*/
```

#### `createElement`

[`FrontJElement`](#frontjelement)型の関数を返します。

```typescript
createElement(name: string, options: FrontJCreateElementOptions): FrontJElement
```

| 引数 | 説明 |
| --- | --- |
| name | HTML要素名。`'html'`が渡された場合、この`createElement`が返した[`FrontJElement`](#frontjelement)を実行時すると自動的に`'<!DOCTYPE html>'`が付与されます。 |
| options | 各種オプション設定用オブジェクト。設定項目は[`FrontJCreateElementOptions`](#frontjcreateelementoptions)型の項目に記載しています。 |

### Functions

#### `FrontJElement`

[`createElement`](#createelement)メソッドの返り値として存在し、HTML要素の文字列を返します。

```typescript
// `FrontJElement`の部分は実際にはタグ名などになります。

FrontJElement(...contents: (string | number)[]): string

// 要素の属性を設定する場合は`$`メソッドを使用します。

FrontJElement.$`TemplateStrings`: (...contents: (string | number)[]) => string
```

| 引数 | 説明 |
| --- | --- |
| contents | 省略可能で、カンマ区切りで文字列または数値を渡せます。渡された値は結合されHTML要素内に出力されます。 |
| TemplateStrings | CSSセレクタのような文字列を渡して、要素の属性を設定することができます。 |

```typescript
const div = createElement('div')

div('Hello', 1) // => <div>Hello1</div>

div.$`#id.class`('Hello', 1) // => <div id="id" class="class">Hello1</div>
```

### Types

#### `FrontJCreateElementOptions`

[`createElement`](#createelement)メソッドの`options`引数の型として使用されます。

```typescript
FrontJCreateElementOptions {
  children?: boolean;
}
```

| 引数 | 説明 |
| --- | --- |
| children | この要素が子要素(テキストノードも含む)を持てるかを真偽値で指定します。`false`の場合、[`FrontJElement`](#frontjelement)関数に渡した引数は無視され、閉じタグが無いHTML要素として出力されます。デフォルトは`true`です。 |

## License

[MIT](https://github.com/frontJ/frontJ/blob/master/LICENSE)