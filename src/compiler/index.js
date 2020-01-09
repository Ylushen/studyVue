/* @flow */

import { parse } from './parser/index'
import { optimize } from './optimizer'
import { generate } from './codegen/index'
import { createCompilerCreator } from './create-compiler'

// `createCompilerCreator`允许创建使用替代方法的编译器
// 解析器/优化器/代码生成，例如SSR优化编译器。
// 这里，我们只是使用默认部分导出默认编译器。
// 使用with解决代码的作用域问题，使用new Function解决代码字符串创建成执行方法的问题
export const createCompiler = createCompilerCreator(function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
  // 解释器执行
  const ast = parse(template.trim(), options)
  if (options.optimize !== false) {
    // 执行优化器，给静态节点和根节点打上标记
    optimize(ast, options)
  }
  // 返回render函数
  const code = generate(ast, options)
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
})
