# frontJ

## Install

```bash
npm install -D frontj
```

## Example

```javascript
import { writeFileSync } from 'fs'
import { createElement, attrs } from 'frontj'
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

const text = (...contents) => p(
  {
    attrs: {
      class: 'text'
    }
  },
  ...contents
)

const contents = html(
  head(
    title('frontJ example.'),
  ),
  body(
    h1({ attrs: { class: 'heading' } }, 'Hello!'),
    text('foo', br(), 'bar'),
    input(attrs('[type="checkbox"][checked]')),
    div({ attrs: '#id.class1.class2' })
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

サンプルのため、属性について色々な記法で書いています。

[`createElement`](#createelement)メソッドで各要素を生成する代わりに、[@frontj/elements](https://github.com/frontJ/elements)パッケージからimportすることを推奨します。
HTMLファイルの出力には[@frontj/builder](https://github.com/frontJ/builder)を使用することを推奨します。

## Documentation

### Methods

#### `attrs`

`attrs`プロパティを持ち、その値が入力引数であるオブジェクトを返します。
[`FrontJElement`](#frontjelement)関数の`optionsOrContent`引数にオブジェクトを渡す際に有用です。

```typescript
attrs(attrs: FrontJElementOptions['attrs']): { attrs: FrontJElementOptions['attrs'] }
```

| 引数 | 説明 |
| --- | --- |
| attrs | `FrontJElementOptions['attrs']`型の値。 |

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

FrontJElement(optionsOrContent?: FrontJElementOptions | string, ...contents: string[] | undefined[]): string
```

| 引数 | 説明 |
| --- | --- |
| optionsOrContent | オブジェクトが渡された場合は属性などの設定、文字列が渡された場合はHTML要素内にその文字列が出力されます。設定項目は[`FrontJElementOptions`](#frontjelementoptions)型の項目に記載しています。 |
| contents | 省略可能で、カンマ区切りで文字列を渡せます。渡された文字列は結合されHTML要素内に出力されます。 |

### Types

#### `FrontJAttrsObject`

[`FrontJElementOptions`](#frontjelementoptions)型の`attrs`プロパティの型として使用されます。

```typescript
FrontJAttrsObject {
  [attrName: string]: string | string[];
}
```

| 引数 | 説明 |
| --- | --- |
| attrName | HTML要素の属性名です。このプロパティの値として文字列が渡された場合はその文字列、文字列の配列が渡された場合は半角スペースで結合した文字列がこの属性の値になります。空文字、空配列を指定した場合は属性名のみが返ります(checkedなどの属性を想定)。 |

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

#### `FrontJElementOptions`

[`FrontJElement`](#frontjelement)関数の`optionsOrContent`引数の型として使用されます。

```typescript
FrontJElementOptions {
  attrs: FrontJAttrsObject | string;
}
```

| 引数 | 説明 |
| --- | --- |
| attrs | HTML要素の属性を設定するオブジェクトまたはCSSセレクタ(のような)文字列です。オブジェクトの設定項目は[`FrontJAttrsObject`](#frontjattrsobject)型の項目に記載しています。文字列では下記のように設定できます。 |

```typescript
// 設定例
div({ attrs: '.foo#bar[attr1][[attr2]="[val]"][class="baz"]' })

// => <div attr1 [attr2]="[val]" class="baz foo" id="bar"></div>
```

## License

[MIT](https://github.com/frontJ/frontJ/blob/master/LICENSE)