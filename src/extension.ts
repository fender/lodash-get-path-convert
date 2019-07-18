import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.lodashGetPathConvert', () => {
		let editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}

		const selection = editor.selection;
		const startPoint = selection.start.line;
		const endPoint = selection.end.line;

		let lines: string[] = [];
		let selectionLength: number = 0;

		selectionLength = editor.document.lineAt(endPoint).text.length;
		for (let i = startPoint; i <= endPoint; i++) {
			lines.push(editor.document.lineAt(i).text);
		}

		lines.forEach((line, i) => {
			if (/get\(.+ *, *' *(.+\..+) *' *,*.*\)/g.test(line)) {
				const groups = line.match(/get\(.+ *, *(' *.+\..+ *') *,*.*\)/);
				if (groups && groups.length > 0) {
					const array = groups[1].split('.');
					const replace = array.join(', ');
					lines[i] = lines[i].replace(groups[1], `[${replace}]`);
				}
			}
		});

		editor.edit(editBuilder => {
			editBuilder.replace(
				new vscode.Range(startPoint, 0, endPoint, selectionLength),
				lines.join('\n')
			);
		});

		vscode.window.showInformationMessage('Successfully converted get() string paths to arrays.');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
