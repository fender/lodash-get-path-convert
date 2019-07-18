VSCode extension that converts any Lodash get() calls that have string paths to arrays.

## Did you know?

```
get(foo, 'bar.baz');
```

This looks for a key of `foo["bar.baz"]` first and then splits into parts of `foo.bar.baz`.

If you do not care about the former, it's more efficient to pass an array as the second parameter to `get()`.

\!\[feature X\]\(images/convert.gif\)

Simply select the "Convert Lodash get()..." from the command pallete after selecting code.

## Known Issues

* JSX strings are not supported.

## Release Notes

### 0.0.1

Initial release of the extension.