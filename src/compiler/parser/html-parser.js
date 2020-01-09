/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson (MPL-1.1 OR Apache-2.0 OR GPL-2.0-or-later)
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

import { makeMap, no } from 'shared/util'
import { isNonPhrasingTag } from 'web/compiler/util'
import { unicodeRegExp } from 'core/util/lang'

// Regular Expressions for parsing tags and attributes
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeRegExp.source}]*`
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const startTagOpen = new RegExp(`^<${qnameCapture}`)
const startTagClose = /^\s*(\/?)>/
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)
const doctype = /^<!DOCTYPE [^>]+>/i
// #7298: escape - to avoid being passed as HTML comment when inlined in page
const comment = /^<!\--/
const conditionalComment = /^<!\[/

// Special Elements (can contain anything)
export const isPlainTextElement = makeMap('script,style,textarea', true)
const reCache = {}

const decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t',
  '&#39;': "'"
}
const encodedAttr = /&(?:lt|gt|quot|amp|#39);/g
const encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#39|#10|#9);/g

// #5992
const isIgnoreNewlineTag = makeMap('pre,textarea', true)
const shouldIgnoreFirstNewline = (tag, html) => tag && isIgnoreNewlineTag(tag) && html[0] === '\n'

function decodeAttr (value, shouldDecodeNewlines) {
  const re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr
  return value.replace(re, match => decodingMap[match])
}

/**
 * @param html 模板字符串
 * @param options 配置参数，包含运行中的周期钩子，start, end, chars, common
 * @return null
 * stack dom栈，按顺序将先阶段解析的dom压入栈中，每次遇到闭合标签，就弹出（只会压入非自闭合标签）
 * index 记录当前解析的位置在原模板中位置的下标
 * lastTag 栈顶端的元素名称。 last 缓存当前解析的模板，用来判断解析是否进入死循环
 * 处理过程：
 * 1.使用while循环的方式进行模板的切割处理。通过<符号匹配开始标签，闭合标签，注释文本等分类，调用相对应的方法进行处理
 * 2.处理文本信息时，调用parseText方法，进行文本节点的匹配，将其中的变量转换为相应节点的处理方法。返回一个对象，包含文本数组和方法数组
 * 3.当前html切割匹配完成后，跳出当前循环，方法结束
 * */
export function parseHTML (html, options) {
  const stack = []
  const expectHTML = options.expectHTML
  const isUnaryTag = options.isUnaryTag || no
  const canBeLeftOpenTag = options.canBeLeftOpenTag || no
  let index = 0
  let last, lastTag
  while (html) {
    last = html
    // 确保我们不在脚本/样式之类的纯文本内容元素中
    if (!lastTag || !isPlainTextElement(lastTag)) {
      // 开始解析
      let textEnd = html.indexOf('<')
      // 如果是以标签开始
      if (textEnd === 0) {
        // 判断是否是注释节点
        if (comment.test(html)) {
          const commentEnd = html.indexOf('-->')

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd), index, index + commentEnd + 3)
            }
            advance(commentEnd + 3)
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        // 如果是条件注释
        if (conditionalComment.test(html)) {
          const conditionalEnd = html.indexOf(']>')

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2)
            continue
          }
        }

        // 文件类型:
        const doctypeMatch = html.match(doctype)
        if (doctypeMatch) {
          advance(doctypeMatch[0].length)
          continue
        }

        // 结束节点: 调取结束节点事件
        const endTagMatch = html.match(endTag)
        if (endTagMatch) {
          const curIndex = index
          advance(endTagMatch[0].length)
          parseEndTag(endTagMatch[1], curIndex, index)
          continue
        }

        // 开始节点: 调取开始节点处理方法
        const startTagMatch = parseStartTag()
        if (startTagMatch) {
          handleStartTag(startTagMatch)
          // 应该忽略第一条换行符
          if (shouldIgnoreFirstNewline(startTagMatch.tagName, html)) {
            advance(1)
          }
          continue
        }
      }
    
      /* 如果存在标签
      * 1. 这里整体判断了一下，先将确定第一个<符号的位置
      * 2. 判断此符号是否属于四种需要处理的类型
      * 3. 如果不是，就是文本类型，循环查找下一个<字符的位置，知道文本结束，或者找到需要特殊处理的<
      * 4. 使用text保存这段text节点文本，将html变量中的参数，切割保存到text中
      * */
      let text, rest, next
      if (textEnd >= 0) {
        // 直接忽略<之前的字符
        rest = html.slice(textEnd)
        // 如果不属于那四个节点类型，则当作纯文本处理
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // 这里查找下一个<这个字符
          next = rest.indexOf('<', 1)
          if (next < 0) break
          // 获取到下一个<字符
          textEnd += next
          // 将下一个字符前的字符串切割出去
          rest = html.slice(textEnd)
        }
        // 一直到找到属于特殊处理的<的符号，将前面这一段text纯文本保存出来
        text = html.substring(0, textEnd)
      }
      
      // 如果不是标签，纯文本
      if (textEnd < 0) {
        text = html
      }
      
      // 如果存在文本,就截取掉这段文本
      if (text) {
        advance(text.length)
      }

      // 判断字符和是否有text文本存在，如果有，则将text传进该方法
      if (options.chars && text) {
        options.chars(text, index - text.length, index)
      }
    } else { // 如果我们在脚本/样式之类的纯文本内容元素中
      let endTagLength = 0
      const stackedTag = lastTag.toLowerCase()
      const reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'))
      const rest = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!\--([\s\S]*?)-->/g, '$1') // #7298
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1')
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1)
        }
        if (options.chars) {
          options.chars(text)
        }
        return ''
      })
      index += html.length - rest.length
      html = rest
      parseEndTag(stackedTag, index - endTagLength, index)
    }
    // 如果html并没有被以上操作处理，就抛出错误，跳出循环
    if (html === last) {
      options.chars && options.chars(html)
      if (process.env.NODE_ENV !== 'production' && !stack.length && options.warn) {
        options.warn(`Mal-formatted tag at end of template: "${html}"`, { start: index + html.length })
      }
      break
    }
  }

  // 清理剩余的标签
  parseEndTag()

  // 剪切html的方法，对index进行重定位
  function advance (n) {
    index += n
    html = html.substring(n)
  }

  /**
   *解析开始标签
   * @return {tagName, attrs, start, end} 带有标签name,属性数字，开始位置的对象
   * 解析过程：
   * 1.先切割tag字段，存入tagName参数中,
   * 2.然后通过 “(1)” = “(2)"的方式，匹配到键对值，push进属性数组中
   * 3.记录该字段在模板重得开始和结束位置的下表并保存到start和end字段中
   * */
  function parseStartTag () {
    // 正则匹配开始标签 index 记录当前字符串切割位置
    const start = html.match(startTagOpen)
    if (start) {
      const match = {
        tagName: start[1],
        attrs: [],
        start: index
      }
      advance(start[0].length)
      let end, attr
      // 解析属性，解析一个，切掉一个，直到遇到开始的闭合标签 >  />
      while (!(end = html.match(startTagClose)) && (attr = html.match(dynamicArgAttribute) || html.match(attribute))) {
        attr.start = index
        advance(attr[0].length)
        attr.end = index
        match.attrs.push(attr)
      }
      if (end) {
        match.unarySlash = end[1]
        advance(end[0].length)
        match.end = index
        return match
      }
    }
  }
  
  /**
   * 处理开始标签
   * @param match {tagName, attrs, start, end}
   * 1.先判断是否是需要特殊处理的标签元素或记录当前标签是否是自调用标签
   * 2.处理属性数组，遍历属性数组，将数组元素设置为{name,value}的格式
   * 3.如果不是该标签是自调用标签，就需要特殊处理，将其压入栈中
   * 4.调用start钩子函数
   * */
  function handleStartTag (match) {
    const tagName = match.tagName
    const unarySlash = match.unarySlash

    // todo 如果期待HTML
    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag)
      }
      if (canBeLeftOpenTag(tagName) && lastTag === tagName) {
        parseEndTag(tagName)
      }
    }

    // 判断是否是自闭合标签
    const unary = isUnaryTag(tagName) || !!unarySlash

    // 处理属性数组
    const l = match.attrs.length
    const attrs = new Array(l)
    // 替换attrs里面得值，替换为{name, value}对象
    for (let i = 0; i < l; i++) {
      const args = match.attrs[i]
      const value = args[3] || args[4] || args[5] || ''
      // 检查当前浏览器是否在属性值内部编码了char
      const shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
        ? options.shouldDecodeNewlinesForHref
        : options.shouldDecodeNewlines
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      }
      // 将开始得位置从当前位置提前到去除空格后得位置
      if (process.env.NODE_ENV !== 'production' && options.outputSourceRange) {
        attrs[i].start = args.start + args[0].match(/^\s*/).length
        attrs[i].end = args.end
      }
    }

    // 如果不是自闭合标签，就将这个标签压入栈中
    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs, start: match.start, end: match.end })
      lastTag = tagName
    }

    // 如果有start处理得方法，那就调用start处理方法
    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end)
    }
  }

  /**
   * 解析结束标签
   * @param tagName 标签名
   * @param start 开始位置
   * @param end 结束位置
   * 1.先查找相近的同名闭合标签，并记录其在栈中的位置
   * 2.从栈顶开始弹出栈顶的元素，直到记录的位置，如果有多余元素，就抛出警告，并继续运行其end钩子函数
   * 3.处理完多余函数之后，重设当前栈顶元素名称，lastTag
   * 4.特殊处理<br>和<p>标签
   * */
  function parseEndTag (tagName, start, end) {
    // pos记录当前栈内该tagName的开始标签位置
    let pos, lowerCasedTagName
    if (start == null) start = index
    if (end == null) end = index

    // 查找最接近的相同类型的打开的标签
    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase()
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // 如果没有提供标签名称，请清洁商店
      pos = 0
    }

    // 如果在栈中找到了闭合标签
    if (pos >= 0) {
      // 关闭所有打开的元素，抛出栈
      for (let i = stack.length - 1; i >= pos; i--) {
        // 处理未闭合的标签，注意，这里只是抛出警告
        if (process.env.NODE_ENV !== 'production' &&
          (i > pos || !tagName) &&
          options.warn
        ) {
          options.warn(
            `tag <${stack[i].tag}> has no matching end tag.`,
            { start: stack[i].start, end: stack[i].end }
          )
        }
        // 调用当前弹出栈的元素的end方法
        if (options.end) {
          options.end(stack[i].tag, start, end)
        }
      }

      // 从堆栈中删除打开的元素，并重设栈顶元素名称
      stack.length = pos
      lastTag = pos && stack[pos - 1].tag
      //处理换行标签
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end)
      }
      // 处理P标签
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end)
      }
      if (options.end) {
        options.end(tagName, start, end)
      }
    }
  }
}
