|-- undefined
    |-- .babelrc.js
    |-- .editorconfig
    |-- .eslintignore
    |-- .eslintrc.js
    |-- .flowconfig
    |-- .gitignore
    |-- BACKERS.md
    |-- LICENSE
    |-- OLDREADME.md
    |-- package.json
    |-- README.md
    |-- yarn.lock
    |-- .circleci
    |   |-- config.yml
    |-- .idea
    |   |-- misc.xml
    |   |-- modules.xml
    |   |-- study-master.iml
    |   |-- vcs.xml
    |   |-- workspace.xml
    |-- benchmarks
    |   |-- big-table
    |   |   |-- demo.css
    |   |   |-- index.html
    |   |   |-- style.css
    |   |-- dbmon
    |   |   |-- app.js
    |   |   |-- ENV.js
    |   |   |-- index.html
    |   |   |-- lib
    |   |       |-- memory-stats.js
    |   |       |-- monitor.js
    |   |       |-- styles.css
    |   |-- reorder-list
    |   |   |-- index.html
    |   |-- ssr
    |   |   |-- common.js
    |   |   |-- README.md
    |   |   |-- renderToStream.js
    |   |   |-- renderToString.js
    |   |-- svg
    |   |   |-- index.html
    |   |-- uptime
    |       |-- index.html
    |-- dist
    |   |-- README.md
    |-- examples
    |   |-- commits
    |   |   |-- app.js
    |   |   |-- index.html
    |   |   |-- mock.js
    |   |-- elastic-header
    |   |   |-- index.html
    |   |   |-- style.css
    |   |-- firebase
    |   |   |-- app.js
    |   |   |-- index.html
    |   |   |-- style.css
    |   |-- grid
    |   |   |-- grid.js
    |   |   |-- index.html
    |   |   |-- style.css
    |   |-- markdown
    |   |   |-- index.html
    |   |   |-- style.css
    |   |-- modal
    |   |   |-- index.html
    |   |   |-- style.css
    |   |-- move-animations
    |   |   |-- index.html
    |   |-- select2
    |   |   |-- index.html
    |   |-- svg
    |   |   |-- index.html
    |   |   |-- style.css
    |   |   |-- svg.js
    |   |-- todomvc
    |   |   |-- app.js
    |   |   |-- index.html
    |   |   |-- readme.md
    |   |-- tree
    |       |-- index.html
    |       |-- tree.js
    |-- flow
    |   |-- compiler.js
    |   |-- component.js
    |   |-- global-api.js
    |   |-- modules.js
    |   |-- options.js
    |   |-- ssr.js
    |   |-- vnode.js
    |   |-- weex.js
    |-- packages
    |   |-- vue-server-renderer
    |   |   |-- build.dev.js
    |   |   |-- build.prod.js
    |   |   |-- client-plugin.d.ts
    |   |   |-- index.js
    |   |   |-- package.json
    |   |   |-- README.md
    |   |   |-- server-plugin.d.ts
    |   |   |-- types
    |   |       |-- index.d.ts
    |   |       |-- plugin.d.ts
    |   |       |-- tsconfig.json
    |   |-- vue-template-compiler
    |   |   |-- browser.js
    |   |   |-- index.js
    |   |   |-- package.json
    |   |   |-- README.md
    |   |   |-- types
    |   |       |-- index.d.ts
    |   |       |-- test.ts
    |   |       |-- tsconfig.json
    |   |-- weex-template-compiler
    |   |   |-- build.js
    |   |   |-- index.js
    |   |   |-- package.json
    |   |   |-- README.md
    |   |-- weex-vue-framework
    |       |-- factory.js
    |       |-- index.js
    |       |-- package.json
    |       |-- README.md
    |-- scripts
    |   |-- alias.js
    |   |-- build.js
    |   |-- config.js
    |   |-- feature-flags.js
    |   |-- gen-release-note.js
    |   |-- get-weex-version.js
    |   |-- release-weex.sh
    |   |-- release.sh
    |   |-- verify-commit-msg.js
    |   |-- git-hooks
    |       |-- commit-msg
    |       |-- pre-commit
    |-- src
    |   |-- compiler
    |   |   |-- codeframe.js
    |   |   |-- create-compiler.js
    |   |   |-- error-detector.js
    |   |   |-- helpers.js
    |   |   |-- index.js
    |   |   |-- optimizer.js
    |   |   |-- to-function.js
    |   |   |-- codegen
    |   |   |   |-- events.js
    |   |   |   |-- index.js
    |   |   |-- directives
    |   |   |   |-- bind.js
    |   |   |   |-- index.js
    |   |   |   |-- model.js
    |   |   |   |-- on.js
    |   |   |-- parser
    |   |       |-- entity-decoder.js
    |   |       |-- filter-parser.js
    |   |       |-- html-parser.js
    |   |       |-- index.js
    |   |       |-- text-parser.js
    |   |-- core
    |   |   |-- config.js
    |   |   |-- index.js
    |   |   |-- components
    |   |   |   |-- index.js
    |   |   |   |-- keep-alive.js
    |   |   |-- global-api
    |   |   |   |-- assets.js
    |   |   |   |-- extend.js
    |   |   |   |-- index.js
    |   |   |   |-- mixin.js
    |   |   |   |-- use.js
    |   |   |-- instance
    |   |   |   |-- events.js
    |   |   |   |-- index.js
    |   |   |   |-- init.js
    |   |   |   |-- inject.js
    |   |   |   |-- lifecycle.js
    |   |   |   |-- proxy.js
    |   |   |   |-- render.js
    |   |   |   |-- state.js
    |   |   |   |-- render-helpers
    |   |   |       |-- bind-dynamic-keys.js
    |   |   |       |-- bind-object-listeners.js
    |   |   |       |-- bind-object-props.js
    |   |   |       |-- check-keycodes.js
    |   |   |       |-- index.js
    |   |   |       |-- render-list.js
    |   |   |       |-- render-slot.js
    |   |   |       |-- render-static.js
    |   |   |       |-- resolve-filter.js
    |   |   |       |-- resolve-scoped-slots.js
    |   |   |       |-- resolve-slots.js
    |   |   |-- observer
    |   |   |   |-- array.js
    |   |   |   |-- dep.js
    |   |   |   |-- index.js
    |   |   |   |-- scheduler.js
    |   |   |   |-- traverse.js
    |   |   |   |-- watcher.js
    |   |   |-- util
    |   |   |   |-- debug.js
    |   |   |   |-- env.js
    |   |   |   |-- error.js
    |   |   |   |-- index.js
    |   |   |   |-- lang.js
    |   |   |   |-- next-tick.js
    |   |   |   |-- options.js
    |   |   |   |-- perf.js
    |   |   |   |-- props.js
    |   |   |-- vdom
    |   |       |-- create-component.js
    |   |       |-- create-element.js
    |   |       |-- create-functional-component.js
    |   |       |-- patch.js
    |   |       |-- vnode.js
    |   |       |-- helpers
    |   |       |   |-- extract-props.js
    |   |       |   |-- get-first-component-child.js
    |   |       |   |-- index.js
    |   |       |   |-- is-async-placeholder.js
    |   |       |   |-- merge-hook.js
    |   |       |   |-- normalize-children.js
    |   |       |   |-- normalize-scoped-slots.js
    |   |       |   |-- resolve-async-component.js
    |   |       |   |-- update-listeners.js
    |   |       |-- modules
    |   |           |-- directives.js
    |   |           |-- index.js
    |   |           |-- ref.js
    |   |-- platforms
    |   |   |-- web
    |   |   |   |-- entry-compiler.js
    |   |   |   |-- entry-runtime-with-compiler.js
    |   |   |   |-- entry-runtime.js
    |   |   |   |-- entry-server-basic-renderer.js
    |   |   |   |-- entry-server-renderer.js
    |   |   |   |-- compiler
    |   |   |   |   |-- index.js
    |   |   |   |   |-- options.js
    |   |   |   |   |-- util.js
    |   |   |   |   |-- directives
    |   |   |   |   |   |-- html.js
    |   |   |   |   |   |-- index.js
    |   |   |   |   |   |-- model.js
    |   |   |   |   |   |-- text.js
    |   |   |   |   |-- modules
    |   |   |   |       |-- class.js
    |   |   |   |       |-- index.js
    |   |   |   |       |-- model.js
    |   |   |   |       |-- style.js
    |   |   |   |-- runtime
    |   |   |   |   |-- class-util.js
    |   |   |   |   |-- index.js
    |   |   |   |   |-- node-ops.js
    |   |   |   |   |-- patch.js
    |   |   |   |   |-- transition-util.js
    |   |   |   |   |-- components
    |   |   |   |   |   |-- index.js
    |   |   |   |   |   |-- transition-group.js
    |   |   |   |   |   |-- transition.js
    |   |   |   |   |-- directives
    |   |   |   |   |   |-- index.js
    |   |   |   |   |   |-- model.js
    |   |   |   |   |   |-- show.js
    |   |   |   |   |-- modules
    |   |   |   |       |-- attrs.js
    |   |   |   |       |-- class.js
    |   |   |   |       |-- dom-props.js
    |   |   |   |       |-- events.js
    |   |   |   |       |-- index.js
    |   |   |   |       |-- style.js
    |   |   |   |       |-- transition.js
    |   |   |   |-- server
    |   |   |   |   |-- compiler.js
    |   |   |   |   |-- util.js
    |   |   |   |   |-- directives
    |   |   |   |   |   |-- index.js
    |   |   |   |   |   |-- model.js
    |   |   |   |   |   |-- show.js
    |   |   |   |   |-- modules
    |   |   |   |       |-- attrs.js
    |   |   |   |       |-- class.js
    |   |   |   |       |-- dom-props.js
    |   |   |   |       |-- index.js
    |   |   |   |       |-- style.js
    |   |   |   |-- util
    |   |   |       |-- attrs.js
    |   |   |       |-- class.js
    |   |   |       |-- compat.js
    |   |   |       |-- element.js
    |   |   |       |-- index.js
    |   |   |       |-- style.js
    |   |   |-- weex
    |   |       |-- entry-compiler.js
    |   |       |-- entry-framework.js
    |   |       |-- entry-runtime-factory.js
    |   |       |-- compiler
    |   |       |   |-- index.js
    |   |       |   |-- directives
    |   |       |   |   |-- index.js
    |   |       |   |   |-- model.js
    |   |       |   |-- modules
    |   |       |       |-- append.js
    |   |       |       |-- class.js
    |   |       |       |-- index.js
    |   |       |       |-- props.js
    |   |       |       |-- style.js
    |   |       |       |-- recycle-list
    |   |       |           |-- component-root.js
    |   |       |           |-- component.js
    |   |       |           |-- index.js
    |   |       |           |-- recycle-list.js
    |   |       |           |-- text.js
    |   |       |           |-- v-bind.js
    |   |       |           |-- v-for.js
    |   |       |           |-- v-if.js
    |   |       |           |-- v-on.js
    |   |       |           |-- v-once.js
    |   |       |-- runtime
    |   |       |   |-- index.js
    |   |       |   |-- node-ops.js
    |   |       |   |-- patch.js
    |   |       |   |-- text-node.js
    |   |       |   |-- components
    |   |       |   |   |-- index.js
    |   |       |   |   |-- richtext.js
    |   |       |   |   |-- transition-group.js
    |   |       |   |   |-- transition.js
    |   |       |   |-- directives
    |   |       |   |   |-- index.js
    |   |       |   |-- modules
    |   |       |   |   |-- attrs.js
    |   |       |   |   |-- class.js
    |   |       |   |   |-- events.js
    |   |       |   |   |-- index.js
    |   |       |   |   |-- style.js
    |   |       |   |   |-- transition.js
    |   |       |   |-- recycle-list
    |   |       |       |-- render-component-template.js
    |   |       |       |-- virtual-component.js
    |   |       |-- util
    |   |           |-- element.js
    |   |           |-- index.js
    |   |           |-- parser.js
    |   |-- server
    |   |   |-- create-basic-renderer.js
    |   |   |-- create-renderer.js
    |   |   |-- render-context.js
    |   |   |-- render-stream.js
    |   |   |-- render.js
    |   |   |-- util.js
    |   |   |-- write.js
    |   |   |-- bundle-renderer
    |   |   |   |-- create-bundle-renderer.js
    |   |   |   |-- create-bundle-runner.js
    |   |   |   |-- source-map-support.js
    |   |   |-- optimizing-compiler
    |   |   |   |-- codegen.js
    |   |   |   |-- index.js
    |   |   |   |-- modules.js
    |   |   |   |-- optimizer.js
    |   |   |   |-- runtime-helpers.js
    |   |   |-- template-renderer
    |   |   |   |-- create-async-file-mapper.js
    |   |   |   |-- index.js
    |   |   |   |-- parse-template.js
    |   |   |   |-- template-stream.js
    |   |   |-- webpack-plugin
    |   |       |-- client.js
    |   |       |-- server.js
    |   |       |-- util.js
    |   |-- sfc
    |   |   |-- parser.js
    |   |-- shared
    |       |-- constants.js
    |       |-- util.js
    |-- test
    |   |-- e2e
    |   |   |-- .eslintrc.json
    |   |   |-- nightwatch.config.js
    |   |   |-- runner.js
    |   |   |-- specs
    |   |       |-- async-edge-cases.html
    |   |       |-- async-edge-cases.js
    |   |       |-- basic-ssr.html
    |   |       |-- basic-ssr.js
    |   |       |-- commits.js
    |   |       |-- grid.js
    |   |       |-- markdown.js
    |   |       |-- modal.js
    |   |       |-- select2.js
    |   |       |-- svg.js
    |   |       |-- todomvc.js
    |   |       |-- tree.js
    |   |-- helpers
    |   |   |-- .eslintrc.json
    |   |   |-- classlist.js
    |   |   |-- test-object-option.js
    |   |   |-- to-equal.js
    |   |   |-- to-have-been-warned.js
    |   |   |-- trigger-event.js
    |   |   |-- vdom.js
    |   |   |-- wait-for-update.js
    |   |-- ssr
    |   |   |-- .eslintrc
    |   |   |-- async-loader.js
    |   |   |-- compile-with-webpack.js
    |   |   |-- jasmine.js
    |   |   |-- ssr-basic-renderer.spec.js
    |   |   |-- ssr-bundle-render.spec.js
    |   |   |-- ssr-stream.spec.js
    |   |   |-- ssr-string.spec.js
    |   |   |-- ssr-template.spec.js
    |   |   |-- fixtures
    |   |       |-- app.js
    |   |       |-- async-bar.js
    |   |       |-- async-foo.js
    |   |       |-- cache-opt-out.js
    |   |       |-- cache.js
    |   |       |-- error.js
    |   |       |-- nested-cache.js
    |   |       |-- promise-rejection.js
    |   |       |-- split.js
    |   |       |-- test.css
    |   |       |-- test.png
    |   |       |-- test.woff2
    |   |-- unit
    |   |   |-- .eslintrc.json
    |   |   |-- index.js
    |   |   |-- karma.base.config.js
    |   |   |-- karma.cover.config.js
    |   |   |-- karma.dev.config.js
    |   |   |-- karma.sauce.config.js
    |   |   |-- karma.unit.config.js
    |   |   |-- features
    |   |   |   |-- debug.spec.js
    |   |   |   |-- error-handling.spec.js
    |   |   |   |-- ref.spec.js
    |   |   |   |-- component
    |   |   |   |   |-- component-async.spec.js
    |   |   |   |   |-- component-keep-alive.spec.js
    |   |   |   |   |-- component-scoped-slot.spec.js
    |   |   |   |   |-- component-slot.spec.js
    |   |   |   |   |-- component.spec.js
    |   |   |   |-- directives
    |   |   |   |   |-- bind.spec.js
    |   |   |   |   |-- class.spec.js
    |   |   |   |   |-- cloak.spec.js
    |   |   |   |   |-- for.spec.js
    |   |   |   |   |-- html.spec.js
    |   |   |   |   |-- if.spec.js
    |   |   |   |   |-- model-checkbox.spec.js
    |   |   |   |   |-- model-component.spec.js
    |   |   |   |   |-- model-dynamic.spec.js
    |   |   |   |   |-- model-file.spec.js
    |   |   |   |   |-- model-parse.spec.js
    |   |   |   |   |-- model-radio.spec.js
    |   |   |   |   |-- model-select.spec.js
    |   |   |   |   |-- model-text.spec.js
    |   |   |   |   |-- on.spec.js
    |   |   |   |   |-- once.spec.js
    |   |   |   |   |-- pre.spec.js
    |   |   |   |   |-- show.spec.js
    |   |   |   |   |-- static-style-parser.spec.js
    |   |   |   |   |-- style.spec.js
    |   |   |   |   |-- text.spec.js
    |   |   |   |-- filter
    |   |   |   |   |-- filter.spec.js
    |   |   |   |-- global-api
    |   |   |   |   |-- assets.spec.js
    |   |   |   |   |-- compile.spec.js
    |   |   |   |   |-- config.spec.js
    |   |   |   |   |-- extend.spec.js
    |   |   |   |   |-- mixin.spec.js
    |   |   |   |   |-- observable.spec.js
    |   |   |   |   |-- set-delete.spec.js
    |   |   |   |   |-- use.spec.js
    |   |   |   |-- instance
    |   |   |   |   |-- init.spec.js
    |   |   |   |   |-- methods-data.spec.js
    |   |   |   |   |-- methods-events.spec.js
    |   |   |   |   |-- methods-lifecycle.spec.js
    |   |   |   |   |-- properties.spec.js
    |   |   |   |   |-- render-proxy.spec.js
    |   |   |   |-- options
    |   |   |   |   |-- comments.spec.js
    |   |   |   |   |-- components.spec.js
    |   |   |   |   |-- computed.spec.js
    |   |   |   |   |-- data.spec.js
    |   |   |   |   |-- delimiters.spec.js
    |   |   |   |   |-- directives.spec.js
    |   |   |   |   |-- el.spec.js
    |   |   |   |   |-- errorCaptured.spec.js
    |   |   |   |   |-- extends.spec.js
    |   |   |   |   |-- functional.spec.js
    |   |   |   |   |-- inheritAttrs.spec.js
    |   |   |   |   |-- inject.spec.js
    |   |   |   |   |-- lifecycle.spec.js
    |   |   |   |   |-- methods.spec.js
    |   |   |   |   |-- mixins.spec.js
    |   |   |   |   |-- name.spec.js
    |   |   |   |   |-- parent.spec.js
    |   |   |   |   |-- props.spec.js
    |   |   |   |   |-- propsData.spec.js
    |   |   |   |   |-- render.spec.js
    |   |   |   |   |-- renderError.spec.js
    |   |   |   |   |-- template.spec.js
    |   |   |   |   |-- watch.spec.js
    |   |   |   |   |-- _scopeId.spec.js
    |   |   |   |-- transition
    |   |   |       |-- inject-styles.js
    |   |   |       |-- transition-group.spec.js
    |   |   |       |-- transition-mode.spec.js
    |   |   |       |-- transition.spec.js
    |   |   |-- modules
    |   |       |-- compiler
    |   |       |   |-- codeframe.spec.js
    |   |       |   |-- codegen.spec.js
    |   |       |   |-- compiler-options.spec.js
    |   |       |   |-- optimizer.spec.js
    |   |       |   |-- parser.spec.js
    |   |       |-- observer
    |   |       |   |-- dep.spec.js
    |   |       |   |-- observer.spec.js
    |   |       |   |-- scheduler.spec.js
    |   |       |   |-- watcher.spec.js
    |   |       |-- server-compiler
    |   |       |   |-- compiler-options.spec.js
    |   |       |   |-- optimizer.spec.js
    |   |       |-- sfc
    |   |       |   |-- sfc-parser.spec.js
    |   |       |-- util
    |   |       |   |-- error.spec.js
    |   |       |   |-- next-tick.spec.js
    |   |       |-- vdom
    |   |           |-- create-component.spec.js
    |   |           |-- create-element.spec.js
    |   |           |-- modules
    |   |           |   |-- attrs.spec.js
    |   |           |   |-- class.spec.js
    |   |           |   |-- directive.spec.js
    |   |           |   |-- dom-props.spec.js
    |   |           |   |-- events.spec.js
    |   |           |   |-- style.spec.js
    |   |           |-- patch
    |   |               |-- children.spec.js
    |   |               |-- edge-cases.spec.js
    |   |               |-- element.spec.js
    |   |               |-- hooks.spec.js
    |   |               |-- hydration.spec.js
    |   |-- weex
    |       |-- .eslintrc
    |       |-- jasmine.js
    |       |-- cases
    |       |   |-- cases.spec.js
    |       |   |-- event
    |       |   |   |-- click.after.vdom.js
    |       |   |   |-- click.before.vdom.js
    |       |   |   |-- click.vue
    |       |   |-- recycle-list
    |       |   |   |-- attrs.vdom.js
    |       |   |   |-- attrs.vue
    |       |   |   |-- classname.vdom.js
    |       |   |   |-- classname.vue
    |       |   |   |-- inline-style.vdom.js
    |       |   |   |-- inline-style.vue
    |       |   |   |-- text-node.vdom.js
    |       |   |   |-- text-node.vue
    |       |   |   |-- v-else-if.vdom.js
    |       |   |   |-- v-else-if.vue
    |       |   |   |-- v-else.vdom.js
    |       |   |   |-- v-else.vue
    |       |   |   |-- v-for-iterator.vdom.js
    |       |   |   |-- v-for-iterator.vue
    |       |   |   |-- v-for.vdom.js
    |       |   |   |-- v-for.vue
    |       |   |   |-- v-if.vdom.js
    |       |   |   |-- v-if.vue
    |       |   |   |-- v-on-inline.vdom.js
    |       |   |   |-- v-on-inline.vue
    |       |   |   |-- v-on.vdom.js
    |       |   |   |-- v-on.vue
    |       |   |   |-- v-once.vdom.js
    |       |   |   |-- v-once.vue
    |       |   |   |-- components
    |       |   |       |-- banner.vue
    |       |   |       |-- counter.vue
    |       |   |       |-- editor.vue
    |       |   |       |-- footer.vue
    |       |   |       |-- lifecycle.vue
    |       |   |       |-- poster.vue
    |       |   |       |-- stateful-lifecycle.vdom.js
    |       |   |       |-- stateful-lifecycle.vue
    |       |   |       |-- stateful-v-model.vdom.js
    |       |   |       |-- stateful-v-model.vue
    |       |   |       |-- stateful.vdom.js
    |       |   |       |-- stateful.vue
    |       |   |       |-- stateless-multi-components.vdom.js
    |       |   |       |-- stateless-multi-components.vue
    |       |   |       |-- stateless-with-props.vdom.js
    |       |   |       |-- stateless-with-props.vue
    |       |   |       |-- stateless.vdom.js
    |       |   |       |-- stateless.vue
    |       |   |-- render
    |       |       |-- class.vdom.js
    |       |       |-- class.vue
    |       |       |-- sample.vdom.js
    |       |       |-- sample.vue
    |       |-- compiler
    |       |   |-- append.spec.js
    |       |   |-- class.spec.js
    |       |   |-- compile.spec.js
    |       |   |-- parser.spec.js
    |       |   |-- props.spec.js
    |       |   |-- style.spec.js
    |       |   |-- v-model.spec.js
    |       |-- helpers
    |       |   |-- index.js
    |       |-- runtime
    |           |-- attrs.spec.js
    |           |-- class.spec.js
    |           |-- events.spec.js
    |           |-- framework.spec.js
    |           |-- node.spec.js
    |           |-- style.spec.js
    |           |-- components
    |               |-- richtext.spec.js
    |-- types
    |   |-- index.d.ts
    |   |-- options.d.ts
    |   |-- plugin.d.ts
    |   |-- tsconfig.json
    |   |-- typings.json
    |   |-- umd.d.ts
    |   |-- vnode.d.ts
    |   |-- vue.d.ts
    |   |-- test
    |       |-- augmentation-test.ts
    |       |-- es-module.ts
    |       |-- options-test.ts
    |       |-- plugin-test.ts
    |       |-- ssr-test.ts
    |       |-- tsconfig.json
    |       |-- umd-test.ts
    |       |-- vue-test.ts
    |-- ylsTest
        |-- index.html
        |-- index.js
        |-- README.md
        |-- test.js
        |-- utils.js
        |-- vue.js
        |-- Template
        |   |-- index.js
        |-- Vue_Ob_Watch_Dep
            |-- index.js
            |-- observe.png
            |-- README.md
