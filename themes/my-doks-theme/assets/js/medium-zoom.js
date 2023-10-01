import mediumZoom from 'medium-zoom'


document.addEventListener('lazybeforeunveil', () => {
    const zoom = mediumZoom('#zoom-default', {
        margin: 70,
        background: 'rgba(00, 00, 00, .3)',
        scrollOffset: 0,
    })
}, { once: true })