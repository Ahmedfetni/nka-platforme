Get-ChildItem -Recurse |
Where-Object {
    $_.FullName -notmatch 'node_modules|dist|coverage|\.git'
} |
ForEach-Object {
    $_.FullName.Replace((Get-Location).Path, '.')
} > project-tree.txt