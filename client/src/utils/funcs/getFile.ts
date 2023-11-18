export function getFile(file: File, handle: (e: ProgressEvent<FileReader>) => void) {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = handle
}