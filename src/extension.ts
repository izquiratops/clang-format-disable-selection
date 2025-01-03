import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    'clang-format-ignore.toggleWrap', 
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) return;

      const document = editor.document;
      const selection = editor.selection;
      const startLine = selection.start.line;
      const endLine = selection.end.line;

      if (startLine > 0 || endLine < document.lineCount - 1) return;
      const isAlreadyWrapped = 
        document.lineAt(startLine - 1).text.trim() === '// clang-format off' &&
        document.lineAt(endLine + 1).text.trim() === '// clang-format on';

      editor.edit(editBuilder => {
        if (isAlreadyWrapped) {
          editBuilder.delete(
            document.lineAt(startLine - 1).rangeIncludingLineBreak
          );
          editBuilder.delete(
            document.lineAt(endLine + 1).rangeIncludingLineBreak
          );
        } else {
          const firstLineText = document.lineAt(startLine).text;
          const firstLineIndentation = firstLineText.match(/^\s*/)?.[0];
          const secondLineText = document.lineAt(endLine).text;
          const secondLineIndentation = secondLineText.match(/^\s*/)?.[0];

          editBuilder.insert(
            new vscode.Position(startLine, 0), 
            `${firstLineIndentation}// clang-format off\n`
          );
          
          editBuilder.insert(
            new vscode.Position(endLine + 1, 0), 
            `${secondLineIndentation}// clang-format on\n`
          );
        }
      });
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}