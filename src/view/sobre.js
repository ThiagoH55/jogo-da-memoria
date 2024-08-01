function mostrarContato(id) {
    const element = document.getElementById(id)

    if (element.style.display != 'block') {
        element.style.display = 'block'
    } else {
        element.style.display = 'none'
    }
}