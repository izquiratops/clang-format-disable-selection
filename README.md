# Clang-format disable selection

If you're already using the extension [clang-format](https://open-vsx.org/vscode/item?itemName=xaver.clang-format), this plugin helps you wrapping the current selected lines with the comments `clangd-format off` and `clangd-format on`. This means that the formatter won't be applied to the lines in between.

A selection from `return matrix4x4f{` to `};` would apply the following output:
```cpp
struct matrix4x4f {
  float values[16];

  static matrix4x4f identity() {
    // clang-format off
    return matrix4x4f{
        1.f, 0.f, 0.f, 0.f,
        0.f, 1.f, 0.f, 0.f,
        0.f, 0.f, 1.f, 0.f,
        0.f, 0.f, 0.f, 1.f,
    };
    // clang-format on
  }
};
```

### Usage

This extension adds a method called "Toggle clang-format in current selection". The same method is used to wrap the selection and unwrap it.

### Source code

Available on github: https://github.com/izquiratops/clang-format-disable-selection